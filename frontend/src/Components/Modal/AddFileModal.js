import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function AddFileModal({ files, setFiles, closeModal, taskId }) {
    const [isFileSaved, setIsFileSaved] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFiles({
            ...files,
            name: selectedFile.name,
            type: selectedFile.type,
            data: selectedFile,
            taskId: taskId,
        });
    };

    const handleSave = () => {
        if (files.data) {
            setIsFileSaved(true);
            console.log('Plik zapisany:', files);
        }
    };

    const handleFileDownload = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(files.data);
        downloadLink.download = files.name;
        downloadLink.click();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded">
                <h2 className="text-xl font-bold mb-4">Task Files</h2>
                <div className="flex flex-col delete-confirmation-content gap-2">
                    {files && files.data ? (
                        <div>
                            <a href={URL.createObjectURL(files.data)} download={files.name}>
                                <p>{files.name}</p>
                            </a>
                        </div>
                    ) : (
                        <div>
                            <p>{files.name}</p>
                        </div>
                    )}
                    <div className="delete-confirmation-buttons">
                        <Form.Group controlId="formFileMultiple" className="mb-3" onChange={handleFileChange}>
                            <h3 className={'mb-3 font-bold'}>Add new files</h3>
                            <Form.Control type="file" />
                        </Form.Group>
                    </div>
                    <div className={'flex gap-3'}>
                        <button type="submit" className={'bg-blue text-white px-4 py-2 rounded'} onClick={handleSave}>
                            Save
                        </button>
                        <button onClick={closeModal} className="bg-red-600 px-2 py-2 rounded text-white w-1/4">
                            Cancel
                        </button>
                    </div>
                    {isFileSaved && <div><p>File has been saved</p></div>}
                </div>
            </div>
        </div>
    );
}

export default AddFileModal;
