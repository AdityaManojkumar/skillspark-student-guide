
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Zap, Plus, X } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
}

const SkillManager = () => {
  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'JavaScript', category: 'Programming' },
    { id: '2', name: 'React', category: 'Framework' },
    { id: '3', name: 'Node.js', category: 'Backend' },
    { id: '4', name: 'MongoDB', category: 'Database' }
  ]);
  const [newSkill, setNewSkill] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && newCategory.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.trim(),
        category: newCategory.trim()
      };
      setSkills([...skills, skill]);
      setNewSkill('');
      setNewCategory('');
    }
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const categoryColors: { [key: string]: string } = {
    'Programming': 'bg-blue-50 text-blue-700 border-blue-200',
    'Framework': 'bg-green-50 text-green-700 border-green-200',
    'Backend': 'bg-purple-50 text-purple-700 border-purple-200',
    'Database': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'Tool': 'bg-gray-50 text-gray-700 border-gray-200'
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-600" />
          Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Add New Skill */}
        <div className="space-y-3 mb-6">
          <div className="flex gap-2">
            <Input
              placeholder="Skill name"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1"
            />
          </div>
          <Button 
            onClick={addSkill}
            size="sm"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>

        {/* Skills List */}
        <div className="space-y-3">
          {skills.map(skill => (
            <div key={skill.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="font-medium">{skill.name}</span>
                <Badge className={categoryColors[skill.category] || categoryColors['Tool']}>
                  {skill.category}
                </Badge>
              </div>
              <Button 
                onClick={() => removeSkill(skill.id)}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {skills.length === 0 && (
            <p className="text-gray-500 text-center py-4">No skills added yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillManager;
