import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { LoginRequestDto, RegisterRequestDto } from "../../models/request/auth";
import { ServerUrls } from "../../shared/constants";
import { Observable } from "rxjs";
import { LoginResponseDto } from "../../models/response/auth";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private httpClient = inject(HttpClient);

    get isAuthenticated(): boolean {
        return this.token !== null;
    }

    get token() {
        return localStorage.getItem('token');
    }

    public logout() {
        localStorage.removeItem('token');
    }

    public setToken(token: string) {
        if (token) {
            localStorage.setItem('token', token);
        }
    }

    public register(registerRequest: RegisterRequestDto): Observable<any> {
        return this.httpClient.post(ServerUrls.REGISTER, registerRequest);
    }

    public login(loginRequest: LoginRequestDto): Observable<LoginResponseDto> {
        return this.httpClient.post<LoginResponseDto>(ServerUrls.LOGIN, loginRequest);
    }
}