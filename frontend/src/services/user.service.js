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

    getAssignedUsers(projectId, userId) {
        return axios.get('http://localhost:8080/api/usersList/' + projectId + '/assigned-users/' + userId, {headers: authHeader()})
    }

    getUnAssignedUsersToTask(projectId, taskId) {
        return axios.get('http://localhost:8080/api/usersList/' + projectId + '/' + taskId + '/unassigned-users-to-task', {headers: authHeader()})
    }

    addUserToProject(projectId, userId) {
        return axios.post('http://localhost:8080/api/usersList/add/' + projectId + '/' + userId, {}, {headers: authHeader()})
    }

    getUsersListAssignedToTask(taskId) {
        return axios.get('http://localhost:8080/api/usersList/assignedToTask/' + taskId, {headers: authHeader()})
    }
}

export default new UserService();