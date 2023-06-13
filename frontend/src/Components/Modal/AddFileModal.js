import React, {useEffect, useState} from 'react';
import { Form } from 'react-bootstrap';
import {useSelector} from "react-redux";
import FileService from "../../services/file.service";
import deletefile from "../../Assets/Home/MinusCircleRed.svg";

function AddFileModal({ files, setFiles, closeModal, taskId }) {
    const currentUser = useSelector((state) => state.user);
    const [fileList, setFileList] = useState([]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFiles({
            ...files,
            name: selectedFile.name,
            type: selectedFile.type,
            fileData: selectedFile,
            uploadBy: currentUser.id,
        });
    };

    useEffect(() => {
        FileService.getFilesListAssignedToTask(taskId).then((response) => {
            console.log(response.data);
            setFileList(response.data);
        });
    }, []);

    const handleSave = async () => {
        if (files.fileData) {
            const formData = new FormData();
            formData.append('file', files.fileData);

            await FileService.uploadFile(formData, taskId)

            FileService.getFilesListAssignedToTask(taskId).then((response) => {
                console.log(response.data);
                setFileList(response.data);
            });

            console.log('Plik zapisany:', files);
        }
    };

    const handleFileDownload = async (fileName) => {
        try {
            const response = await FileService.downloadFile(fileName);
            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log('Błąd podczas pobierania pliku:', error);
        }
    };

    const handleDeleteFile = async (fileId) => {
        await FileService.deleteAssignedFileToTask(fileId);

        FileService.getFilesListAssignedToTask(taskId).then((response) => {
            console.log(response.data);
            setFileList(response.data);
        });
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded">
                <h2 className="text-xl font-bold mb-4">Task Files</h2>
                <div className="flex flex-col delete-confirmation-content gap-2">
                    {fileList.map((item) => (
                        <div key={item.id} className={'flex'}>
                            <p>
                                <button onClick={() => handleFileDownload(item.name)}>{item.name}</button>
                            </p>
                            <button onClick={() => handleDeleteFile(item.id)}>
                                <img src={deletefile} alt={'delete-file'} className={'w-5 ml-1'}/>
                            </button>
                        </div>
                    ))}
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
                </div>
            </div>
        </div>
    );
}

export default AddFileModal;
