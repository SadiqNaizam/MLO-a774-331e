import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// For a proper shadcn form, you'd import Form components from '@/components/ui/form'
// and use react-hook-form, zod. For this example, we'll do a simpler controlled form.

// Placeholder data types
interface Song {
  id: string;
  title: string;
  artist: string;
  albumArtUrl?: string;
  durationSeconds: number;
  audioUrl: string;
}

const UserProfilePage = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null); // For MusicPlayerBar
  const [userName, setUserName] = useState('Dora Emon');
  const [userEmail, setUserEmail] = useState('doraemon@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  console.log('UserProfilePage loaded');

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile update submitted:', { userName, userEmail });
    // Add API call logic here
    alert('Profile updated (mock)!');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("New passwords don't match!");
      return;
    }
    console.log('Password change submitted');
    // Add API call logic here
    alert('Password changed (mock)!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };


  return (
    <div className="flex h-screen bg-gray-900 text-white fixed inset-0">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <main className="flex-1 overflow-y-auto p-6 md:p-10 pb-[100px]">
          <h1 className="text-3xl font-bold text-yellow-400 mb-8">User Profile & Settings</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Information Card */}
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle className="text-xl text-blue-400">Profile Information</CardTitle>
                <CardDescription className="text-gray-400">Manage your personal details.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="flex flex-col items-center space-y-4 mb-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="https://github.com/shadcn.png" alt={userName} />
                      <AvatarFallback>{userName.substring(0,1).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">Change Photo</Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userName" className="text-gray-300">Username</Label>
                    <Input
                      id="userName"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userEmail" className="text-gray-300">Email Address</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">Save Profile Changes</Button>
                </form>
              </CardContent>
            </Card>

            {/* Change Password Card */}
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle className="text-xl text-blue-400">Change Password</CardTitle>
                <CardDescription className="text-gray-400">Update your account security.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword"className="text-gray-300">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword"className="text-gray-300">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmNewPassword"className="text-gray-300">Confirm New Password</Label>
                    <Input
                      id="confirmNewPassword"
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">Change Password</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
        <MusicPlayerBar currentSong={currentSong} />
      </div>
    </div>
  );
};

export default UserProfilePage;