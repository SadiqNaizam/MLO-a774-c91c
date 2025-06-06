import React, { useState, ReactNode } from 'react';
import Header from '@/components/layout/Header';
import JointAccountStepper from '@/components/JointAccountStepper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress'; // Can be used if stepper doesn't provide its own
import { toast as sonnerToast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';


const Applicant1DetailsForm = () => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="fullName1">Full Name</Label>
      <Input id="fullName1" defaultValue="Jane Doe (Pre-filled)" />
    </div>
    <div>
      <Label htmlFor="email1">Email Address</Label>
      <Input id="email1" type="email" defaultValue="jane.doe@example.com (Pre-filled)" />
    </div>
    <div>
      <Label htmlFor="phone1">Phone Number</Label>
      <Input id="phone1" type="tel" defaultValue="+1234567890 (Pre-filled)" />
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="terms1" required />
      <Label htmlFor="terms1" className="text-sm font-normal">I confirm my details are correct and agree to the terms.</Label>
    </div>
  </div>
);

const InviteApplicant2Form = ({ onInviteSent }: { onInviteSent: () => void }) => {
  const [inviteeEmail, setInviteeEmail] = useState('');
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Enter the email address of the person you want to open a joint account with. They will receive a secure invitation to complete their part of the application.</p>
      <div>
        <Label htmlFor="inviteeEmail">Applicant 2 Email</Label>
        <Input id="inviteeEmail" type="email" placeholder="john.smith@example.com" value={inviteeEmail} onChange={(e) => setInviteeEmail(e.target.value)} />
      </div>
      <Button onClick={() => {
        if(inviteeEmail) {
            sonnerToast.success("Invitation Sent!", { description: `An invite has been sent to ${inviteeEmail}.`});
            onInviteSent(); // This might advance the stepper or update UI
        } else {
            sonnerToast.error("Please enter an email address.");
        }
      }} className="w-full">Send Invite</Button>
    </div>
  );
};

const FinalPreferencesForm = () => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="accountNickname">Account Nickname (Optional)</Label>
      <Input id="accountNickname" placeholder="e.g., Holiday Fund" />
    </div>
    <div className="space-y-2">
        <Label>Card Delivery Address for Applicant 1 (Jane Doe)</Label>
        <Input defaultValue="123 Main St, Anytown, USA (Pre-filled)" />
    </div>
     <div className="space-y-2">
        <Label>Card Delivery Address for Applicant 2 (Invited User)</Label>
        <p className="text-sm text-muted-foreground">Applicant 2 will confirm their address.</p>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="eStatements" defaultChecked />
      <Label htmlFor="eStatements" className="text-sm font-normal">Enroll in e-Statements for this account.</Label>
    </div>
  </div>
);

const ReviewAndConfirmStep = () => (
    <Card>
        <CardHeader>
            <CardTitle>Review Joint Account Details</CardTitle>
            <CardDescription>Please review all information before opening your new joint account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
            <p><strong>Applicant 1:</strong> Jane Doe (Details confirmed)</p>
            <p><strong>Applicant 2:</strong> John Smith (Invited, pending confirmation)</p>
            <p><strong>Account Preferences:</strong> e-Statements enabled</p>
            <p className="text-sm text-muted-foreground mt-4">By clicking "Confirm & Open Account", you agree to the Joint Account Agreement and Terms of Service.</p>
        </CardContent>
    </Card>
);


const JointAccountCreationPage = () => {
  console.log('JointAccountCreationPage loaded');
  const navigate = useNavigate();
  const [isInviteSent, setIsInviteSent] = useState(false); // To control stepper or UI after invite

  const steps = [
    { id: 'intro', name: 'Introduction', content: <p className="text-center">Welcome! Let's open your joint account in a few simple steps. This process is quick, secure, and transparent.</p> },
    { id: 'applicant1', name: 'Your Details', content: <Applicant1DetailsForm /> },
    { id: 'invite', name: 'Invite Applicant 2', content: <InviteApplicant2Form onInviteSent={() => setIsInviteSent(true)} /> },
    { id: 'preferences', name: 'Preferences', content: <FinalPreferencesForm /> },
    { id: 'review', name: 'Review & Confirm', content: <ReviewAndConfirmStep /> },
  ];

  const handleFinish = () => {
    // This would typically trigger an API call to create the account
    console.log('Joint account creation process finished.');
    sonnerToast.success("Joint Account Created!", { description: "Your new joint account is now active."});
    navigate('/dashboard'); // Redirect to dashboard or a success page
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header title="Open a Joint Account" userName="Jane Doe" userAvatarUrl="https://i.pravatar.cc/150?u=jane_doe" />
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="bg-primary text-primary-foreground p-6 rounded-t-lg">
            <CardTitle className="text-2xl">Streamlined Joint Account</CardTitle>
            <CardDescription className="text-primary-foreground/80">Follow the steps below to set up your account with ease.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <JointAccountStepper
              steps={steps}
              onFinish={handleFinish}
              stepIndicatorType="progress" // or "tabs" or "dots"
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default JointAccountCreationPage;