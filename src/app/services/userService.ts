import * as Loki from 'lokijs';
import { User } from '../models/user';

export class UserService {

    private static loki: Loki = new Loki('user-database');
    private static users: LokiCollection<{}> = UserService.loki.addCollection('users');

    /**
     * Add a user to the mail subscriber list
     * @param emailAddr email address of the user to add
     */
    public addUser(emailAddr: string) {
        console.log('adding user ' + emailAddr);
        UserService.users.insert(new User(emailAddr));
    }

    /**
     * Retrieve all users from the mail subscriber list
     */
    public getUsers(): User[] {
        return <User[]> UserService.users.find();
    }
}
