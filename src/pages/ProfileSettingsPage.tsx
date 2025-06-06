import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import BottomTabBar from '@/components/layout/BottomTabBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast as sonnerToast } from "sonner";

const ProfileSettingsPage = () => {
  console.log('ProfileSettingsPage loaded');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);
  const [isMfaEnabled, setIsMfaEnabled] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      sonnerToast.error("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
        sonnerToast.error("Password must be at least 8 characters long.");
        return;
    }
    // Simulate API call for password change
    console.log('Changing password...');
    sonnerToast.success("Password changed successfully!");
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  const handleSaveChanges = (section: string) => {
    sonnerToast.success(`${section} settings saved!`);
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header title="Profile & Settings" userName="Jane Doe" userAvatarUrl="https://i.pravatar.cc/150?u=jane_doe" />
      <main className="flex-grow p-4 md:p-6 lg:p-8 pb-20 md:pb-6">
        <ScrollArea className="h-[calc(100vh-8rem)] md:h-auto">
          <div className="max-w-xl mx-auto space-y-8 pr-4">
            <section className="flex items-center space-x-4 p-4 bg-card rounded-lg shadow">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://i.pravatar.cc/150?u=jane_doe" alt="Jane Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold">Jane Doe</h2>
                <p className="text-muted-foreground">jane.doe@example.com</p>
                <Button variant="link" className="p-0 h-auto text-sm">Edit Profile Photo</Button>
              </div>
            </section>

            <Accordion type="single" collapsible className="w-full" defaultValue="personal-info">
              <AccordionItem value="personal-info">
                <AccordionTrigger className="text-lg">Personal Information</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="Jane Doe" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="jane.doe@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1234567890" />
                  </div>
                  <Button onClick={() => handleSaveChanges('Personal Information')}>Save Changes</Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="security">
                <AccordionTrigger className="text-lg">Security Settings</AccordionTrigger>
                <AccordionContent className="space-y-6 pt-2">
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <h4 className="font-medium">Change Password</h4>
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <Button type="submit">Update Password</Button>
                  </form>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="biometricAuth" className="flex flex-col space-y-1">
                        <span>Biometric Authentication</span>
                        <span className="font-normal leading-snug text-muted-foreground">
                          Use fingerprint or face ID for login.
                        </span>
                      </Label>
                      <Switch id="biometricAuth" checked={isBiometricEnabled} onCheckedChange={setIsBiometricEnabled} />
                    </div>
                    <div className="flex items-center justify-between">
                       <Label htmlFor="mfaAuth" className="flex flex-col space-y-1">
                        <span>Two-Factor Authentication (MFA)</span>
                        <span className="font-normal leading-snug text-muted-foreground">
                          Add an extra layer of security to your account.
                        </span>
                      </Label>
                      <Switch id="mfaAuth" checked={isMfaEnabled} onCheckedChange={setIsMfaEnabled} />
                    </div>
                    <Button onClick={() => handleSaveChanges('Security Authentication')} variant="outline">Save Authentication Settings</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="notifications">
                <AccordionTrigger className="text-lg">Notification Preferences</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <Switch id="emailNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <Switch id="pushNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smsNotifications">SMS Notifications for Alerts</Label>
                    <Switch id="smsNotifications" />
                  </div>
                  <Button onClick={() => handleSaveChanges('Notification')}>Save Notification Settings</Button>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="legal">
                <AccordionTrigger className="text-lg">Legal & Support</AccordionTrigger>
                <AccordionContent className="space-y-2 pt-2">
                    <Button variant="link" className="p-0 h-auto block">Terms of Service</Button>
                    <Button variant="link" className="p-0 h-auto block">Privacy Policy</Button>
                    <Button variant="link" className="p-0 h-auto block">Contact Support</Button>
                    <Button variant="link" className="p-0 h-auto block">FAQ</Button>
                </AccordionContent>
              </AccordionItem>

            </Accordion>
            
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="destructive" className="w-full">Log Out</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Log Out</DialogTitle>
                        <DialogDescription>Are you sure you want to log out of your account?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button variant="destructive" onClick={() => sonnerToast.info("Logged out successfully.")}>Confirm Log Out</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

          </div>
        </ScrollArea>
      </main>
      <BottomTabBar />
    </div>
  );
};

export default ProfileSettingsPage;