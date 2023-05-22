import axios from "axios";
import {authHeader} from "./base.service";

const API_URL = 'http://localhost:8080/api/profile';

class UserService {

    changeUserInfo(id, user) {
        return axios.put(API_URL + '/user/' + id, user, {headers: authHeader()});
    }

    getAllUsers(id) {
        return axios.get('http://localhost:8080/api/usersList/' + id + '/unassigned-users', {headers: authHeader()})
    }

    getAssignedUsers(id) {
        return axios.get('http://localhost:8080/api/usersList/' + id + '/assigned-users', {headers: authHeader()})
    }

    addUserToProject(projectId, userId) {
        return axios.post('http://localhost:8080/api/usersList/add/' + projectId + '/' + userId, {headers: authHeader()})
    }
}

export default new UserService();