import axios from "axios";
import {authHeader} from "./base.service";

const API_URL = 'http://localhost:8080/api/file';

class FileService {
    uploadFile(formData, taskId) {
        return axios.post(API_URL + '/add/' + taskId, formData, {
            headers: {
                ...authHeader(),
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    downloadFile(fileName) {
        return axios.get(API_URL + '/' + fileName, {headers: authHeader()})
    }

    getFilesListAssignedToTask(taskId) {
        return axios.get(API_URL + '/assignedToTask/' + taskId, {headers: authHeader()})
    }

    deleteAssignedFileToTask(fileId) {
        return axios.delete(API_URL + '/deleteAssignedFile/' + fileId, {headers: authHeader()})
    }
}

export default new FileService();