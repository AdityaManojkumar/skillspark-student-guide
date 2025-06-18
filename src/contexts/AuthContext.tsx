
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  username: string;
  email: string;
  collegeId: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call - replace with actual backend call
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
      // Simulate API call - replace with actual backend call
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

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
