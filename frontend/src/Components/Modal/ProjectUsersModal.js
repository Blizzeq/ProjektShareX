import React from "react";

const ProjectUsersModal = ({ onClose, onSubmit, usersList, userId, setUserId }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className={'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'}>
            <div className={'bg-white p-8 rounded w-2/12'}>
                <h2 className={'text-xl font-bold mb-4'}>Add user to project</h2>
                <form onSubmit={handleSubmit}>
                    <div className={'mt-4 flex justify-between'}>
                        <label htmlFor="project-status">Users list</label>
                        <select id={'project-name'} value={userId} onChange={e => setUserId(e.target.value)}>
                            {usersList.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={'flex justify-end mt-8'}>
                        <button type="button" className={'text-darkblue bg-gray-200 rounded px-4 py-2'} onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className={'bg-blue text-white ml-4 px-4 py-2 rounded'}>
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectUsersModal;