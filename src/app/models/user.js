export class User {

    constructor(emailAddr) {
        this.emailAddress = emailAddr;
    }

    /**
     * Get the email address of the user
     */
    getEmailAddr() {
        return this.emailAddress;
    }
}
