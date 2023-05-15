import React from "react";

const UserModal = ({ onClose, onSubmit, usersList, username, setUsername }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className={'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'}>
            <div className={'bg-white p-8 rounded'}>
                <h2 className={'text-xl font-bold mb-4'}>Add users to project</h2>
                <form onSubmit={handleSubmit}>
                    <div className={'mt-4 flex justify-between'}>
                        <label htmlFor="project-status">Users list</label>
                        <select value={username} onChange={(e) => setUsername(e.target.value)}>
                            {usersList.map((user) => (
                                <option key={user} value={user}>
                                    {user}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={'flex justify-end mt-8'}>
                        <button type="button" className={'text-darkblue bg-gray-200 rounded px-4 py-2'} onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className={'bg-blue text-white ml-4 px-4 py-2 rounded'}>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;