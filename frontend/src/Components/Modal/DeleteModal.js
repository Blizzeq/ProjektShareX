import React from 'react';

function DeleteModal({ activeProject, handleDeleteConfirmation, closeDeleteConfirmation }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded">
                <h2 className="text-xl font-bold mb-4">Delete Project</h2>
                <div className="flex flex-col delete-confirmation-content gap-5">
                    <h3>Are you sure you want to delete this project?</h3>
                    <div className="delete-confirmation-buttons">
                        <button onClick={() => handleDeleteConfirmation(activeProject.id)} className="text-white bg-red-600 rounded px-4 py-2">
                            Delete Project
                        </button>
                        <button onClick={closeDeleteConfirmation} className="bg-gray-300 text-darkblue ml-4 px-4 py-2 rounded">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;

