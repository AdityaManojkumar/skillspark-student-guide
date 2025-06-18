
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from '@/components/Navigation';
import { User, Calendar, GraduationCap, Building } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    dob: '2001-05-15',
    semester: '5',
    college: 'MIT',
    branch: 'Computer Science'
  });
  const [isEditing, setIsEditing] = useState(false);

  const branches = [
    'Computer Science',
    'Information Technology',
    'Electronics',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering'
  ];

  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated!",
    });
  };

  const handleChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Profile</h1>
          <p className="text-gray-600">Manage your personal and academic information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12" />
                </div>
                <h2 className="text-xl font-bold mb-2">{profileData.name}</h2>
                <p className="text-blue-100 mb-1">{user?.email}</p>
                <p className="text-blue-100 mb-4">ID: {user?.collegeId}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>{profileData.branch}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Building className="w-4 h-4" />
                    <span>{profileData.college}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Semester {profileData.semester}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Personal & Academic Details</CardTitle>
                  <Button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className={isEditing ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={profileData.dob}
                        onChange={(e) => handleChange('dob', e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Academic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="college">College Name</Label>
                      <Input
                        id="college"
                        value={profileData.college}
                        onChange={(e) => handleChange('college', e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch</Label>
                      <Select
                        value={profileData.branch}
                        onValueChange={(value) => handleChange('branch', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {branches.map(branch => (
                            <SelectItem key={branch} value={branch}>
                              {branch}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="semester">Current Semester</Label>
                      <Select
                        value={profileData.semester}
                        onValueChange={(value) => handleChange('semester', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {semesters.map(sem => (
                            <SelectItem key={sem} value={sem}>
                              Semester {sem}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Account Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={user?.email || ''}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="collegeId">College ID</Label>
                      <Input
                        id="collegeId"
                        value={user?.collegeId || ''}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-4 pt-4">
                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                      Save Changes
                    </Button>
                    <Button onClick={() => setIsEditing(false)} variant="outline">
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
