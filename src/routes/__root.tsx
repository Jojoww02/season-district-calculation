import { createRootRoute, Outlet } from '@tanstack/react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HelpSection from '../components/district-season/HelpSection';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="min-h-dvh">
      <Header />
      <HelpSection />
      <Outlet />
      <Footer />
    </div>
  );
}
