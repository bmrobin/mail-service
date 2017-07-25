import { MailService } from '../mailService';
import { UserService } from '../userService';

describe('Service: MailService', () => {

    let mailService = new MailService();
    let userService = new UserService();

    beforeAll(() => {
        return new Promise((resolve) => {
            mailService.setup().then(() => {
                resolve();
            });
        });
    });

    test('should load oauth2 configuration from file', () => {
        expect(mailService.getConfigFile()).toBeDefined();
        expect(mailService.getConfigFile().clientId).toBe('xxxxxxxxxx.apps.googleusercontent.com');
        expect(mailService.getConfigFile().clientSecret).toBe('yyyyyyyyyy');
        expect(mailService.getConfigFile().refreshToken).toBe('zzzzzzzzzz');
        expect(mailService.getConfigFile().user).toBe('bmrobin@mail.com');
    });

    test('should try to mail users', () => {
        userService.addUser('ben@test.com');
        return mailService.mailUsers().catch((error) => {
            expect(error.code).toBe('EAUTH');
        });
    });

});
