import {
  Car,
  Heart,
  Home,
  Lock,
  PersonStanding,
  Shirt,
  ShoppingCart,
  Store,
  Timer,
  Users,
  Zap,
  ZoomIn,
} from 'lucide-react';

import { SidebarMenu } from '@/types/navigation';

export const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME as string;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const SIDEBAR_LINKS: SidebarMenu[] = [
  {
    icon: Home,
    title: 'Dashboard',
    href: '/dashboard',
    roles: ['Driver', 'SuperAdmin', 'OutletAdmin', 'WashingWorker', 'IroningWorker', 'PackingWorker'],
  },
  { icon: Store, title: 'Outlets', href: '/dashboard/outlets', roles: ['SuperAdmin'] },
  { icon: Users, title: 'Customers', href: '/dashboard/customers', roles: ['SuperAdmin'] },
  { icon: Shirt, title: 'Laundry Item', href: '/dashboard/laundry-items', roles: ['SuperAdmin'] },
  { icon: ShoppingCart, title: 'Orders', href: '/dashboard/orders', roles: ['SuperAdmin', 'OutletAdmin'] },
  { icon: Car, title: 'Deliveries', href: '/dashboard/deliveries', roles: ['SuperAdmin', 'Driver'] },
  {
    icon: Zap,
    title: 'Jobs',
    href: '/dashboard/jobs',
    roles: ['SuperAdmin', 'IroningWorker', 'PackingWorker', 'WashingWorker'],
  },
];

export const FEATURES_LIST = [
  {
    title: 'Laundry Pickup Service',
    description:
      "We provide door-to-door laundry pickup and delivery without any minimum spend. Just schedule a pickup, and we'll handle the rest.",
    image: '/features/feature1.jpg',
  },
  {
    title: 'Express Wash & Fold',
    description:
      'Need your laundry done in a hurry? Our Express Wash & Fold service guarantees a 24-hour turnaround time.',
    image: '/features/feature2.jpg',
  },
  {
    title: 'Dry Cleaning Service',
    description:
      'Keep your delicate garments pristine with our premium dry cleaning service, expertly handling everything from suits to silk dresses with care and precision.',
    image: '/features/feature3.jpg',
  },
];

export const AVATAR_LINKS = [
  { title: 'Profile', href: '/profile' },
  { title: 'Orders', href: '/orders' },
  { title: 'Support', href: '/support' },
];
