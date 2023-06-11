import axios from "axios";
import {authHeader} from "./base.service";

const API_URL = 'http://localhost:8080/api/file';

class FileService {
    uploadFile(file, taskId) {
        const formData = new FormData();
        formData.append('file', file);

        return axios.post(API_URL + '/add/' + taskId, formData, {headers: authHeader()})
    }

    downloadFile(fileName) {
        return axios.get(API_URL + '/' + fileName, {headers: authHeader()})
    }

    getFilesListAssignedToTask(taskId) {
        return axios.get(API_URL + 'assignedToTask/' + taskId, {headers: authHeader()})
    }
}

export default new FileService();