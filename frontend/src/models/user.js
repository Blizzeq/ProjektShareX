export default class User {
    constructor(username, password, firstName, lastName, email, role, token, id) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.token = token;
        this.id = id;
    }

}