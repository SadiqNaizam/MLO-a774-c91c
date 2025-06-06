import React from 'react';
import Header from '@/components/layout/Header';
import BottomTabBar from '@/components/layout/BottomTabBar';
import AccountSummaryCard from '@/components/AccountSummaryCard';
import InteractiveFinancialChart, { ChartDataPoint } from '@/components/InteractiveFinancialChart';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, Send, Repeat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const placeholderChartData: ChartDataPoint[] = [
  { name: 'Jan', value: 1200 },
  { name: 'Feb', value: 1500 },
  { name: 'Mar', value: 1300 },
  { name: 'Apr', value: 1800 },
  { name: 'May', value: 1600 },
  { name: 'Jun', value: 2100 },
];

const DashboardPage = () => {
  console.log('DashboardPage loaded');
  const navigate = useNavigate();

  const handleViewAccountDetails = (accountId: string) => {
    navigate(`/account-details/${accountId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header title="Dashboard" userName="Jane Doe" userAvatarUrl="https://i.pravatar.cc/150?u=jane_doe" />
      <main className="flex-grow p-4 md:p-6 lg:p-8 space-y-6 pb-20 md:pb-6">
        <ScrollArea className="h-[calc(100vh-8rem)] md:h-auto">
          <div className="space-y-6 pr-4">
            <section aria-labelledby="quick-actions-title">
              <h2 id="quick-actions-title" className="text-xl font-semibold mb-3 sr-only">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Button variant="outline" className="flex-col h-auto py-3" onClick={() => navigate('/payments')}>
                  <Send className="h-6 w-6 mb-1 text-primary" />
                  Send Money
                </Button>
                <Button variant="outline" className="flex-col h-auto py-3" onClick={() => navigate('/payments')}>
                  <Repeat className="h-6 w-6 mb-1 text-primary" />
                  Transfer
                </Button>
                <Button className="flex-col h-auto py-3 bg-primary hover:bg-primary/90 text-primary-foreground col-span-2 sm:col-span-1" onClick={() => navigate('/joint-account-creation')}>
                  <PlusCircle className="h-6 w-6 mb-1" />
                  Open Joint Account
                </Button>
              </div>
            </section>

            <section aria-labelledby="account-summaries-title">
              <h2 id="account-summaries-title" className="text-xl font-semibold mb-3">Account Summaries</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AccountSummaryCard
                  accountId="acc_primary_001"
                  accountName="Primary Checking"
                  accountType="Checking Account"
                  balance={5250.75}
                  currency="USD"
                  onViewDetailsClick={handleViewAccountDetails}
                />
                <AccountSummaryCard
                  accountId="acc_savings_002"
                  accountName="High-Yield Savings"
                  accountType="Savings Account"
                  balance={12870.20}
                  currency="USD"
                  onViewDetailsClick={handleViewAccountDetails}
                />
                 <AccountSummaryCard
                  accountId="acc_joint_003"
                  accountName="Joint Account"
                  accountType="Joint Checking Account"
                  balance={7500.00}
                  currency="USD"
                  onViewDetailsClick={handleViewAccountDetails}
                />
              </div>
            </section>

            <section aria-labelledby="financial-overview-title">
              <h2 id="financial-overview-title" className="text-xl font-semibold mb-3">Financial Overview</h2>
              <InteractiveFinancialChart
                data={placeholderChartData}
                title="Spending Last 6 Months"
                chartType="bar"
                dataKey="value"
                xAxisDataKey="name"
                aspectRatio={21 / 9}
              />
            </section>
          </div>
        </ScrollArea>
      </main>
      <BottomTabBar />
    </div>
  );
};

export default DashboardPage;