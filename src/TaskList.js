import React, { useState } from 'react';
import Task from './Task';

const TaskList = ({ list, deleteTaskList, updateTaskList, updateTaskStatus, addTaskToList}) => {
    const [newTaskName, setNewTaskName] = useState('');

    //const handleAddTask = () => {
    //    const newTaskObj = { id: Date.now(), name: newTask, completed: false };
    //    const updatedTaskList = { ...list, tasks: [...list.tasks, newTaskObj] };
    //    updateTaskList(list.id, updatedTaskList.name);
    //    setNewTask('');
    //};

    const handleAddTask = () => {
        if (newTaskName.trim() === '') {
            alert('Task name cannot be empty!');
            return;
        }

        const newTask = {
            id: Date.now(),
            name: newTaskName,
            completed: false,
        };

        addTaskToList(list.id, newTask);
        setNewTaskName('');
    };

    return (
        <div>
            <div>
                <h3>{list.name}</h3>
                <button onClick={() => deleteTaskList(list.id)}>Delete List</button>
                <div>
                    <input
                        type="text"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        placeholder="Add a Task"
                    />
                    <button onClick={handleAddTask}>Add Task</button>
                </div>
            </div>
            <div>
                {list.tasks.length === 0 ? (
                    <p>No tasks yet</p>
                ) : (
                    list.tasks.map((task) => (
                        <Task
                            key={task.id}
                            task={task}
                            updateTaskStatus={(status) => updateTaskStatus(list.id, task.id, status)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
            //</div>
                //</div>
                //<input
                    //type="text"
                    //value={newTaskName}
                    //onChange={(e) => setNewTaskName(e.target.value)}
                    //placeholder="Add a Task"
                ///>
                //<button onClick={handleAddTask}>Add Task</button>
            //</div>
            //<div>
                //{list.tasks.map((task) => (
                    //<Task
                        //key={task.id}
                        //task={task}
                        //updateTaskStatus={(status) => updateTaskStatus(list.id, task.id, status)}
                    ///>
                //))}
            //</div>
        //</div>
    //);
//};

export default TaskList;