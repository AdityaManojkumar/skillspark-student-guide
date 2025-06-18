
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  username: string;
  email: string;
  collegeId: string;
}

interface ProfileData {
  name: string;
  dob: string;
  semester: string;
  college: string;
  branch: string;
}

interface AuthContextType {
  user: User | null;
  profileData: ProfileData | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: ProfileData) => void;
}

interface RegisterData {
  username: string;
  email: string;
  collegeId: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const storedProfileData = localStorage.getItem('profileData');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
      
      if (storedProfileData) {
        setProfileData(JSON.parse(storedProfileData));
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      if (username === "demo" && password === "password") {
        const mockUser = {
          id: "1",
          username: "demo",
          email: "demo@university.edu",
          collegeId: "STU123456"
        };
        
        localStorage.setItem('token', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        setIsAuthenticated(true);
        
        // Load existing profile data if available
        const storedProfileData = localStorage.getItem('profileData');
        if (storedProfileData) {
          setProfileData(JSON.parse(storedProfileData));
        }
        
        toast({
          title: "Login Successful",
          description: "Welcome back to your dashboard!",
        });
        
        return true;
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Try username: 'demo', password: 'password'",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login.",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      const newUser = {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        collegeId: userData.collegeId
      };
      
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthenticated(true);
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully!",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Registration Error",
        description: "An error occurred during registration.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateProfile = (newProfileData: ProfileData) => {
    setProfileData(newProfileData);
    localStorage.setItem('profileData', JSON.stringify(newProfileData));
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('profileData');
    setUser(null);
    setProfileData(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profileData, 
      isAuthenticated, 
      login, 
      register, 
      logout, 
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
