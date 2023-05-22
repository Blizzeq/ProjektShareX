import axios from "axios";
import {authHeader} from "./base.service";

const API_URL = 'http://localhost:8080/api/project';

class ProjectService {

    createProject(project) {
        return axios.post(API_URL + '/create', project, {headers: authHeader()});
    }

    getAllProjects(userId) {
        return axios.get(API_URL + '/all/' + userId, {headers: authHeader()});
    }

    getProjectById(id) {
        return axios.get(API_URL + '/' + id, {headers: authHeader()})
    }

    deleteProject(id) {
        return axios.delete(API_URL + '/' + id, {headers: authHeader()})
    }

}

export default new ProjectService();