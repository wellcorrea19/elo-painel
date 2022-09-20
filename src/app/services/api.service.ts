import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    headers;

    constructor(private http: HttpClient) {
        this.headers = {
            'Content-Type': 'application/json',
            'Content-Length': 'Content-Length',
            Authorization: 'Bearer'
        };
    }

    setTokenToHeader(user) {
        this.reloadHeaderAuthorization();
        this.headers.Authorization += ' ' + user.token;
        localStorage.setItem('token', this.headers.Authorization);
    }

    checkUserWithToken() {
        this.headers.Authorization = localStorage.getItem('token');
    }

    reloadHeaderAuthorization() {
        localStorage.setItem('token', '');
        this.headers.Authorization = 'Bearer';
    }

    login(user) {
        return this.http.post(environment.loginUrl, {
            email: user.username,
            cpf: user.username,
            senha: user.password,
            versao: '1.1',
        }, {
            headers: this.headers
        });
    }

    public logout() {

        return this.http.get<any>(environment.defaultUrl + 'users/logout', {headers: this.headers});
    }

    getUser(): Observable<any> {
        this.checkUserWithToken();
        return this.http.get<any>(environment.defaultUrl + 'user', {headers: this.headers});
    }

    getUserById(id): Observable<any> {
        this.checkUserWithToken();
        return this.http.get<any>(environment.defaultUrl + `user/${id}`, {headers: this.headers});
    }

    getAllUsers(): Observable<[any]> {
        this.checkUserWithToken();
        return this.http.get<[any]>(environment.defaultUrl + 'users', {headers: this.headers});
    }
    getAllUsersByCnpj(cnpjtransportadora){
        this.checkUserWithToken();
        return this.http.post(environment.defaultUrl + `users/cnpjtransportadora`, {
            cnpjtransportadora
        }, {
            headers: this.headers
        });
    }

    getViagens(user): Observable<[]> {
        this.headers.token = user.token;
        return this.http.get<[]>(environment.defaultUrl + `viagem`,
            {headers: this.headers});
    }

    getViagensTransportadora(cnpjTransportadora): Observable<[]> {
        return this.http.get<[]>(environment.defaultUrl + `painel/viagem/tabela/${cnpjTransportadora}`,
            {headers: this.headers});
    }

    getViagensGps(ids) {
        return this.http.post(environment.defaultUrl + `painel/viagem/localizacao`, {
            ids
        }, {
            headers: this.headers
        });
    }

    registerFrota(user) {
        this.checkUserWithToken();
        return this.http.post(environment.registerUrl, {
            cpf: user.cpf,
            tracao: user.tracao,
            email: user.email,
            telefone: user.telefone,
            senha: user.senha,
            cnpjtransportadora: user.cnpjtransportadora,
            passwordCheck: user.passwordCheck,
            name: user.name,
            frota: '2'
        }, {
            headers: this.headers
        });
    }

    registerGestor(user) {
        this.checkUserWithToken();
        return this.http.post(environment.registerUrl, {
            cpf: user.cpf,
            cnpjtransportadora: user.cnpjtransportadora,
            email: user.email,
            telefone: user.telefone,
            tracao: user.tracao,
            senha: user.senha,
            passwordCheck: user.passwordCheck,
            frota: '2',
            name: user.name,
        }, {
            headers: this.headers
        });
    }

    updateById(user) {
        this.checkUserWithToken();
        console.log(user);
        return this.http.post(environment.defaultUrl + `users/updatebyid`, {
            id: user.id,
            name: user.name,
            email: user.email,
            telefone: user.telefone,
        }, {
            headers: this.headers
        });
    }

    updateSenhaByCpf(user) {
        this.checkUserWithToken();
        console.log(user);
        return this.http.post(environment.defaultUrl + `users/updatePasswordbyCpf`, {
            cpf: user.cpf,
            senha: user.senha,
        }, {
            headers: this.headers
        });
    }


    calculateTime(olat, olgn, dlat, dlgn){
        const originLatLgn = olat + ',' + olgn;
        const destinationLatLgn = dlat + ',' + dlgn;

        return this.http.post(environment.defaultUrl + `viagem/tempo`, {
            origem: originLatLgn,
            destino: destinationLatLgn
        }, {
            headers: this.headers
        });
    }
}
