import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, Search, Library, UserCircle, Settings, LogOut } from 'lucide-react'; // Example icons

// Doraemon theme colors (using standard Tailwind shades)
const DORAEMON_BLUE = 'bg-blue-500';
const DORAEMON_WHITE = 'text-white';
const DORAEMON_RED_ACCENT = 'hover:bg-red-400';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                ${isActive ? `${DORAEMON_BLUE} ${DORAEMON_WHITE}` : `text-gray-200 hover:${DORAEMON_WHITE} ${DORAEMON_RED_ACCENT} hover:bg-opacity-75`} `}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const Sidebar: React.FC = () => {
  console.log("Rendering Sidebar");
  const location = useLocation();

  // Define navigation items (can be passed as props or fetched)
  const navLinks = [
    { to: "/", icon: <Home className="h-5 w-5" />, label: "Home" },
    { to: "/search", icon: <Search className="h-5 w-5" />, label: "Search" },
    { to: "/library/playlists", icon: <Library className="h-5 w-5" />, label: "Your Library" },
  ];

  const userActions = [
    { to: "/profile", icon: <UserCircle className="h-5 w-5" />, label: "Profile" },
    { to: "/settings", icon: <Settings className="h-5 w-5" />, label: "Settings" },
    // Add logout functionality separately
  ];


  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col h-screen fixed left-0 top-0 p-4 space-y-6">
      {/* Logo/Brand */}
      <div className="text-2xl font-bold text-center text-yellow-400 py-2">
        MusicApp
      </div>

      {/* User Profile (Simplified) */}
      <div className="flex items-center space-x-3 p-2 border-b border-gray-700 pb-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm">User Name</p>
          <Link to="/profile" className="text-xs text-blue-300 hover:text-yellow-400">View Profile</Link>
        </div>
      </div>

      <ScrollArea className="flex-grow">
        <nav className="space-y-1 px-2">
          {navLinks.map((link) => (
            <NavItem
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              isActive={location.pathname === link.to}
            />
          ))}
        </nav>
      </ScrollArea>

      {/* Bottom Actions (User/Settings/Logout) */}
      <div className="pt-4 border-t border-gray-700 mt-auto">
        <nav className="space-y-1 px-2">
          {userActions.map((link) => (
             <NavItem
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              isActive={location.pathname === link.to}
            />
          ))}
           <button
            // onClick={handleLogout} // Implement logout
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                        text-gray-200 hover:${DORAEMON_WHITE} ${DORAEMON_RED_ACCENT} hover:bg-opacity-75`}
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;