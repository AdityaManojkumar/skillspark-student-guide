
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Plus, X } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  semester: string;
}

const SubjectManager = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Data Structures', semester: '3' },
    { id: '2', name: 'Web Development', semester: '4' },
    { id: '3', name: 'Database Management', semester: '4' },
    { id: '4', name: 'Software Engineering', semester: '5' }
  ]);
  const [newSubject, setNewSubject] = useState('');
  const [newSemester, setNewSemester] = useState('');

  const addSubject = () => {
    if (newSubject.trim() && newSemester.trim()) {
      const subject: Subject = {
        id: Date.now().toString(),
        name: newSubject.trim(),
        semester: newSemester.trim()
      };
      setSubjects([...subjects, subject]);
      setNewSubject('');
      setNewSemester('');
    }
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-600" />
          Subjects
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Add New Subject */}
        <div className="space-y-3 mb-6">
          <div className="flex gap-2">
            <Input
              placeholder="Subject name"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="Sem"
              value={newSemester}
              onChange={(e) => setNewSemester(e.target.value)}
              className="w-20"
            />
          </div>
          <Button 
            onClick={addSubject}
            size="sm"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Subject
          </Button>
        </div>

        {/* Subjects List */}
        <div className="space-y-3">
          {subjects.map(subject => (
            <div key={subject.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="font-medium">{subject.name}</span>
                <span className="text-sm text-gray-600">Sem {subject.semester}</span>
              </div>
              <Button 
                onClick={() => removeSubject(subject.id)}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {subjects.length === 0 && (
            <p className="text-gray-500 text-center py-4">No subjects added yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectManager;
