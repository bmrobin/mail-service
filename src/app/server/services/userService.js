import { User } from '../models/user';
import chalk from 'chalk';
const loki = require('lokijs');
const log = console.log;

export class UserService {

    constructor() {
        this.db = new loki('users-database');
        this.users = this.db.addCollection('users');
    }

    /**
     * Add a user to the mail subscriber list
     * @param emailAddr email address of the user to add
     */
    addUser(emailAddr) {
        log(chalk.green('adding user ' + emailAddr));
        this.users.insert(new User(emailAddr));
    }

    /**
     * Retrieve all users from the mail subscriber list
     */
    getUsers() {
        return this.users.find();
    }

    deleteUser(emailAddress) {
        log(chalk.green('deleting user ' + emailAddress));
        this.users.chain().find({ "emailAddress": emailAddress }).remove();
    }
}
