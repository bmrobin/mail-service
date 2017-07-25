import { UserService } from '../userService';

describe('Service: UserService', () => {

    let service = new UserService();

    test('should initialize with empty user database', () => {
        expect(service.getUsers()).toEqual([]);
    });

    test('should add users to the database', () => {
        service.addUser('bmrobin@mail.com');
        service.addUser('test@mail.com');
        expect(service.getUsers().length).toBe(2);
        let user1 = service.getUsers()[0];
        let user2 = service.getUsers()[1];
        expect(user1.getEmailAddr()).toBe('bmrobin@mail.com');
        expect(user2.getEmailAddr()).toBe('test@mail.com');
    });

});
