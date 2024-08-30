// project-import
import { MenuOrientation, ThemeMode, ThemeDirection } from 'config';

export type FontFamily = string;
export type PresetColor = 'default' | 'theme1' | 'theme2' | 'theme3' | 'theme4' | 'theme5' | 'theme6' | 'theme7' | 'theme8';
export type I18n = 'en' | 'fr' | 'ro' | 'zh'; // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese

// ==============================|| TYPES - CONFIG ||============================== //

export type CustomizationActionProps = {
  type: string;
  payload?: CustomizationProps;
};

export type DefaultConfigProps = {
  /**
   * The props used for the theme font-style.
   * We use options from next/font ref -
   * https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
   * https://fonts.google.com/variablefonts
   */
  fontFamily: FontFamily;

  /**
   * The props used for display menu-items with multi-language.
   * We provide static below languages according to 'react-intl' options - https://www.npmjs.com/package/react-intl
   * 'en' (default)
   * 'fr'
   * 'ro'
   * 'zh'
   */
  i18n: I18n;

  /**
   * the props used for menu orientation (diffrent theme layout).
   * we provide static below options -
   * 'vertical' (default)
   * 'horizontal'
   */
  menuOrientation: MenuOrientation;

  /**
   * the props used for show/hide caption drawer
   * default - true
   * false - will hide menu caption
   */
  menuCaption: boolean;

  /**
   * the props used for show mini variant drawer
   * the mini variant is recommended for apps sections that need quick selection access alongside content.
   * default - false
   */
  miniDrawer: boolean;

  /**
   * the props used for theme container.
   * the container centers your content horizontally. It's the most basic layout element.
   * default - true which show container
   * false - will show fluid
   */
  container: boolean;

  /**
   * the props used for default theme palette mode
   * explore the default theme
   * below theme options -
   * 'light' (default)
   * 'dark'
   */
  mode: ThemeMode;

  /**
   * the props used for theme primary color variants
   * we provide static below options thoe s are already defaine in src/themes/theme -
   * 'default'
   * 'theme1'
   * 'theme2'
   * 'theme3'
   * 'theme4'
   * 'theme5'
   * 'theme6'
   * 'theme7'
   * 'theme8'
   */
  presetColor: PresetColor;

  /**
   * the props used for default theme direction
   * explore the default theme
   * below theme options -
   * 'ltr' (default)
   * 'rtl'
   */
  themeDirection: ThemeDirection;

  /**
   * the props used for theme contrast.
   * set box-shadow .
   * default - false which show card without box-shadow and background default
   * true - will show card with box-shadow and background pure white
   */
  themeContrast: boolean;
};

export type CustomizationProps = {
  fontFamily: FontFamily;
  i18n: I18n;
  miniDrawer: boolean;
  container: boolean;
  menuOrientation: MenuOrientation;
  menuCaption: boolean;
  mode: ThemeMode;
  presetColor: PresetColor;
  themeDirection: ThemeDirection;
  themeContrast: boolean;
  onChangeContainer: (container: string) => void;
  onChangeLocalization: (lang: I18n) => void;
  onChangeMode: (mode: ThemeMode) => void;
  onChangePresetColor: (theme: PresetColor) => void;
  onChangeDirection: (direction: ThemeDirection) => void;
  onChangeMiniDrawer: (miniDrawer: boolean) => void;
  onChangeThemeLayout: (direction: ThemeDirection, miniDrawer: boolean) => void;
  onChangeMenuOrientation: (menuOrientation: MenuOrientation) => void;
  onChangeMenuCaption: (menuCaption: string) => void;
  onChangeFontFamily: (fontFamily: FontFamily) => void;
  onChangeContrast: (themeContrast: string) => void;
};
