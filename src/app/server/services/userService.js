import { User } from '../models/user';
const loki = require('lokijs');

let db, users;
export class UserService {

    constructor() {
        db = new loki('users-database');
        users = db.addCollection('users');
    }

    /**
     * Add a user to the mail subscriber list
     * @param emailAddr email address of the user to add
     */
    addUser(emailAddr) {
        console.log('adding user ' + emailAddr);
        users.insert(new User(emailAddr));
    }

    /**
     * Retrieve all users from the mail subscriber list
     */
    getUsers() {
        return users.find();
    }
}
