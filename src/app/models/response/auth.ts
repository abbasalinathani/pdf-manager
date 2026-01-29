export class LoginResponseDto {
    accessToken!: string
    refreshToken!: string
}

export class LoggedInUserDetailsResponseDto {
    id!: string;
    email!: string;
    firstName!: string;
    lastName!: string;
    image!: Blob;
    quota!: number;
    usedSpace!: number;
    plan!: string;
    birthDate!: Date;
    role!: string;
    emailVerified!: boolean;
    createdAt!: Date;
    updatedAt!: Date;
    session!: string;
    iat!: number;
    exp!: number;
}