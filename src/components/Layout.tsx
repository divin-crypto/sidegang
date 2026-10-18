import { Outlet } from 'react-router-dom';
import SiteNavigation from './SiteNavigation';
import SiteFooter from './SiteFooter';

export default function Layout() {
  return (
    <>
      <SiteNavigation />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
