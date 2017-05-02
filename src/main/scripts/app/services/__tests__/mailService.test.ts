import { MailService } from '../mailService';
import { UserService } from '../userService';

describe('Service: MailService', () => {

    let mailService: MailService = new MailService();
    let userService: UserService = new UserService();

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

});
