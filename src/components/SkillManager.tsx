
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Brain } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface Skill {
  id: string;
  name: string;
  category: string;
}

const SkillManager = () => {
  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'JavaScript', category: 'Programming' },
    { id: '2', name: 'React', category: 'Frontend' },
    { id: '3', name: 'Node.js', category: 'Backend' },
    { id: '4', name: 'Data Structures', category: 'Computer Science' },
    { id: '5', name: 'MongoDB', category: 'Database' },
    { id: '6', name: 'Python', category: 'Programming' }
  ]);

  const [newSkill, setNewSkill] = useState({ name: '', category: '' });
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const categories = ['Programming', 'Frontend', 'Backend', 'Database', 'Computer Science', 'Design', 'Other'];

  const handleAddSkill = () => {
    if (!newSkill.name || !newSkill.category) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name,
      category: newSkill.category
    };

    setSkills(prev => [...prev, skill]);
    setNewSkill({ name: '', category: '' });
    
    toast({
      title: "Success",
      description: "Skill added successfully!",
    });
  };

  const handleUpdateSkill = () => {
    if (!editingSkill) return;

    setSkills(prev => prev.map(skill => 
      skill.id === editingSkill.id ? editingSkill : skill
    ));
    setEditingSkill(null);
    
    toast({
      title: "Success",
      description: "Skill updated successfully!",
    });
  };

  const handleDeleteSkill = (id: string) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
    toast({
      title: "Success",
      description: "Skill deleted successfully!",
    });
  };

  const getSkillsByCategory = () => {
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, Skill[]>);
    return grouped;
  };

  const skillsByCategory = getSkillsByCategory();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Add New Skill
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Skill name (e.g., React, Python)"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="flex-1"
            />
            <Select value={newSkill.category} onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleAddSkill} className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {editingSkill && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle>Edit Skill</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Skill name"
                value={editingSkill.name}
                onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                className="flex-1"
              />
              <Select value={editingSkill.category} onValueChange={(value) => setEditingSkill({ ...editingSkill, category: value })}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleUpdateSkill} className="bg-green-600 hover:bg-green-700">
                Update
              </Button>
              <Button onClick={() => setEditingSkill(null)} variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skills by Category */}
      <div className="space-y-6">
        {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map(skill => (
                  <div key={skill.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{skill.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {skill.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingSkill(skill)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {skills.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No skills added yet</h3>
            <p className="text-gray-600">Start building your skill profile by adding your first skill above.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SkillManager;
