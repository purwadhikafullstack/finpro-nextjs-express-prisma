import { useState, useEffect, MouseEvent } from 'react';

// next
import { useRouter, usePathname } from 'next/navigation';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import { Map, Location, Edit2, Logout, Profile } from 'iconsax-react';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

interface Props {
  handleLogout: () => void;
}

export default function ProfileTab({ handleLogout }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const router = useRouter();
  const pathname = usePathname();

  const handleListItemClick = (
    event: MouseEvent<HTMLDivElement>,
    index: number,
    route: string = '',
  ) => {
    setSelectedIndex(index);

    if (route && route !== '') {
      router.push(route);
    }
  };

  useEffect(() => {
    const pathToIndex: { [key: string]: number } = {
      '/apps/profiles/user/personal': 0,
      '/profile/account/personal': 1,
      '/profile/account/basic': 2,
      '/apps/invoice/details/1': 3,
    };

    setSelectedIndex(pathToIndex[pathname] ?? undefined);
  }, [pathname]);

  return (
    <List
      component="nav"
      sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}
    >
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(event: MouseEvent<HTMLDivElement>) =>
          handleListItemClick(event, 0, '/#')
        }
      >
        <ListItemIcon>
          <Location variant="Bulk" size={18} />
        </ListItemIcon>
        <ListItemText primary="Order Tracking " />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event: MouseEvent<HTMLDivElement>) =>
          handleListItemClick(event, 1, '/profile/account/personal')
        }
      >
        <ListItemIcon>
          <Edit2 variant="Bulk" size={18} />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 2}
        onClick={(event: MouseEvent<HTMLDivElement>) =>
          handleListItemClick(event, 2, '/profile/account/basic')
        }
      >
        <ListItemIcon>
          <Profile variant="Bulk" size={18} />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 3}
        onClick={(event: MouseEvent<HTMLDivElement>) =>
          handleListItemClick(event, 3, '/#')
        }
      >
        <ListItemIcon>
          <Map variant="Bulk" size={18} />
        </ListItemIcon>
        <ListItemText primary="Addresses" />
      </ListItemButton>

      <ListItemButton selected={selectedIndex === 4} onClick={handleLogout}>
        <ListItemIcon>
          <Logout variant="Bulk" size={18} />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
}
