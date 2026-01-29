export class LoginRequestDto {
    public email: string;
    public password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

export class RegisterRequestDto extends LoginRequestDto {
    public passwordConfirmation: string;
    public firstName: string;
    public lastName: string;

    constructor(email: string, password: string, passwordConfirmation: string, firstName: string, lastName: string) {
        super(email, password);
        this.passwordConfirmation = passwordConfirmation;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
