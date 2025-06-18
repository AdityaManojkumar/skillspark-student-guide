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
  Clock
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
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Medium':
      case 'Intermediate':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Hard':
      case 'Advanced':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Remote':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'On-site':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Hybrid':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Target className="w-8 h-8 text-blue-600" />
            Recommendations
          </h1>
          <p className="text-gray-600">
            Personalized suggestions based on your skills
          </p>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border shadow-sm">
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
              Practice
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map(project => (
                <Card key={project.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <Badge className={getDifficultyColor(project.difficulty)}>
                        {project.difficulty}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {project.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {project.duration}
                        </span>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Start
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="companies">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {companies.map(company => (
                <Card key={company.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{company.logo}</div>
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
                        <p className="text-gray-600 text-sm mb-4">{company.location}</p>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-1">
                            {company.skills.map(skill => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Position
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leetcode">
            <div className="space-y-4">
              {leetcodeProblems.map(problem => (
                <Card key={problem.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
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
                        className="bg-orange-600 hover:bg-orange-700"
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Recommendations;
