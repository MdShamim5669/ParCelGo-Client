import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useAdmin from '../../hooks/useAdmin';
import useRider from '../../hooks/useRider';

const Sidebar = () => {
  const { user, logOut } = useContext(AuthContext);

    const [isAdmin] = useAdmin();
    const [isRider] = useRider();

    const userRoutes = [
        { name: 'My Profile', path: '/dashboard/my-profile', icon: '👤' },
        { name: 'Book Parcel', path: '/dashboard/book-parcel', icon: '🚚' },
        { name: 'My Parcels', path: '/dashboard/my-parcels', icon: '📦' },
    ];

    const adminRoutes = [
        { name: 'Admin Overview', path: '/dashboard/admin', icon: '📊' },
        { name: 'Manage Users', path: '/dashboard/admin/users', icon: '👥' },
        { name: 'Assign Riders', path: '/dashboard/admin/assign-riders', icon: '🛵' },
    ];

    const riderRoutes = [
        { name: 'Rider Dashboard', path: '/dashboard/rider', icon: '🏍️' },
        { name: 'My Deliveries', path: '/dashboard/rider/deliveries', icon: '📦' },
    ];

    const navLinks = [
        ...(isAdmin ? adminRoutes : isRider ? riderRoutes : userRoutes),
        { name: 'Home', path: '/', icon: '🏠' },
    ];

  return (
    <div className="w-64 min-h-screen bg-[#113236] text-white flex flex-col">
      {/* Logo Area */}
      <div className="p-6 text-center border-b border-gray-700">
        <h2 className="text-3xl font-extrabold text-[#c4f05b]">ParCelGo</h2>
      </div>

      {/* Navigation Links */}
      <ul className="menu p-4 flex-grow gap-2 text-[15px]">
        {navLinks.map((link, index) => (
          <li key={index}>
            <NavLink 
              to={link.path}
              end={['/dashboard', '/dashboard/admin', '/dashboard/rider'].includes(link.path)} // Ensure exact matching for overview/root routes
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-[#c4f05b] text-[#113236] font-bold shadow-md' : 'hover:bg-[#1a4a50] text-white font-medium'}`
              }
            >
              <span className="text-lg">{link.icon}</span>
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* User & Logout Section */}
      <div className="p-4 border-t border-gray-700 bg-[#0d2629]">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden shrink-0 border-2 border-[#c4f05b]">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="user" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl">👤</span>
            )}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate text-white">{user?.displayName || 'User'}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
        <button 
          onClick={logOut}
          className="btn w-full bg-red-500/10 mt-5 hover:bg-red-500 hover:text-white border-none text-red-400 rounded-xl transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
