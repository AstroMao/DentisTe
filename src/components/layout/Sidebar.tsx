import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Users,
  CalendarDays,
  CreditCard,
  Package,
  Settings,
  BriefcaseMedical, // Or other dental icon
  type LucideIcon,
  Hospital
} from 'lucide-react';
import { cn } from '@/lib/utils'; // Your shadcn/ui utility

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/patients', label: 'Patients', icon: Users },
  { href: '/appointments', label: 'Appointments', icon: CalendarDays },
  { href: '/billing', label: 'Billing', icon: CreditCard },
  { href: '/inventory', label: 'Inventory', icon: Package },
  { href: '/services', label: 'Services', icon: BriefcaseMedical }, // Added Services
  { href: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="hidden border-r bg-card text-card-foreground md:block w-64">
      <div className="flex flex-col h-full">
        <div className="flex items-center h-16 px-6 border-b">
           <NavLink to="/dashboard" className="flex items-center gap-2 font-semibold">
            <Hospital className="w-6 h-6 text-primary" /> {/* Or your clinic logo */}
            <span className="">Dental Clinic POS</span>
          </NavLink>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted',
                  isActive && 'bg-primary/10 text-primary font-semibold'
                )
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        {/* Optional: Add footer or other elements to sidebar */}
      </div>
    </aside>
  );
};

export default Sidebar;