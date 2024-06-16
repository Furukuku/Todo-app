import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const email = useRef('');
  const password = useRef('');
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  const handleChange = e => {
    if (e.target.name === 'email') {
      email.current = e.target.value;
    }

    if (e.target.name === 'password') {
      password.current = e.target.value;
    }
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const response = await fetch('http://localhost:3001/api/user/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ email: email.current, password: password.current})
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        navigate('/');
      } else {
        setErrors(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const checkIfGuest = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('http://localhost:3001/api/user/guest', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          navigate('/');
        }
      } catch (err) {
        console.log(err);
      }
    }

    checkIfGuest();
  }, []);

  return (
    <form 
      className="border w-[29rem] mx-auto my-40 p-5 rounded-md bg-white shadow-md"
      onSubmit={handleSubmit}
    >
      <p className="text-2xl font-semibold">Login</p>
      <p className="mb-4 text-zinc-500">Welcome back!</p>
      {errors?.message && (<p 
          className="text-white text-center py-3 px-4 bg-red-300 rounded-md border-2 border-red-400 mb-3"
        >
          {errors.message}
          <span 
            className="float-end cursor-pointer"
            onClick={() => setErrors(null)}
          >&times;</span>
      </p>)}
      <div className="flex flex-col mb-2">
        <label htmlFor="email" className="font-semibold">Email</label>
        <input 
          id="email"
          type="text" 
          placeholder="sample@email.com" 
          className="border rounded px-3 py-2"
          name="email"
          onChange={handleChange}
        />
        {errors?.email && <p className="text-red-600 text-xs px-1">{errors.email}</p>}
      </div>
      <div className="flex flex-col mb-3">
        <label htmlFor="password" className="font-semibold">Password</label>
        <input 
          id="password"
          type="password"  
          className="border rounded px-3 py-2"
          name="password"
          onChange={handleChange}
        />
        {errors?.password && <p className="text-red-600 text-xs px-1">{errors.password}</p>}
      </div>
      <div className="flex justify-between items-center ">
        <p className="text-xs">Don't have an account? <Link to="/sign-up" className="underline">Sign Up</Link></p>
        <button 
          type="submit"
          className="bg-zinc-800 text-white px-4 py-2 rounded-md"
        >
          Login
        </button>
      </div>
    </form>
  )
}

export default Login
