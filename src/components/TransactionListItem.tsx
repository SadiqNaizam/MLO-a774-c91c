import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownLeft, Minus } from 'lucide-react'; // Icons for transaction type

interface TransactionListItemProps {
  id: string;
  description: string;
  amount: number;
  date: string; // Or Date object, format as needed
  type: 'income' | 'expense' | 'transfer';
  currency?: string;
  onClick?: (id: string) => void;
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({
  id,
  description,
  amount,
  date,
  type,
  currency = "USD",
  onClick,
}) => {
  console.log("Rendering TransactionListItem:", description);

  const isPositive = type === 'income';
  const amountColor = type === 'income' ? 'text-green-600' : type === 'expense' ? 'text-red-600' : 'text-foreground';
  const TypeIcon = type === 'income' ? ArrowUpRight : type === 'expense' ? ArrowDownLeft : Minus;

  const formattedAmount = `${type === 'expense' ? '-' : ''}${new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount))}`;

  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 hover:bg-muted/50 rounded-md transition-colors",
        onClick ? "cursor-pointer" : ""
      )}
      onClick={onClick ? () => onClick(id) : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick(id) : undefined}
    >
      <div className="flex items-center space-x-3">
        <div className={cn("p-1.5 rounded-full bg-muted", amountColor)}>
           <TypeIcon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{description}</p>
          <p className="text-xs text-muted-foreground">{new Date(date).toLocaleDateString()}</p>
        </div>
      </div>
      <p className={cn("text-sm font-semibold", amountColor)}>
        {formattedAmount}
      </p>
    </div>
  );
};

export default TransactionListItem;