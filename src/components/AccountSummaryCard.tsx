import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface AccountSummaryCardProps {
  accountId: string;
  accountName: string;
  accountType: string;
  balance: number;
  currency?: string;
  onViewDetailsClick?: (accountId: string) => void;
}

const AccountSummaryCard: React.FC<AccountSummaryCardProps> = ({
  accountId,
  accountName,
  accountType,
  balance,
  currency = "USD",
  onViewDetailsClick,
}) => {
  console.log("Rendering AccountSummaryCard for:", accountName);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg">{accountName}</CardTitle>
        <CardDescription>{accountType}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-foreground">
          {new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(balance)}
        </p>
        {/* Additional info can go here, e.g., last transaction date */}
      </CardContent>
      {onViewDetailsClick && (
        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onViewDetailsClick(accountId)}
          >
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AccountSummaryCard;