import { User } from '../models/user';

export class UserService {

    private userList: User[] = [];

    constructor() {
        // add me as default user
        this.addUser('bmrobin9823@gmail.com');
    }

    public addUser(emailAddr: string) {
        console.log('adding user ' + emailAddr);
        this.userList.push(new User(emailAddr));
    }

    public getUserList(): User[] {
        return this.userList;
    }
}
