import React from "react";

const EditStatusModal = ({ status, setNewStatus, onClose, onSubmit }) => {
    const handleSubmit2 = (e) => {
        e.preventDefault();
        onSubmit();
    };


    return (
        <div className={'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'}>
            <div className={'bg-white p-8 rounded'}>
                <h2 className={'text-xl font-bold mb-4'}>Edit Status</h2>
                <form onSubmit={handleSubmit2}>
                    <div className={'flex justify-between'}>
                        <label htmlFor="task-title">Status Title</label>
                        <input
                            type="text"
                            id="project-name"
                            name="task-title"
                            value={status}
                            onChange={(e) => setNewStatus(e.target.value)}
                        />
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

export default EditStatusModal;