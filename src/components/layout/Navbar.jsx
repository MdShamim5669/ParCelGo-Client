import { NavLink, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then()
      .catch(error => {
        console.log(error);
      });
  };

  const navLinkClass = ({ isActive }) => 
    isActive 
      ? "text-zap-dark font-bold text-[15px]" 
      : "text-gray-500 hover:text-zap-dark font-medium text-[15px]";

  const navLinks = (
    <>
      <li><NavLink to="/services" className={navLinkClass}>Services</NavLink></li>
      <li><NavLink to="/dashboard/book-parcel" className={navLinkClass}>Send a Parcel</NavLink></li>
      <li><NavLink to="/coverage" className={navLinkClass}>Coverage Areas</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/dashboard/my-parcels" className={navLinkClass}>My Parcels</NavLink></li>
          <li><NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink></li>
        </>
      )}
      <li><NavLink to="/about" className={navLinkClass}>About Us</NavLink></li>
    </>
  );

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="navbar bg-white rounded-[2rem] shadow-sm px-6 py-2 w-full max-w-[1100px] border border-gray-100">
        
        {/* Logo Section */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            {/* Logo Box */}
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute inset-0 bg-[#c4f05b] rounded-tl-lg rounded-br-lg transform -skew-x-12"></div>
              <div className="absolute inset-0 bg-[#c4f05b] opacity-50 rounded-tl-lg rounded-br-lg transform skew-x-12"></div>
            </div>
            <span className="font-extrabold text-[22px] tracking-tight text-zap-dark ml-1">ParCelGo</span>
          </Link>
        </div>

        {/* Center Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 lg:mr-8 xl:mr-12">
            {navLinks}
          </ul>
        </div>

        {/* Right Actions */}
        <div className="navbar-end gap-3 flex items-center">
          {user ? (
            <button onClick={handleLogOut} className="btn btn-outline border-gray-200 text-zap-dark hover:bg-gray-50 hover:border-gray-300 rounded-[14px] px-6 font-semibold hidden sm:flex h-11 min-h-[44px]">
              Log Out
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline border-gray-200 text-zap-dark hover:bg-gray-50 hover:border-gray-300 rounded-[14px] px-6 font-semibold hidden sm:flex h-11 min-h-[44px]">
                Sign In
              </Link>
              {/* Circular Arrow Button for Register */}
              <Link to="/register" className="btn btn-circle bg-zap-dark hover:bg-black border-none text-zap-green flex items-center justify-center hidden sm:flex h-11 w-11 min-h-[44px]" title="Sign Up">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </Link>
            </>
          )}

          <Link to="/rider" className="btn bg-zap-green hover:bg-[#b0d952] border-none text-zap-dark rounded-[14px] px-6 font-semibold h-11 min-h-[44px]">
            Be a Rider
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
