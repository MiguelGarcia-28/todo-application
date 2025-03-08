import React from 'react';

const Task = ({ task, updateTaskStatus }) => {
    const toggleStatus = () => {
        updateTaskStatus(!task.completed);
    };

    return (
        <div style={{ marginBottom: '10px' }}>
            <span
                style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                }}
            >
                {task.name}
            </span>
            <button onClick={toggleStatus}>
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
        </div>
    );
};

export default Task;