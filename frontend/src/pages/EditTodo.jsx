import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditTodo = () => {
  const [errors, setErrors] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getTodo = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`http://localhost:3001/api/todo/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setTitle(data.todo.title);
          setDescription(data.todo.description);
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    };

    getTodo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todo = {
      id: id,
      title: title,
      description: description
    };

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:3001/api/todo/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(todo)
      });
      
      
      if (response.ok) {
        setTitle('');
        setDescription('');
        navigate('/');
      } else {
        const data = await response.json();
        setErrors(data.errors);
      }
    } catch (err) {
      console.log('hello')
      console.log(err);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    }

    if (e.target.name === 'description') {
      setDescription(e.target.value);
    }
  };

  if (title.length < 1 || description.length < 1) {
    return <h1 className="text-center text-4xl my-20 font-semibold">Not found</h1>
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-[500px] border mx-auto p-5 rounded-lg bg-white shadow-lg"  
    >
      <p className="text-2xl font-semibold mb-4">Edit todo</p>
      <div className="flex flex-col mb-3">
        <label htmlFor="title">Title</label>
        <input 
          type="text" 
          id="title" 
          className={`border px-3 py-2 rounded-md shadow-sm ${errors?.title && 'border-red-200 outline-red-200'}`}
          name="title"
          value={title}
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
          value={description}
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

export default EditTodo
