import React, { useState } from 'react';
import TaskList from './TaskList';
import Login from './Login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [taskLists, setTaskLists] = useState(() => {
    const savedData = localStorage.getItem("taskLists");
    return savedData ? JSON.parse(savedData) : [];
  });

  const handleLogin = (username, password) => {
    if (username === "user" && password === "password") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const addTaskList = (taskListName) => {
    const newTaskList = {
      id: Date.now(),
      name: taskListName,
      tasks: []
    };
    const updatedTaskLists = [...taskLists, newTaskList];
    setTaskLists(updatedTaskLists);
    localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
  };

  const deleteTaskList = (id) => {
    const updatedTaskLists = taskLists.filter(list => list.id !== id);
    setTaskLists(updatedTaskLists);
    localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
  };

  const updateTaskList = (id, newName) => {
    const updatedTaskLists = taskLists.map(list =>
      list.id === id ? { ...list, name: newName } : list
    );
    setTaskLists(updatedTaskLists);
    localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
  };

  const addTaskToList = (listId, newTask) => {
    const updatedTaskLists = taskLists.map((list) => {
      if (list.id === listId) {
        return { ...list, tasks: [...list.tasks, newTask] };
      }
      return list;
    });
    setTaskLists(updatedTaskLists);
    localStorage.setItem('taskLists', JSON.stringify(updatedTaskLists));
  };

  const updateTaskStatus = (taskListId, taskId, status) => {
    const updatedTaskLists = taskLists.map(list => {
      if (list.id === taskListId) {
        const updatedTasks = list.tasks.map(task =>
          task.id === taskId ? { ...task, completed: status } : task
        );
        return { ...list, tasks: updatedTasks };
      }
      return list;
    });
    setTaskLists(updatedTaskLists);
    localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
  };

  return (
    <div className="App">
      <h1>ToDo App</h1>
      {isAuthenticated ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <div>
            <input
              type="text"
              placeholder="New Task List"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTaskList(e.target.value);
                  e.target.value = '';
                }
              }}
              />
            </div>
            {taskLists.map((list) => (
              <TaskList
                key={list.id}
                list={list}
                deleteTaskList={deleteTaskList}
                updateTaskList={updateTaskList}
                updateTaskStatus={updateTaskStatus}
                addTaskToList={addTaskToList}
              />
            ))}
        </div>
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;