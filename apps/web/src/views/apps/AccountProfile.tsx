'use client';

import { useEffect } from 'react';

// next
import { useRouter, usePathname } from 'next/navigation';

// material-ui
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

// project-imports
import MainCard from 'components/MainCard';
import TabProfile from 'sections/apps/profiles/account/TabProfile';
import TabPersonal from 'sections/apps/profiles/account/TabPersonal';
import TabPassword from 'sections/apps/profiles/account/TabPassword';

import { handlerActiveItem, useGetMenuMaster } from 'api/menu';

// assets
import { DocumentText, Lock, Profile } from 'iconsax-react';

type Props = {
  tab: string;
};

// ==============================|| PROFILE - ACCOUNT ||============================== //

export default function AccountProfile({ tab }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { menuMaster } = useGetMenuMaster();
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    router.replace(`/profile/account/${newValue}`);
  };

  useEffect(() => {
    if (menuMaster.openedItem !== 'account-profile')
      handlerActiveItem('account-profile');
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <>
      <MainCard border={false}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            width: '100%',
            paddingTop: theme.spacing(7),
          }}
        >
          <Tabs
            value={tab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="account profile tab"
          >
            <Tab
              label="Profile"
              icon={<Profile />}
              value="basic"
              iconPosition="start"
            />
            <Tab
              label="Personal"
              icon={<DocumentText />}
              value="personal"
              iconPosition="start"
            />
            <Tab
              label="Change Password"
              icon={<Lock />}
              value="password"
              iconPosition="start"
            />
          </Tabs>
        </Box>
        <Box sx={{ mt: 2.5 }}>
          {tab === 'basic' && <TabProfile />}
          {tab === 'personal' && <TabPersonal />}
          {tab === 'password' && <TabPassword />}
        </Box>
      </MainCard>
    </>
  );
}
