import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-zap-gray">
      <Navbar />
      <main className="flex-grow pt-32 px-4 sm:px-6 lg:px-8 flex justify-center w-full">
        <div className="w-full max-w-[1100px]">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
