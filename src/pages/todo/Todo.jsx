import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Todo.module.css';
import { v4 as uuidv4 } from 'uuid';

const Todo = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [userTodos, setUserTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState({
    id: uuidv4(),
    title: '',
    isCompleted: false,
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      navigate('/login');
      return;
    }

    setCurrentUser(JSON.parse(loggedInUser));

    let todoData;
    try {
      todoData = JSON.parse(localStorage.getItem('todoData'));
    } catch (error) {
      todoData = {};
      localStorage.setItem('todoData', JSON.stringify({}));
    }

    if (!todoData) {
      todoData = {};
      localStorage.setItem('todoData', JSON.stringify({}));
    }

    const localUserTodos = todoData[JSON.parse(loggedInUser).email];
    if (localUserTodos) {
      setUserTodos(localUserTodos);
    }
  }, [navigate]);

  const updateTodo = () => {
    const updatedTodos = [...userTodos, currentTodo];
    setUserTodos(updatedTodos);

    let todoData = JSON.parse(localStorage.getItem('todoData')) || {};
    todoData[currentUser.email] = updatedTodos;
    localStorage.setItem('todoData', JSON.stringify(todoData));

    setCurrentTodo({
      id: uuidv4(),
      title: '',
      isCompleted: false,
    });
  };

  const deleteTodo = (id) => {
    const filteredTodos = userTodos.filter((todo) => todo.id !== id);
    setUserTodos(filteredTodos);

    let todoData = JSON.parse(localStorage.getItem('todoData')) || {};
    todoData[currentUser.email] = filteredTodos;
    localStorage.setItem('todoData', JSON.stringify(todoData));
  };

  if (!currentUser) return null; 
  return (
    <>
      <div className={styles.mainContainer}>
        <p className={styles.userName}>{currentUser.name}'s Todo</p>
        <div className={styles.formContainer}>
          <input
            type="text"
            className={styles.inputContainer}
            value={currentTodo.title}
            onChange={(e) =>
              setCurrentTodo({ ...currentTodo, title: e.target.value })
            }
          />
          <button className={styles.submitButton} onClick={updateTodo}>
            Add Todo
          </button>
        </div>
        <div className={styles.todoContainer}>
          {userTodos &&
            userTodos.map((todo) => (
              <div key={todo.id} className={styles.todo}>
                <input
                  type="checkbox"
                  className={styles.completedStatus}
                  checked={todo.isCompleted}
                  onChange={() => {
                    const updatedTodos = userTodos.map((t) =>
                      t.id === todo.id
                        ? { ...t, isCompleted: !t.isCompleted }
                        : t
                    );
                    setUserTodos(updatedTodos);
                    let todoData = JSON.parse(localStorage.getItem('todoData'));
                    todoData[currentUser.email] = updatedTodos;
                    localStorage.setItem('todoData', JSON.stringify(todoData));
                  }}
                />
                <p className={styles.todoLabel}>{todo.title}</p>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className={styles.deleteTodo}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      
      <button
        className={styles.logoutButton}
        onClick={() => {
          localStorage.removeItem('loggedInUser');
          navigate('/login');
        }}
      >
        Logout
      </button>
      </div>
    </>
    
  );
};

export default Todo;
