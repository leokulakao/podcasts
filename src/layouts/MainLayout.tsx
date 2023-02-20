import React from 'react';

import { Header } from '../podcasts';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />

      <div>{children}</div>
    </>
  );
};
