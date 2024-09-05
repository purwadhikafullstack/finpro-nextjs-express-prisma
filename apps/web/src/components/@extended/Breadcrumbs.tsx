'use client';

import { CSSProperties, ReactElement, useState } from 'react';

// next
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

// material-ui
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

// project import
import MainCard from 'components/MainCard';
// import navigation from 'menu-items';
import { ThemeDirection } from 'config';

// assets
import { ArrowRight2, Buildings2, Home3 } from 'iconsax-react';

// types
import { OverrideIcon } from 'types/root';
import { NavItemType } from 'types/menu';

interface BreadcrumbLinkProps {
  title: string;
  to?: string;
  icon?: string | OverrideIcon;
}

export interface BreadCrumbSxProps extends CSSProperties {
  mb?: string;
  bgcolor?: string;
}

interface Props {
  card?: boolean;
  custom?: boolean;
  divider?: boolean;
  heading?: string;
  icon?: boolean;
  icons?: boolean;
  maxItems?: number;
  links?: BreadcrumbLinkProps[];
  rightAlign?: boolean;
  separator?: OverrideIcon;
  title?: boolean;
  titleBottom?: boolean;
  sx?: BreadCrumbSxProps;
}

// ==============================|| BREADCRUMBS ||============================== //

export default function Breadcrumbs({
  card = false,
  custom = false,
  divider = false,
  heading,
  icon,
  icons,
  maxItems,
  links,
  rightAlign,
  separator,
  title = true,
  titleBottom = true,
  sx,
  ...others
}: Props) {
  const theme = useTheme();
  const location = usePathname();
  const [main, setMain] = useState<NavItemType | undefined>();
  const [item, setItem] = useState<NavItemType>();

  const iconSX = {
    marginRight:
      theme.direction === ThemeDirection.RTL ? 0 : theme.spacing(0.75),
    marginLeft:
      theme.direction === ThemeDirection.RTL ? theme.spacing(0.75) : 0,
    width: '1rem',
    height: '1rem',
    color: theme.palette.secondary.main,
  };

  let customLocation = location;

  // only used for component demo breadcrumbs
  if (customLocation.includes('/components-overview/breadcrumbs')) {
    customLocation = '/apps/customer/customer-card';
  }

  // useEffect(() => {
  //   navigation?.items?.map((menu: NavItemType) => {
  //     if (menu.type && menu.type === 'group') {
  //       if (menu?.url && menu.url === customLocation) {
  //         setMain(menu);
  //         setItem(menu);
  //       } else {
  //         getCollapse(menu as { children: NavItemType[]; type?: string });
  //       }
  //     }
  //     return false;
  //   });
  // });

  // set active item state
  const getCollapse = (menu: NavItemType) => {
    if (!custom && menu.children) {
      menu.children.filter((collapse: NavItemType) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse as { children: NavItemType[]; type?: string });
          if (collapse.url === customLocation) {
            setMain(collapse);
            setItem(collapse);
          }
        } else if (collapse.type && collapse.type === 'item') {
          if (customLocation === collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  // item separator
  const SeparatorIcon = separator!;
  const separatorIcon = separator ? (
    <SeparatorIcon size={12} />
  ) : (
    <ArrowRight2 size={12} />
  );

  let mainContent;
  let itemContent;
  let breadcrumbContent: ReactElement = <Typography />;
  let itemTitle: NavItemType['title'] = '';
  let CollapseIcon;
  let ItemIcon;

  // collapse item
  if (
    !custom &&
    main &&
    main.type === 'collapse' &&
    main.breadcrumbs === true
  ) {
    CollapseIcon = main.icon ? main.icon : Buildings2;
    mainContent = (
      <NextLink href={(main.url as string) || '/'} passHref legacyBehavior>
        <Typography
          variant="body1"
          sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          color={
            window.location.pathname === main.url
              ? 'text.secondary'
              : 'text.primary'
          }
        >
          {icons && <CollapseIcon style={iconSX} />}
          {main.title}
        </Typography>
      </NextLink>
    );
    breadcrumbContent = (
      <MainCard
        border={card}
        sx={
          card === false
            ? { mb: 3, bgcolor: 'transparent', ...sx }
            : { mb: 3, ...sx }
        }
        {...others}
        content={card}
        boxShadow={false}
      >
        <Grid
          container
          direction={rightAlign ? 'row' : 'column'}
          justifyContent={rightAlign ? 'space-between' : 'flex-start'}
          alignItems={rightAlign ? 'center' : 'flex-start'}
          spacing={0.5}
        >
          <Grid item>
            <MuiBreadcrumbs
              aria-label="breadcrumb"
              maxItems={maxItems || 8}
              separator={separatorIcon}
            >
              <NextLink href="/" passHref legacyBehavior>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{
                    textDecoration: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {icons && <Home3 style={iconSX} />}
                  {icon && !icons && (
                    <Home3
                      variant="Bold"
                      style={{ ...iconSX, marginRight: 0 }}
                    />
                  )}
                  {(!icon || icons) && 'Home'}
                </Typography>
              </NextLink>
              {mainContent}
            </MuiBreadcrumbs>
          </Grid>
          {title && titleBottom && (
            <Grid item sx={{ mt: card === false ? 0 : 1 }}>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                {main.title}
              </Typography>
            </Grid>
          )}
        </Grid>
        {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
      </MainCard>
    );
  }

  // items
  if (
    (item && item.type === 'item') ||
    (item?.type === 'group' && item?.url) ||
    custom
  ) {
    itemTitle = item?.title;

    ItemIcon = item?.icon ? item.icon : Buildings2;
    itemContent = (
      <Typography
        variant="body1"
        color="text.primary"
        sx={{ display: 'flex', fontWeight: 500, alignItems: 'center' }}
      >
        {icons && <ItemIcon style={iconSX} />}
        {itemTitle}
      </Typography>
    );

    let tempContent = (
      <MuiBreadcrumbs
        aria-label="breadcrumb"
        maxItems={maxItems || 8}
        separator={separatorIcon}
      >
        <NextLink href="/" passHref legacyBehavior>
          <Typography
            color="text.secondary"
            variant="h6"
            sx={{
              textDecoration: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {icons && <Home3 style={iconSX} />}
            {icon && !icons && (
              <Home3 variant="Bold" style={{ ...iconSX, marginRight: 0 }} />
            )}
            {(!icon || icons) && 'Home'}
          </Typography>
        </NextLink>
        {mainContent}
        {itemContent}
      </MuiBreadcrumbs>
    );

    if (custom && links && links?.length > 0) {
      tempContent = (
        <MuiBreadcrumbs
          aria-label="breadcrumb"
          maxItems={maxItems || 8}
          separator={separatorIcon}
        >
          {links?.map((link: BreadcrumbLinkProps, index: number) => {
            CollapseIcon = link.icon ? link.icon : Buildings2;
            const key = index.toString();
            let breadcrumbLink = (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  textDecoration: 'none',
                  fontWeight: 500,
                  ...(link.to && { fontWeight: 400, cursor: 'pointer' }),
                }}
                color={link.to ? 'text.secondary' : 'text.primary'}
              >
                {link.icon && <CollapseIcon style={iconSX} />}
                {link.title}
              </Typography>
            );
            if (link.to) {
              breadcrumbLink = (
                <NextLink key={key} href={link.to} passHref legacyBehavior>
                  {breadcrumbLink}
                </NextLink>
              );
            }
            return breadcrumbLink;
          })}
        </MuiBreadcrumbs>
      );
    }

    // main
    if (item?.breadcrumbs !== false || custom) {
      breadcrumbContent = (
        <MainCard
          border={card}
          sx={
            card === false
              ? { mb: 3, bgcolor: 'transparent', ...sx }
              : { mb: 3, ...sx }
          }
          {...others}
          content={card}
          boxShadow={false}
        >
          <Grid
            container
            direction={rightAlign ? 'row' : 'column'}
            justifyContent={rightAlign ? 'space-between' : 'flex-start'}
            alignItems={rightAlign ? 'center' : 'flex-start'}
            spacing={0.5}
          >
            {title && !titleBottom && (
              <Grid item>
                <Typography variant="h2" sx={{ fontWeight: 700 }}>
                  {custom ? heading : item?.title}
                </Typography>
              </Grid>
            )}
            <Grid item>{tempContent}</Grid>
            {title && titleBottom && (
              <Grid item sx={{ mt: card === false ? 0 : 1 }}>
                <Typography variant="h2" sx={{ fontWeight: 700 }}>
                  {custom ? heading : item?.title}
                </Typography>
              </Grid>
            )}
          </Grid>
          {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
}
