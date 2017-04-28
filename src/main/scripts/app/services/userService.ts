import { User } from '../models/user';

export class UserService {

    private userList: User[] = [];

    constructor() {
        // add me as default user
        this.addUser('bmrobin9823@gmail.com');
    }

    /**
     * Add a user to the mail subscriber list
     * @param emailAddr email address of the user to add
     */
    public addUser(emailAddr: string) {
        console.log('adding user ' + emailAddr);
        this.userList.push(new User(emailAddr));
    }

    /**
     * Retrieve all users from the mail subscriber list
     */
    public getUserList(): User[] {
        return this.userList;
    }
}
