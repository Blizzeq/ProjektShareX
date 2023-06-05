import axios from "axios";
import {authHeader} from "./base.service";

const API_URL = 'http://localhost:8080/api/notifications';

class NotificationService {
    getAllNotificationsOfUser(userId) {
        return axios.get(API_URL + '/all/' + userId, {headers: authHeader()})
    }

    createNotification(notification) {
        return axios.post(API_URL + '/create', notification, {headers: authHeader()})
    }

    findNumberNotReadNotification(userId) {
        return axios.get(API_URL + '/count/' + userId, {headers: authHeader()})
    }

    changeIsReadToTrue(userId) {
        return axios.put(API_URL + '/changeIsRead/' + userId, {}, {headers: authHeader()})
    }
}

export default new NotificationService();