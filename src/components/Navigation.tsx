
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { 
  GraduationCap, 
  LayoutDashboard, 
  User, 
  Target, 
  LogOut 
} from 'lucide-react';

const Navigation = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SkillRecommend
              </span>
            </Link>

            <div className="hidden md:flex space-x-1">
              <Link to="/dashboard">
                <Button
                  variant={isActive('/dashboard') ? 'default' : 'ghost'}
                  className="flex items-center space-x-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              
              <Link to="/profile">
                <Button
                  variant={isActive('/profile') ? 'default' : 'ghost'}
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Button>
              </Link>
              
              <Link to="/recommendations">
                <Button
                  variant={isActive('/recommendations') ? 'default' : 'ghost'}
                  className="flex items-center space-x-2"
                >
                  <Target className="w-4 h-4" />
                  <span>Recommendations</span>
                </Button>
              </Link>
            </div>
          </div>

          <Button
            onClick={logout}
            variant="outline"
            className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
