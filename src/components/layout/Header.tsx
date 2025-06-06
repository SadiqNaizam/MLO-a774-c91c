import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Menu, Bell } from 'lucide-react'; // Example icons

interface HeaderProps {
  title?: string;
  showUserAvatar?: boolean;
  userName?: string;
  userAvatarUrl?: string;
  onMenuClick?: () => void; // For mobile menu toggle
}

const Header: React.FC<HeaderProps> = ({
  title = "My Application",
  showUserAvatar = true,
  userName = "User",
  userAvatarUrl,
  onMenuClick,
}) => {
  console.log("Rendering Header");
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          {onMenuClick && (
            <Button variant="ghost" size="icon" onClick={onMenuClick} className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          )}
          <Link to="/" className="text-xl font-semibold text-foreground">
            {title}
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          {showUserAvatar && (
            <Link to="/profile-settings"> {/* Example link */}
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatarUrl} alt={userName} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;