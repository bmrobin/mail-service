export class User {
    private emailAddress: string;
    constructor(emailAddr: string) {
        this.emailAddress = emailAddr;
    }
    public getEmailAddr(): string {
        return this.emailAddress;
    }
}
