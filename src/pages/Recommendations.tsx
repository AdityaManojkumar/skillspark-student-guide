import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from '@/components/Navigation';
import { 
  Lightbulb, 
  Building2, 
  Code2, 
  ExternalLink, 
  Target,
  Zap,
  Users
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
}

interface Company {
  id: string;
  name: string;
  logo: string;
  role: string;
  skills: string[];
  location: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
}

interface LeetCodeProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  url: string;
}

const Recommendations = () => {
  // Mock data based on user skills
  const [projects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-Commerce React App',
      description: 'Build a full-featured e-commerce application with user authentication, product catalog, and payment integration.',
      skills: ['React', 'JavaScript', 'Node.js'],
      difficulty: 'Intermediate',
      duration: '3-4 weeks'
    },
    {
      id: '2',
      title: 'Task Management Dashboard',
      description: 'Create a responsive task management system with drag-and-drop functionality and real-time updates.',
      skills: ['React', 'JavaScript', 'MongoDB'],
      difficulty: 'Beginner',
      duration: '2-3 weeks'
    },
    {
      id: '3',
      title: 'Social Media Analytics Tool',
      description: 'Develop a tool to analyze social media metrics and generate insights using data visualization.',
      skills: ['React', 'Data Structures', 'JavaScript'],
      difficulty: 'Advanced',
      duration: '4-6 weeks'
    }
  ]);

  const [companies] = useState<Company[]>([
    {
      id: '1',
      name: 'Google',
      logo: '🔍',
      role: 'Software Engineer',
      skills: ['JavaScript', 'React', 'Data Structures'],
      location: 'Mountain View, CA',
      type: 'Hybrid'
    },
    {
      id: '2',
      name: 'Meta',
      logo: '👥',
      role: 'Frontend Developer',
      skills: ['React', 'JavaScript'],
      location: 'Menlo Park, CA',
      type: 'Remote'
    },
    {
      id: '3',
      name: 'Microsoft',
      logo: '🪟',
      role: 'Full Stack Developer',
      skills: ['JavaScript', 'Node.js', 'React'],
      location: 'Redmond, WA',
      type: 'On-site'
    },
    {
      id: '4',
      name: 'Netflix',
      logo: '🎬',
      role: 'Software Engineer',
      skills: ['React', 'JavaScript', 'Node.js'],
      location: 'Los Gatos, CA',
      type: 'Hybrid'
    }
  ]);

  const [leetcodeProblems] = useState<LeetCodeProblem[]>([
    {
      id: '1',
      title: 'Two Sum',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table'],
      url: 'https://leetcode.com/problems/two-sum/'
    },
    {
      id: '2',
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      tags: ['String', 'Stack'],
      url: 'https://leetcode.com/problems/valid-parentheses/'
    },
    {
      id: '3',
      title: 'Binary Tree Inorder Traversal',
      difficulty: 'Medium',
      tags: ['Tree', 'Binary Tree'],
      url: 'https://leetcode.com/problems/binary-tree-inorder-traversal/'
    },
    {
      id: '4',
      title: 'Merge Two Sorted Lists',
      difficulty: 'Easy',
      tags: ['Linked List', 'Recursion'],
      url: 'https://leetcode.com/problems/merge-two-sorted-lists/'
    },
    {
      id: '5',
      title: 'Maximum Subarray',
      difficulty: 'Medium',
      tags: ['Array', 'Dynamic Programming'],
      url: 'https://leetcode.com/problems/maximum-subarray/'
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Medium':
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Remote':
        return 'bg-blue-100 text-blue-800';
      case 'On-site':
        return 'bg-purple-100 text-purple-800';
      case 'Hybrid':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Target className="w-8 h-8 text-blue-600" />
            Personalized Recommendations
          </h1>
          <p className="text-gray-600">
            Based on your skills: JavaScript, React, Node.js, Data Structures, MongoDB
          </p>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Companies
            </TabsTrigger>
            <TabsTrigger value="leetcode" className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              LeetCode
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  Recommended Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map(project => (
                    <Card key={project.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-lg">{project.title}</h3>
                          <Badge className={getDifficultyColor(project.difficulty)}>
                            {project.difficulty}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Skills used:</p>
                            <div className="flex flex-wrap gap-1">
                              {project.skills.map(skill => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Zap className="w-4 h-4" />
                              {project.duration}
                            </span>
                            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                              Start Project
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Companies Hiring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {companies.map(company => (
                    <Card key={company.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">{company.logo}</div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{company.name}</h3>
                                <p className="text-blue-600 font-medium">{company.role}</p>
                              </div>
                              <Badge className={getTypeColor(company.type)}>
                                {company.type}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm mb-3 flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {company.location}
                            </p>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Required skills:</p>
                                <div className="flex flex-wrap gap-1">
                                  {company.skills.map(skill => (
                                    <Badge key={skill} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Job
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leetcode" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-green-600" />
                  LeetCode Problems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leetcodeProblems.map(problem => (
                    <Card key={problem.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold">{problem.title}</h3>
                              <Badge className={getDifficultyColor(problem.difficulty)}>
                                {problem.difficulty}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {problem.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-orange-600 to-red-600"
                            onClick={() => window.open(problem.url, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Solve
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Recommendations;
