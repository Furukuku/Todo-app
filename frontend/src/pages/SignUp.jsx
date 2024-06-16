import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const user = useRef({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    user.current = {
      ...user.current,
      [e.target.name]: e.target.value
    }
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const response = await fetch('http://localhost:3001/api/user/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(user.current)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        navigate('/');
      } else {
        setErrors(data);
      }
    } catch (err) {
      console.log(err)
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
      className="border w-[29rem] mx-auto my-20 p-5 rounded-md bg-white shadow-md"
      onSubmit={handleSubmit}
    >
      <p className="text-2xl font-semibold">Sign Up</p>
      <p className="mb-4 text-zinc-500">Create your future here!</p>
      <div className="flex flex-col mb-2">
        <label htmlFor="fname" className="font-semibold">First Name</label>
        <input 
          id="fname"
          type="text" 
          placeholder="John" 
          className="border rounded px-3 py-2"
          name='firstName'
          onChange={handleChange}
        />
        {errors?.firstName && <p className="text-xs text-red-500 px-1">{errors.firstName}.</p>}
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="lname" className="font-semibold">Last Name</label>
        <input 
          id="lname"
          type="text" 
          placeholder="Doe" 
          className="border rounded px-3 py-2"
          name='lastName'
          onChange={handleChange}
        />
        {errors?.lastName && <p className="text-xs text-red-500 px-1">{errors.lastName}.</p>}
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="email" className="font-semibold">Email</label>
        <input 
          id="email"
          type="text" 
          placeholder="john@email.com" 
          className="border rounded px-3 py-2"
          name='email'
          onChange={handleChange}
        />
        {errors?.email && <p className="text-xs text-red-500 px-1">{errors.email}.</p>}
      </div>
      <div className="flex flex-col mb-3">
        <label htmlFor="password" className="font-semibold">Password</label>
        <input 
          id="password"
          type="password"  
          className="border rounded px-3 py-2"
          name='password'
          onChange={handleChange}
        />
        {errors?.password && <p className="text-xs text-red-500 px-1">{errors.password}.</p>}
      </div>
      <div className="flex flex-col mb-3">
        <label htmlFor="passwordConfirm" className="font-semibold">Confirm password</label>
        <input 
          id="passwordConfirm"
          type="password"  
          className="border rounded px-3 py-2"
          name='confirmPassword'
          onChange={handleChange}
        />
        {errors?.confirmPassword && <p className="text-xs text-red-500 px-1">{errors.confirmPassword}.</p>}
      </div>
      <div className="flex justify-between items-center ">
        <p className="text-xs">Already have an account? <Link to="/login" className="underline">Login</Link></p>
        <button 
          type="submit"
          className="bg-zinc-800 text-white px-4 py-2 rounded-md"
        >
          Sign Up
        </button>
      </div>
    </form>
  )
}

export default SignUp
