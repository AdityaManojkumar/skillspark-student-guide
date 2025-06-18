
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from '@/components/Navigation';
import ChatBot from '@/components/ChatBot';
import SkillManager from '@/components/SkillManager';
import SubjectManager from '@/components/SubjectManager';
import { 
  User, 
  BookOpen, 
  Zap, 
  Target,
  TrendingUp,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, profileData } = useAuth();

  const stats = [
    {
      title: 'Skills Added',
      value: '8',
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      title: 'Subjects',
      value: '6',
      icon: BookOpen,
      color: 'text-green-600'
    },
    {
      title: 'Projects',
      value: '3',
      icon: Target,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profileData?.name || user?.username || 'Student'}!
          </h1>
          <p className="text-gray-600">
            Manage your skills and get personalized recommendations
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Profile Section */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{profileData?.name || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Branch</p>
                  <p className="font-medium">{profileData?.branch || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Semester</p>
                  <p className="font-medium">{profileData?.semester ? `Semester ${profileData.semester}` : 'Not set'}</p>
                </div>
                <Link to="/profile">
                  <Button variant="outline" size="sm" className="mt-4">
                    Update Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link to="/recommendations">
                  <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                    <Award className="w-4 h-4 mr-2" />
                    View Recommendations
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Complete Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills and Subjects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SkillManager />
          <SubjectManager />
        </div>
      </div>

      <ChatBot />
    </div>
  );
};

export default Dashboard;
