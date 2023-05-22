import axios from "axios";
import {authHeader} from "./base.service";

const API_URL = 'http://localhost:8080/api/task';

class TaskService {

    editTask(projectId, taskId, task) {
        return axios.put(API_URL + '/update/' + projectId + '/' + taskId, task, {headers: authHeader()})
    }

    addTask(projectId, task) {
        return axios.post(API_URL + '/add/' + projectId, task, {headers: authHeader()})
    }

    deleteTask(id) {
        return axios.delete( API_URL + '/' + id, {headers: authHeader()})
    }
}

export default new TaskService();