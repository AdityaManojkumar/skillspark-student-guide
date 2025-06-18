
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, BookOpen } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface Subject {
  id: string;
  name: string;
  semester: number;
}

const SubjectManager = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Computer Science Fundamentals', semester: 1 },
    { id: '2', name: 'Data Structures and Algorithms', semester: 2 },
    { id: '3', name: 'Web Development', semester: 3 },
    { id: '4', name: 'Database Management', semester: 4 },
    { id: '5', name: 'Software Engineering', semester: 5 },
    { id: '6', name: 'Machine Learning', semester: 6 }
  ]);

  const [newSubject, setNewSubject] = useState({ name: '', semester: '' });
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleAddSubject = () => {
    if (!newSubject.name || !newSubject.semester) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const subject: Subject = {
      id: Date.now().toString(),
      name: newSubject.name,
      semester: parseInt(newSubject.semester)
    };

    setSubjects(prev => [...prev, subject]);
    setNewSubject({ name: '', semester: '' });
    
    toast({
      title: "Success",
      description: "Subject added successfully!",
    });
  };

  const handleUpdateSubject = () => {
    if (!editingSubject) return;

    setSubjects(prev => prev.map(subject => 
      subject.id === editingSubject.id ? editingSubject : subject
    ));
    setEditingSubject(null);
    
    toast({
      title: "Success",
      description: "Subject updated successfully!",
    });
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(prev => prev.filter(subject => subject.id !== id));
    toast({
      title: "Success",
      description: "Subject deleted successfully!",
    });
  };

  const getSubjectsBySemester = () => {
    const grouped = subjects.reduce((acc, subject) => {
      if (!acc[subject.semester]) {
        acc[subject.semester] = [];
      }
      acc[subject.semester].push(subject);
      return acc;
    }, {} as Record<number, Subject[]>);
    return grouped;
  };

  const subjectsBySemester = getSubjectsBySemester();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Add New Subject
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Subject name (e.g., Data Structures)"
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
              className="flex-1"
            />
            <Select value={newSubject.semester} onValueChange={(value) => setNewSubject({ ...newSubject, semester: value })}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map(sem => (
                  <SelectItem key={sem} value={sem.toString()}>
                    Sem {sem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleAddSubject} className="bg-gradient-to-r from-green-600 to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {editingSubject && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle>Edit Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Subject name"
                value={editingSubject.name}
                onChange={(e) => setEditingSubject({ ...editingSubject, name: e.target.value })}
                className="flex-1"
              />
              <Select 
                value={editingSubject.semester.toString()} 
                onValueChange={(value) => setEditingSubject({ ...editingSubject, semester: parseInt(value) })}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map(sem => (
                    <SelectItem key={sem} value={sem.toString()}>
                      Sem {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleUpdateSubject} className="bg-green-600 hover:bg-green-700">
                Update
              </Button>
              <Button onClick={() => setEditingSubject(null)} variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subjects by Semester */}
      <div className="space-y-6">
        {Object.entries(subjectsBySemester)
          .sort(([a], [b]) => parseInt(a) - parseInt(b))
          .map(([semester, semesterSubjects]) => (
          <Card key={semester}>
            <CardHeader>
              <CardTitle className="text-lg">Semester {semester}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {semesterSubjects.map(subject => (
                  <div key={subject.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{subject.name}</span>
                      <Badge variant="outline" className="text-xs">
                        Sem {subject.semester}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingSubject(subject)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteSubject(subject.id)}
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

      {subjects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No subjects added yet</h3>
            <p className="text-gray-600">Start building your academic profile by adding your first subject above.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SubjectManager;
