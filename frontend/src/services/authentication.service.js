import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/authentication';

class AuthenticationService {
    login(user) {
        return axios.post(BASE_URL + '/sign-in', user);
    }

    register(user) {
        return axios.post(BASE_URL + '/sign-up', user);
    }
}

export default new AuthenticationService();