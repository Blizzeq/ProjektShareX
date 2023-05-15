import React, { useState } from 'react';

const EditModal = ({ task, onClose, onSubmit }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ id: task.id, title, description, status });
    };

    return (
        <div className={'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'}>
            <div className={'bg-white p-8 rounded'}>
                <h2 className={'text-xl font-bold mb-4'}>Edit Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className={'flex justify-between'}>
                        <label htmlFor="task-title">Task Title</label>
                        <input
                            type="text"
                            id="project-name"
                            name="task-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className={'mt-4 flex justify-between'}>
                        <label htmlFor="task-description">Task Description</label>
                        <input
                            type="text"
                            id="project-name"
                            name="task-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className={'mt-4 flex justify-between'}>
                        <label htmlFor="task-status">Task Status</label>
                        <select
                            id="task-status"
                            name="task-status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div className={'flex justify-end mt-8'}>
                        <button type="button" className={'text-darkblue bg-gray-200 rounded px-4 py-2'} onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className={'bg-blue text-white ml-4 px-4 py-2 rounded'}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
