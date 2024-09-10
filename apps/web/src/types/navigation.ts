import { LucideIcon } from 'lucide-react';
import { Role } from './user';

export interface NavigationLink {
  title: string;
  href: string;
  description?: string;
}

export interface NavigationItem {
  title: string;
  description: string;
  items: NavigationLink[];
  icon?: LucideIcon;
}

export interface SidebarMenu {
  title: string;
  href: string;
  roles: Role[];
  icon: LucideIcon;
}
