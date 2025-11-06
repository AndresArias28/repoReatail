import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #ffffff, #fffbeb, #fff7ed)'}}>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
