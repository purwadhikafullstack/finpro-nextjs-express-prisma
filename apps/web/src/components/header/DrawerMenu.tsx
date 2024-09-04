// components/DrawerMenu.tsx

import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Links from '@mui/material/Link';
import { Minus } from 'iconsax-react';

interface DrawerMenuProps {
  drawerToggle: boolean;
  drawerToggler: (open: boolean) => (event: any) => void;
  linksSx: any;
  url: string;
}

export default function DrawerMenu({
  drawerToggle,
  drawerToggler,
  linksSx,
  url,
}: DrawerMenuProps) {
  return (
    <Drawer
      anchor="top"
      open={drawerToggle}
      onClose={drawerToggler(false)}
      sx={{ '& .MuiDrawer-paper': { backgroundImage: 'none' } }}
    >
      <Box
        sx={{
          width: 'auto',
          '& .MuiListItemIcon-root': {
            fontSize: '1rem',
            minWidth: 32,
          },
        }}
        role="presentation"
        onKeyDown={drawerToggler(false)}
      >
        <List>
          <ListItemButton
            onClick={(event) => {
              const servicesElement = document.getElementById('services');
              if (servicesElement) {
                servicesElement.scrollIntoView({ behavior: 'smooth' });
              }
              drawerToggler(false)(event); // Passing event to drawerToggler
            }}
          >
            <ListItemIcon>
              <Minus color="secondary.main" />
            </ListItemIcon>
            <ListItemText
              primary="Our Services"
              primaryTypographyProps={{
                variant: 'h6',
                color: 'secondary.main',
              }}
            />
          </ListItemButton>
          <Links sx={linksSx} href="/#" target="_blank">
            <ListItemButton>
              <ListItemIcon>
                <Minus color="secondary.main" />
              </ListItemIcon>
              <ListItemText
                primary="Locations"
                primaryTypographyProps={{
                  variant: 'h6',
                  color: 'secondary.main',
                }}
              />
            </ListItemButton>
          </Links>
          <Links sx={linksSx} href="/#" target="_blank">
            <ListItemButton>
              <ListItemIcon>
                <Minus color="secondary.main" />
              </ListItemIcon>
              <ListItemText
                primary="FAQ"
                primaryTypographyProps={{
                  variant: 'h6',
                  color: 'secondary.main',
                }}
              />
            </ListItemButton>
          </Links>
          <Links sx={linksSx} href="/#" target="_blank">
            <ListItemButton>
              <ListItemIcon>
                <Minus color="secondary.main" />
              </ListItemIcon>
              <ListItemText
                primary="Promotions"
                primaryTypographyProps={{
                  variant: 'h6',
                  color: 'secondary.main',
                }}
              />
            </ListItemButton>
          </Links>
          <Links sx={linksSx} href="/#" target="_blank">
            <ListItemButton>
              <ListItemIcon>
                <Minus color="secondary.main" />
              </ListItemIcon>
              <ListItemText
                primary="Contact Us"
                primaryTypographyProps={{
                  variant: 'h6',
                  color: 'secondary.main',
                }}
              />
            </ListItemButton>
          </Links>
        </List>
      </Box>
    </Drawer>
  );
}
