import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { LoginRequestDto, RegisterRequestDto } from "../../models/request/auth";
import { PathNames, ServerUrls } from "../../shared/constants";
import { Observable } from "rxjs";
import { LoggedInUserDetailsResponseDto, LoginResponseDto } from "../../models/response/auth";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private httpClient = inject(HttpClient);
    private router = inject(Router);

    private userDetails!: LoggedInUserDetailsResponseDto;

    get isAuthenticated(): boolean {
        return this.token !== null;
    }

    get token() {
        return localStorage.getItem('token');
    }

    public logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate([PathNames.LOGIN]);
    }

    public setToken(token: string) {
        if (token) {
            localStorage.setItem('token', token);
        }
    }

    get currentUser() {
        return JSON.parse(localStorage.getItem('user') as string) as LoggedInUserDetailsResponseDto;
    }

    set currentUser(user: LoggedInUserDetailsResponseDto) {
        localStorage.setItem('user', JSON.stringify(user));
        this.userDetails = user;
    }

    public register(registerRequest: RegisterRequestDto): Observable<any> {
        return this.httpClient.post(ServerUrls.REGISTER, registerRequest);
    }

    public login(loginRequest: LoginRequestDto): Observable<LoginResponseDto> {
        return this.httpClient.post<LoginResponseDto>(ServerUrls.LOGIN, loginRequest);
    }

    public getLoggedInUserDetails(): Observable<LoggedInUserDetailsResponseDto> {
        return this.httpClient.get<LoggedInUserDetailsResponseDto>(ServerUrls.USER_DETAILS);
    }
}