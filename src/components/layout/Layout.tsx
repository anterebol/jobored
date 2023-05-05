import { FC, PropsWithChildren } from 'react';
import { Header } from './header/Header';

export const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      {children}
    </div>
  );
};
