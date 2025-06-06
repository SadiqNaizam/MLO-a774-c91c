import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CreditCard, UserCircle, BarChart2 } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/payments', label: 'Payments', icon: CreditCard },
  { path: '/accounts', label: 'Accounts', icon: BarChart2 }, // Example based on user journey context
  { path: '/profile-settings', label: 'Profile', icon: UserCircle },
];

const BottomTabBar: React.FC = () => {
  console.log("Rendering BottomTabBar");
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t h-16 md:hidden z-40">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center text-xs p-2 rounded-md",
                isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
              )}
            >
              <item.icon className={cn("h-5 w-5 mb-0.5", isActive ? "text-primary" : "")} strokeWidth={isActive ? 2.5 : 2} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabBar;