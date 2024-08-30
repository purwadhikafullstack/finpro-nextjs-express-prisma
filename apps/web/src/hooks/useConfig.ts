import { useContext } from 'react';
import { ConfigContext } from 'contexts/ConfigContext';

// ==============================|| HOOKS - CONFIG  ||============================== //

export default function useConfig() {
  return useContext(ConfigContext);
}
