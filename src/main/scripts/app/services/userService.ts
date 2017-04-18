import { User } from '../models/user';

export class UserService {

    private userList: User[] = [];

    constructor() {
        this.createSomeUsers();
    }
    public createSomeUsers() {
        let user1: User = new User('bmrobin9823@gmail.com');
        let user2: User = new User('bmrobin@g.clemson.edu');
        this.userList.push(user1);
        this.userList.push(user2);
    }

    public addUser(user: User) {
        this.userList.push(user);
    }

    public getUserList(): User[] {
        return this.userList;
    }
}
