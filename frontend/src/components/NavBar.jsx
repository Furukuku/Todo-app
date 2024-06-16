import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [logoutBtn, setLogoutBtn] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('accessToken');
    setLogoutBtn(false);
    navigate('/login');
  };

  return (
    <nav className="flex justify-between px-10 py-4 border-b shadow bg-white">
      <Link to="/" className="font-semibold">TODO APP</Link>
      <div className="relative">
        <button 
          className="flex items-center gap-3 z-20 relative"
          onClick={() => setLogoutBtn(!logoutBtn)}
        >
          <img 
          className="rounded-full size-6"
            src="https://placehold.co/30x30" 
            alt="profile image" 
          />
          John Doe
        </button>
        {logoutBtn && (
          <>
            <div 
              className="fixed inset-0"
              onClick={() => setLogoutBtn(false)}
            ></div>
            <button 
              className="absolute bg-white border shadow py-1 rounded top-8 inset-x-0"
              onClick={handleClick}
            >
              <p className="hover:bg-zinc-200 py-1 text-sm">Logout</p>
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
