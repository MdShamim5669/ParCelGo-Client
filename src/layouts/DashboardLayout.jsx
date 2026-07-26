import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="drawer lg:drawer-open font-sans">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col bg-gray-50 min-h-screen print:bg-white print:w-full print:m-0">
        {/* Mobile Navbar/Header for Dashboard */}
        <div className="w-full navbar bg-white lg:hidden border-b border-gray-200 shadow-sm px-4 sticky top-0 z-40 print:hidden">
          <div className="flex-none">
            <label htmlFor="dashboard-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost text-[#113236]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-bold text-xl text-[#113236]">Dashboard</div>
        </div>
        
        {/* Main Content Area */}
        <div className="w-full flex-grow p-4 md:p-8 overflow-y-auto">
            <div className="max-w-[1200px] mx-auto w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
        </div>
      </div>

      {/* Sidebar Area */}
      <div className="drawer-side z-50 print:hidden">
        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;
