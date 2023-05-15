import React, { useState } from 'react';

const EditModal = ({ task, statusList, onClose, onSubmit }) => {
    const [name, setName] = useState(task.name);
    const [description, setDescription] = useState(task.description);
    const [statusName, setStatusName] = useState(task.statusName);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ id: task.id, name, description, statusName });
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={statusName}
                            onChange={(e) => setStatusName(e.target.value)}
                        >
                            {statusList.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
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
