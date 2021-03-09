const { v4: uuidv4 } = require('uuid');

class User {

    constructor(firstName, lastName, username, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
    }
}

module.exports = User;