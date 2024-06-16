import React from 'react'
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewTodo from './pages/ViewTodo';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Layout from './Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="view/:id" element={<ViewTodo />} />
          <Route path="add" element={<AddTodo />} />
          <Route path="edit/:id" element={<EditTodo />} />
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
