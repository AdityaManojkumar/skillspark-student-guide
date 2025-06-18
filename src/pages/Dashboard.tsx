
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navigation from '@/components/Navigation';
import ChatBot from '@/components/ChatBot';
import SkillManager from '@/components/SkillManager';
import SubjectManager from '@/components/SubjectManager';
import { User, BookOpen, Brain, Target, MessageCircle, Plus } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [showChatBot, setShowChatBot] = useState(false);

  // Mock data - replace with actual API calls
  const [skills] = useState([
    { id: '1', name: 'JavaScript', category: 'Programming' },
    { id: '2', name: 'React', category: 'Frontend' },
    { id: '3', name: 'Node.js', category: 'Backend' },
    { id: '4', name: 'Data Structures', category: 'Computer Science' }
  ]);

  const [subjects] = useState([
    { id: '1', name: 'Computer Science Fundamentals', semester: 1 },
    { id: '2', name: 'Data Structures and Algorithms', semester: 2 },
    { id: '3', name: 'Web Development', semester: 3 },
    { id: '4', name: 'Database Management', semester: 4 }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.username}! 👋
          </h1>
          <p className="text-gray-600">
            Track your academic progress and get personalized recommendations
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Brain className="w-8 h-8 mr-3" />
                <div>
                  <p className="text-blue-100">Skills</p>
                  <p className="text-2xl font-bold">{skills.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="w-8 h-8 mr-3" />
                <div>
                  <p className="text-green-100">Subjects</p>
                  <p className="text-2xl font-bold">{subjects.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="w-8 h-8 mr-3" />
                <div>
                  <p className="text-purple-100">Projects</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="w-8 h-8 mr-3" />
                <div>
                  <p className="text-orange-100">Companies</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Recent Skills
                  </CardTitle>
                  <CardDescription>
                    Your latest skill additions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {skills.slice(0, 4).map(skill => (
                      <div key={skill.id} className="flex items-center justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <Badge variant="secondary">{skill.category}</Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Skill
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Current Subjects
                  </CardTitle>
                  <CardDescription>
                    Subjects you're currently studying
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {subjects.slice(0, 4).map(subject => (
                      <div key={subject.id} className="flex items-center justify-between">
                        <span className="font-medium">{subject.name}</span>
                        <Badge variant="outline">Sem {subject.semester}</Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Subject
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills">
            <SkillManager />
          </TabsContent>

          <TabsContent value="subjects">
            <SubjectManager />
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Student Profile</CardTitle>
                <CardDescription>
                  Manage your personal and academic information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Username</label>
                      <p className="text-lg">{user?.username}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-lg">{user?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">College ID</label>
                      <p className="text-lg">{user?.collegeId}</p>
                    </div>
                  </div>
                  <Button>Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Floating Chat Button */}
        <Button
          onClick={() => setShowChatBot(!showChatBot)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg z-40"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>

        {/* ChatBot Component */}
        {showChatBot && (
          <ChatBot onClose={() => setShowChatBot(false)} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
