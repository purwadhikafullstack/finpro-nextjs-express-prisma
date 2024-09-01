import { useEffect, useRef } from 'react';

// ==============================|| HOOKS - FORMS REFERENCE  ||============================== //

export default function useScriptRef() {
  const scripted = useRef(true);

  useEffect(() => {
    scripted.current = false;
  }, []);

  return scripted;
}
