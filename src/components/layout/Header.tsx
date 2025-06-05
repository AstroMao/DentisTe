import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'; // shadcn/ui
import { Button } from '@/components/ui/button'; // shadcn/ui
import { BriefcaseMedical, CalendarDays, CircleUser, CreditCard, Home, Menu, Package, Settings, Users, type LucideIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext'; // Adjust path
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // For mobile nav
import { NavLink } from 'react-router-dom';
import { Hospital } from 'lucide-react'; // Re-using for mobile
import { cn } from '@/lib/utils';

// Re-define navItems here or import from Sidebar if refactored
const mobileNavItems: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/patients', label: 'Patients', icon: Users },
  { href: '/appointments', label: 'Appointments', icon: CalendarDays },
  { href: '/billing', label: 'Billing', icon: CreditCard },
  { href: '/inventory', label: 'Inventory', icon: Package },
  { href: '/services', label: 'Services', icon: BriefcaseMedical },
  { href: '/settings', label: 'Settings', icon: Settings },
];


const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center h-16 gap-4 px-4 border-b bg-card text-card-foreground md:px-6 shrink-0">
       {/* Mobile Navigation Toggle */}
       <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="w-5 h-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <NavLink
              to="/dashboard"
              className="flex items-center gap-2 mb-4 text-lg font-semibold"
            >
              <Hospital className="w-6 h-6 text-primary" />
              <span className="">Dental Clinic</span>
            </NavLink>
            {mobileNavItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                    isActive && "bg-muted text-foreground font-semibold"
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Placeholder for Breadcrumbs or Page Title if needed */}
      <div className="flex-1">
        {/* <h1 className="text-lg font-semibold">Dashboard</h1> */}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="w-5 h-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user?.email || user?.username || 'My Account'}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => alert('Profile page not implemented yet.')}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => alert('Settings page not implemented yet.')}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;