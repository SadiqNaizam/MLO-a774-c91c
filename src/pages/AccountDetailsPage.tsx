import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import TransactionListItem from '@/components/TransactionListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'; // For shadcn Chart
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Filter, Search } from 'lucide-react';

// Placeholder data - in a real app, this would be fetched
const mockTransactions = [
  { id: 'txn_1', description: 'Grocery Store', amount: 75.50, date: '2024-07-29', type: 'expense' as 'expense' },
  { id: 'txn_2', description: 'Salary Deposit', amount: 2500.00, date: '2024-07-28', type: 'income' as 'income'},
  { id: 'txn_3', description: 'Online Subscription', amount: 12.99, date: '2024-07-27', type: 'expense' as 'expense'},
  { id: 'txn_4', description: 'Gym Membership', amount: 40.00, date: '2024-07-25', type: 'expense' as 'expense'},
  { id: 'txn_5', description: 'Transfer to Savings', amount: 500.00, date: '2024-07-24', type: 'transfer' as 'transfer'},
  { id: 'txn_6', description: 'Restaurant Bill', amount: 55.20, date: '2024-07-22', type: 'expense' as 'expense'},
  { id: 'txn_7', description: 'Freelance Payment', amount: 350.00, date: '2024-07-20', type: 'income' as 'income'},
];

const mockAccountDetails = {
  'acc_primary_001': { name: 'Primary Checking', number: '**** **** **** 1234', sortCode: '00-11-22', balance: 5250.75, currency: 'USD' },
  'acc_savings_002': { name: 'High-Yield Savings', number: '**** **** **** 5678', sortCode: '00-11-33', balance: 12870.20, currency: 'USD' },
  'acc_joint_003': { name: 'Joint Account', number: '**** **** **** 9012', sortCode: '00-11-44', balance: 7500.00, currency: 'USD' },
};

const chartData = [ // Example for spending chart
  { month: 'Jan', expenses: 400 }, { month: 'Feb', expenses: 300 },
  { month: 'Mar', expenses: 500 }, { month: 'Apr', expenses: 450 },
  { month: 'May', expenses: 600 }, { month: 'Jun', expenses: 550 },
];

const AccountDetailsPage = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const account = accountId ? (mockAccountDetails as any)[accountId] : null;
  
  useEffect(() => {
    console.log(`AccountDetailsPage loaded for account ID: ${accountId}`);
    // Here you would typically fetch account details and transactions
  }, [accountId]);

  const filteredTransactions = mockTransactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  if (!account) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header title="Account Not Found" />
        <main className="flex-grow p-6 text-center">
          <p>The requested account details could not be found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header title={account.name} userName="Jane Doe" userAvatarUrl="https://i.pravatar.cc/150?u=jane_doe" />
      <main className="flex-grow p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{account.name}</CardTitle>
            <p className="text-sm text-muted-foreground">Account No: {account.number} | Sort Code: {account.sortCode}</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: account.currency }).format(account.balance)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`}/>
                <Tooltip wrapperClassName="!bg-background !border-border" cursor={{ fill: 'hsl(var(--muted))' }} />
                <Bar dataKey="expenses" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Separator />

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Statement
            </Button>
          </div>

          <ScrollArea className="h-[400px] rounded-md border p-2">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map(transaction => (
                <TransactionListItem
                  key={transaction.id}
                  id={transaction.id}
                  description={transaction.description}
                  amount={transaction.amount}
                  date={transaction.date}
                  type={transaction.type}
                  currency={account.currency}
                  onClick={(id) => console.log('View transaction details for:', id)}
                />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-10">No transactions found matching your criteria.</p>
            )}
          </ScrollArea>
        </div>
      </main>
    </div>
  );
};

export default AccountDetailsPage;