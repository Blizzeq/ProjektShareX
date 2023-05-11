import axios from "axios";
import {authHeader} from "./base.service";

const API_URL = 'http://localhost:8080/api/project';

class ProjectService {

    createProject(project) {
        return axios.post(API_URL + '/create', project, {headers: authHeader()});
    }

    getAllProjects() {
        return axios.get(API_URL, {headers: authHeader()});
    }

}

export default new ProjectService();