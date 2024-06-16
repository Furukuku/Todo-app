import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const [errors, setErrors] = useState(null);
  const title = useRef('');
  const description = useRef('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todo = {
      title: title.current,
      description: description.current
    };

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:3001/api/todo/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(todo)
      });
      
      
      if (response.ok) {
        title.current = '';
        description.current = '';
        navigate('/');
      } else {
        const data = await response.json();
        setErrors(data.errors);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'title') {
      title.current = e.target.value;
    }

    if (e.target.name === 'description') {
      description.current = e.target.value;
    }
  };

  useEffect(() => {
    const checkIfAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('http://localhost:3001/api/user/auth', {
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
        navigate('/');
      }
    };

    checkIfAuth();
  }, [])

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-[500px] border mx-auto p-5 rounded-lg bg-white shadow-lg"  
    >
      <p className="text-2xl font-semibold mb-4">Add a todo</p>
      <div className="flex flex-col mb-3">
        <label htmlFor="title">Title</label>
        <input 
          type="text" 
          id="title" 
          className={`border px-3 py-2 rounded-md shadow-sm ${errors?.title && 'border-red-200 outline-red-200'}`}
          name="title"
          onChange={handleChange}
        />
        {errors?.title && <p className="text-xs text-red-600 px-1 mt-1">{errors.title}</p>}
      </div>
      <div className="flex flex-col mb-5">
        <label htmlFor="description">Description</label>
        <textarea 
          id="description"
          className={`border px-3 py-2 rounded-md shadow-sm h-40 resize-none ${errors?.description && 'border-red-200 outline-red-200'}`} 
          name="description"
          onChange={handleChange}
        ></textarea>
        {errors?.description && <p className="text-xs text-red-600 px-1 mt-1">{errors.description}</p>}
      </div>
      <div className="flex justify-end">
        <button 
          type="submit"
          className="bg-black text-white px-7 py-2 rounded-md"
        >Add</button>
      </div>
    </form>
  )
}

export default AddTodo
