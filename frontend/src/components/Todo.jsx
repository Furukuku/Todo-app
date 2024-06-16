import React from 'react';
import { Link } from 'react-router-dom';

const Todo = ({ todo, handleSetTodoToDelete }) => {
  return (
    <>
      <li className="border px-4 py-3 mb-4 rounded-md bg-white shadow">
        <div className="flex justify-between mb-2">
          <p className="text-lg font-medium">{todo.title}</p>
          <div className="flex gap-2 items-center">
            <Link to={`/view/${todo._id}`} className="text-sm underline">View</Link>
            <Link to={`/edit/${todo._id}`} className="text-sm underline">Edit</Link>
            <button 
              className="text-sm underline"
              onClick={() => handleSetTodoToDelete(todo)}
            >
              Delete
            </button>
          </div>
        </div>
        <p className="text-sm ps-5">{todo.description.length > 400 ? todo.description.substring(0, 400) + '...' : todo.description}</p>
      </li>
    </>
  )
}

export default Todo
