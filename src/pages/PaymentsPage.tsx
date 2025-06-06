import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import BottomTabBar from '@/components/layout/BottomTabBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast'; // For shadcn Toaster
import { toast as sonnerToast } from "sonner"; // For Sonner
import { ScrollArea } from '@/components/ui/scroll-area';
import TransactionListItem from '@/components/TransactionListItem'; // Re-use for payment history

// Mock data for scheduled payments and payment history
const mockScheduledPayments = [
  { id: 'sch_1', description: 'Rent Payment', amount: 1200, date: 'Next on 2024-08-01', type: 'expense' as 'expense' },
  { id: 'sch_2', description: 'Netflix Subscription', amount: 15.99, date: 'Next on 2024-08-10', type: 'expense' as 'expense' },
];
const mockPaymentHistory = [
  { id: 'hist_1', description: 'Sent to John Doe', amount: 150, date: '2024-07-28', type: 'expense' as 'expense'},
  { id: 'hist_2', description: 'Utility Bill', amount: 85.40, date: '2024-07-25', type: 'expense' as 'expense'},
];

const PaymentsPage = () => {
  console.log('PaymentsPage loaded');
  const { toast: shadcnToast } = useToast();
  const [payeeName, setPayeeName] = useState('');
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [fromAccount, setFromAccount] = useState('acc_primary_001');
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleSendMoney = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payeeName || !amount || !fromAccount) {
      sonnerToast.error("Please fill all required fields.");
      return;
    }
    setIsConfirmDialogOpen(true);
  };

  const confirmPayment = () => {
    console.log('Payment confirmed:', { payeeName, amount, reference, fromAccount });
    // Simulate API call
    setTimeout(() => {
        sonnerToast.success("Payment Sent Successfully!", {
            description: `Sent $${amount} to ${payeeName}.`,
        });
        setIsConfirmDialogOpen(false);
        setPayeeName('');
        setAmount('');
        setReference('');
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header title="Payments" userName="Jane Doe" userAvatarUrl="https://i.pravatar.cc/150?u=jane_doe" />
      <main className="flex-grow p-4 md:p-6 lg:p-8 pb-20 md:pb-6">
        <Tabs defaultValue="send-money" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="send-money">Send Money</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="send-money" className="mt-6">
            <form onSubmit={handleSendMoney} className="space-y-4 max-w-md mx-auto">
              <div>
                <Label htmlFor="fromAccount">From Account</Label>
                <Select value={fromAccount} onValueChange={setFromAccount}>
                  <SelectTrigger id="fromAccount">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acc_primary_001">Primary Checking (...5250.75)</SelectItem>
                    <SelectItem value="acc_joint_003">Joint Account (...7500.00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="payeeName">Payee Name/Email/Phone</Label>
                <Input id="payeeName" type="text" placeholder="e.g., John Doe or john.doe@example.com" value={payeeName} onChange={e => setPayeeName(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input id="amount" type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} required min="0.01" step="0.01" />
              </div>
              <div>
                <Label htmlFor="reference">Reference (Optional)</Label>
                <Input id="reference" type="text" placeholder="e.g., Birthday gift" value={reference} onChange={e => setReference(e.target.value)} />
              </div>
              <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
                <DialogTrigger asChild>
                  <Button type="submit" className="w-full">Review & Send</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Payment</DialogTitle>
                    <DialogDescription>
                      You are about to send <strong>${amount}</strong> to <strong>{payeeName}</strong> from your {fromAccount === 'acc_primary_001' ? 'Primary Checking' : 'Joint Account'}.
                      {reference && <p className="mt-2">Reference: {reference}</p>}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                       <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="button" onClick={confirmPayment}>Confirm & Send</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </form>
          </TabsContent>

          <TabsContent value="scheduled" className="mt-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Upcoming Scheduled Payments</h3>
              {mockScheduledPayments.length > 0 ? (
                mockScheduledPayments.map(p => (
                  <TransactionListItem
                    key={p.id}
                    id={p.id}
                    description={p.description}
                    amount={p.amount}
                    date={p.date}
                    type={p.type}
                    currency="USD"
                  />
                ))
              ) : (
                <p className="text-muted-foreground">No scheduled payments.</p>
              )}
              <Button variant="outline" className="w-full mt-4">Set Up New Scheduled Payment</Button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <ScrollArea className="h-[400px]">
              <div className="space-y-1 pr-3">
                <h3 className="text-lg font-medium mb-2">Recent Payment History</h3>
                {mockPaymentHistory.length > 0 ? (
                  mockPaymentHistory.map(p => (
                    <TransactionListItem
                      key={p.id}
                      id={p.id}
                      description={p.description}
                      amount={p.amount}
                      date={p.date}
                      type={p.type}
                      currency="USD"
                    />
                  ))
                ) : (
                  <p className="text-muted-foreground">No payment history.</p>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>
      <BottomTabBar />
    </div>
  );
};

export default PaymentsPage;