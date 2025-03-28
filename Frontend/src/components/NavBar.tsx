
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Menu, X, Home, BookOpen, Smile, MessageCircle, Moon, Users } from 'lucide-react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-calmBlue-500 to-gentleLavender-500 flex items-center justify-center">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">Meditra</span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard">
                  <Home className="w-4 h-4 mr-1" />
                  Dashboard
                </NavLink>
                <NavLink to="/journal">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Journal
                </NavLink>
                <NavLink to="/meditation">
                  <Moon className="w-4 h-4 mr-1" />
                  Meditation
                </NavLink>
                <NavLink to="/chat">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  AI Chat
                </NavLink>
                <NavLink to="/community">
                  <Users className="w-4 h-4 mr-1" />
                  Community
                </NavLink>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 focus:outline-none">
                      <Avatar className="w-8 h-8 border-2 border-calmBlue-200">
                        <AvatarImage src="" alt={user?.name || 'User'} />
                        <AvatarFallback className="bg-calmBlue-100 text-calmBlue-700">
                          {user?.name ? getInitials(user.name) : 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/profile" className="w-full">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/settings" className="w-full">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <NavLink to="/auth">Login</NavLink>
                <Button asChild className="bg-calmBlue-500 hover:bg-calmBlue-600">
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden px-4 py-3 bg-white/95 backdrop-blur-md border-t border-gray-200 animate-slide-down">
          <nav className="flex flex-col space-y-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 py-2">
                  <Avatar className="w-8 h-8 border-2 border-calmBlue-200">
                    <AvatarImage src="" alt={user?.name || 'User'} />
                    <AvatarFallback className="bg-calmBlue-100 text-calmBlue-700">
                      {user?.name ? getInitials(user.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
                <MobileNavLink to="/dashboard">
                  <Home className="w-5 h-5 mr-2" />
                  Dashboard
                </MobileNavLink>
                <MobileNavLink to="/journal">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Journal
                </MobileNavLink>
                <MobileNavLink to="/meditation">
                  <Moon className="w-5 h-5 mr-2" />
                  Meditation
                </MobileNavLink>
                <MobileNavLink to="/chat">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  AI Chat
                </MobileNavLink>
                <MobileNavLink to="/community">
                  <Users className="w-5 h-5 mr-2" />
                  Community
                </MobileNavLink>
                <div className="pt-2 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <MobileNavLink to="/auth">Login</MobileNavLink>
                <Button asChild className="w-full bg-calmBlue-500 hover:bg-calmBlue-600">
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink = ({ to, children }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center text-sm font-medium transition-colors hover:text-calmBlue-700 ${
        isActive ? 'text-calmBlue-600' : 'text-gray-600'
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, children }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-calmBlue-50 text-calmBlue-600'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {children}
    </Link>
  );
};

export default NavBar;
