import { User } from '../user';

describe('Models: User', () => {
    let user: User;
    test('should create a user', () => {
        expect(user).not.toBeDefined();
        user = new User('bmrobin@email.com');
        expect(user).toBeDefined();
    });
    test('should get the email address of a user', () => {
        user = new User('bmrobin@mail.com');
        expect(user.getEmailAddr()).toBe('bmrobin@mail.com');
    });
});
