import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import type { NavigationItem } from '@/types/navigation';

interface AppMenuProps {
  menus: NavigationItem[];
}

const AppMenu: React.FC<AppMenuProps> = ({ menus }) => {
  return (
    <div className='justify-start items-center gap-4 lg:flex hidden flex-row'>
      <NavigationMenu className='flex justify-start items-start'>
        <NavigationMenuList className='flex justify-start gap-4 flex-row'>
          {menus.map((menu) => {
            return (
              <NavigationMenuItem key={menu.title}>
                <NavigationMenuTrigger className='font-medium text-sm'>{menu.title}</NavigationMenuTrigger>
                <NavigationMenuContent className='!w-[500px] p-4'>
                  <div className='flex flex-col lg:grid grid-cols-3 gap-4'>
                    <div className='flex flex-col h-full justify-between'>
                      <div className='flex flex-col space-y-2'>
                        <p className='font-medium'>{menu.title}</p>
                        <p className='text-muted-foreground text-sm'>{menu.description}</p>
                      </div>
                    </div>

                    <div className='flex flex-col text-sm h-full justify-end col-span-2'>
                      {menu.items.map((subItem) => (
                        <NavigationMenuLink
                          href={subItem.href}
                          key={subItem.title}
                          className='flex flex-col justify-between items-start hover:bg-muted py-2 px-4 rounded-md'>
                          <span>{subItem.title}</span>
                          {subItem.description && (
                            <p className='text-muted-foreground text-sm'>{subItem.description}</p>
                          )}
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default AppMenu;
