import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import DeleteConfirmation from './DeleteConfirmation';
import { useNavigate } from 'react-router-dom';

const TodoLists = () => {
  const [todos, setTodos] = useState([]);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(()=> {
    async function getAllTodos() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('http://localhost:3001/api/todo/all', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();

        if (response.ok) {
          setTodos(data.todos);
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    }

    getAllTodos();
  }, []);

  const handleClickDelete = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:3001/api/todo/delete', {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: todoToDelete._id})
      });

      if (response.ok) {
        setOpen(false);
        setTodos(todos.filter(todo => todo._id !== todoToDelete._id));
        
      } else {
        const data = await response.json();
        console.log(data)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSetTodoToDelete = (todo) => {
    setTodoToDelete(todo);
    setOpen(true);
  };

  return (
    <>
      <ul className="ps-5">
        {todos.map(todo => <Todo key={todo._id} todo={todo} open={open} handleSetTodoToDelete={handleSetTodoToDelete} />)}
      </ul>
      <DeleteConfirmation open={open} setOpen={setOpen} handleClickDelete={handleClickDelete} todoToDelete={todoToDelete} />
    </>
  )
}

export default TodoLists
