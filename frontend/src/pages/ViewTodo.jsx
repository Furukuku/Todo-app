import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewTodo = () => {
  const [todo, setTodo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getTodo() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`http://localhost:3001/api/todo/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setTodo(data.todo);
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    }

    getTodo();
  }, []);

  return (
    <div className="px-10">
      {todo ? (
        <>
          <p className="text-4xl font-semibold mb-4">{todo.title}</p>
          <p className="text-lg indent-10 ps-10">{todo.description}</p>
        </>
      ) : <h1 className="text-center text-4xl my-20 font-semibold">Not found</h1>}
    </div>
  )
}

export default ViewTodo
