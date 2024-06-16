import React from 'react';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="px-40 py-5">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
