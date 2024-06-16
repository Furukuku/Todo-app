import React from 'react';
import TodoLists from '../components/TodoLists';
import { Link, Outlet } from 'react-router-dom';

const Home = () => {

  return (
    <>
      <div className="mb-2 flex justify-between">
        <p className="text-2xl font-semibold">Todo List</p>
        <Link to="/add" className="border px-5 py-1.5 rounded-md bg-black text-white">Add</Link>
      </div>
      <TodoLists />
      <Outlet />
    </>
  )
}

export default Home
