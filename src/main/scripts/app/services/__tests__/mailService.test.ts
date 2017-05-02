import { MailService } from '../mailService';

describe('Service: MailService', () => {

    let service: MailService;

    beforeAll(() => {
        service = new MailService();
        return new Promise((resolve) => {
            service.setup().then(() => {
                resolve();
            });
        });
    });

    test('should load oauth2 configuration from file', () => {
        expect(service.getConfigFile()).toBeDefined();
        expect(service.getConfigFile().clientId).toBe('xxxxxxxxxx.apps.googleusercontent.com');
        expect(service.getConfigFile().clientSecret).toBe('yyyyyyyyyy');
        expect(service.getConfigFile().refreshToken).toBe('zzzzzzzzzz');
        expect(service.getConfigFile().user).toBe('bmrobin@mail.com');
    });

});
