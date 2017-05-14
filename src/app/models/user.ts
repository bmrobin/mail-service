export class User {

    private emailAddress: string;

    constructor(emailAddr: string) {
        this.emailAddress = emailAddr;
    }

    /**
     * Get the email address of the user
     */
    public getEmailAddr(): string {
        return this.emailAddress;
    }
}
