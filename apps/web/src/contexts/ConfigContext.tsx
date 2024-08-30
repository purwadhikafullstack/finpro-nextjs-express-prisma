import { createContext, ReactElement } from 'react';

// project-imports
import config from 'config';
import useLocalStorage from 'hooks/useLocalStorage';
import { MenuOrientation, ThemeDirection, ThemeMode } from 'config';

// types
import {
  CustomizationProps,
  FontFamily,
  I18n,
  PresetColor,
} from 'types/config';

// initial state
const initialState: CustomizationProps = {
  ...config,
  onChangeContainer: () => {},
  onChangeLocalization: () => {},
  onChangeMode: () => {},
  onChangePresetColor: () => {},
  onChangeDirection: () => {},
  onChangeMiniDrawer: () => {},
  onChangeThemeLayout: () => {},
  onChangeMenuOrientation: () => {},
  onChangeMenuCaption: () => {},
  onChangeFontFamily: () => {},
  onChangeContrast: () => {},
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);

type ConfigProviderProps = {
  children: ReactElement;
};

function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useLocalStorage(
    'able-pro-material-next-ts-config',
    initialState,
  );

  const onChangeContainer = (container: string) => {
    let containerValue: boolean;

    if (container === 'fluid') {
      containerValue = false;
    } else {
      containerValue = true;
    }
    setConfig({
      ...config,
      container: containerValue,
    });
  };

  const onChangeLocalization = (lang: I18n) => {
    setConfig({
      ...config,
      i18n: lang,
    });
  };

  const onChangeMode = (mode: ThemeMode) => {
    setConfig({
      ...config,
      mode,
    });
  };

  const onChangePresetColor = (theme: PresetColor) => {
    setConfig({
      ...config,
      presetColor: theme,
    });
  };

  const onChangeDirection = (direction: ThemeDirection) => {
    setConfig({
      ...config,
      themeDirection: direction,
    });
  };

  const onChangeMiniDrawer = (miniDrawer: boolean) => {
    setConfig({
      ...config,
      miniDrawer,
    });
  };

  const onChangeThemeLayout = (
    direction: ThemeDirection,
    miniDrawer: boolean,
  ) => {
    setConfig({
      ...config,
      miniDrawer,
      themeDirection: direction,
    });
  };

  const onChangeContrast = (themeContrast: string) => {
    let contrastValue: boolean;

    if (themeContrast === 'contrast') {
      contrastValue = true;
    } else {
      contrastValue = false;
    }
    setConfig({
      ...config,
      themeContrast: contrastValue,
    });
  };

  const onChangeMenuCaption = (menuCaption: string) => {
    let captionValue: boolean;

    if (menuCaption === 'caption') {
      captionValue = true;
    } else {
      captionValue = false;
    }
    setConfig({
      ...config,
      menuCaption: captionValue,
    });
  };

  const onChangeMenuOrientation = (layout: MenuOrientation) => {
    setConfig({
      ...config,
      menuOrientation: layout,
    });
  };

  const onChangeFontFamily = (fontFamily: FontFamily) => {
    setConfig({
      ...config,
      fontFamily,
    });
  };

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeContainer,
        onChangeLocalization,
        onChangeMode,
        onChangePresetColor,
        onChangeDirection,
        onChangeMiniDrawer,
        onChangeThemeLayout,
        onChangeMenuOrientation,
        onChangeMenuCaption,
        onChangeFontFamily,
        onChangeContrast,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext };
