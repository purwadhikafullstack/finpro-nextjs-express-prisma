import { useState, MouseEvent, useEffect } from 'react';

// next
import { usePathname, useRouter } from 'next/navigation';

// material-ui
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import {
  Clipboard,
  I24Support,
  Lock1,
  Messages1,
} from 'iconsax-react';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

export default function SettingTab() {
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
      '/apps/profiles/account/settings': 1,
    };

    setSelectedIndex(pathToIndex[pathname] ?? undefined);
  }, [pathname]);

  return (
    <List
      component="nav"
      sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}
    >
      <Link
        style={{ textDecoration: 'none' }}
        target="_blank"
        href="https://phoenixcoded.authordesk.app/"
      >
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event: MouseEvent<HTMLDivElement>) =>
            handleListItemClick(event, 0)
          }
        >
          <ListItemIcon>
            <I24Support variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="Support" />
        </ListItemButton>
      </Link>

      <ListItemButton
        selected={selectedIndex === 2}
        onClick={(event: MouseEvent<HTMLDivElement>) =>
          handleListItemClick(event, 2)
        }
      >
        <ListItemIcon>
          <Lock1 variant="Bulk" size={18} />
        </ListItemIcon>
        <ListItemText primary="Privacy Center" />
      </ListItemButton>
      <Link
        style={{ textDecoration: 'none' }}
        target="_blank"
        href="https://phoenixcoded.authordesk.app/"
      >
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event: MouseEvent<HTMLDivElement>) =>
            handleListItemClick(event, 3)
          }
        >
          <ListItemIcon>
            <Messages1 variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItemButton>
      </Link>
      <ListItemButton
        selected={selectedIndex === 4}
        onClick={(event: MouseEvent<HTMLDivElement>) =>
          handleListItemClick(event, 4)
        }
      >
        <ListItemIcon>
          <Clipboard variant="Bulk" size={18} />
        </ListItemIcon>
        <ListItemText primary="History" />
      </ListItemButton>
    </List>
  );
}
