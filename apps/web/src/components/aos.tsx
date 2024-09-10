'use client';

import * as React from 'react';

import Aos from 'aos';

interface AOSProps extends React.PropsWithChildren {
  //
}

const AosProvider: React.FC<AOSProps> = ({ children }) => {
  React.useEffect(() => {
    Aos.init({
      once: true,
    });
  }, []);

  return <>{children}</>;
};

export default AosProvider;
