import axios, { Method, AxiosInstance } from 'axios';
import { User } from './common/types';

class Kwork {
  public login: string;
  public password: string;
  public phone: string;

  private _token?: string | null;
  private _session: AxiosInstance;

  public constructor(login: string, password: string, phone: string) {
    this.login = login;
    this.password = password;
    this.phone = phone;

    this._token = null;
    this._session = axios.create({
      baseURL: 'https://api.kwork.ru/',
      headers: { Authorization: 'Basic bW9iaWxlX2FwaTpxRnZmUmw3dw==' }
    });
  }

  public get token(): Promise<string | null | undefined> {
    return (async () => {
      if (this._token == null || this._token == undefined) {
        this._token = await this.getToken();
      }

      return this._token;
    })();
  }

  public async apiRequest(requestMethod: Method, apiMethod: string, params?: unknown): Promise<any | null> {
    const resp = await this._session.request({ method: requestMethod, url: apiMethod, params: params });

    if (resp.status == 200) {
      //console.log(resp.data);
      return resp.data;
    }

    return null;
  }

  public async getToken(): Promise<string | null | undefined> {
    let resp = await this.apiRequest('post', 'signIn', { login: this.login, password: this.password });

    if (resp?.error_code == '192') {
      resp = await this.apiRequest('post', 'signIn', { login: this.login, password: this.password, phone_last: this.phone });
      if (resp?.success) {
        return resp.response.token;
      }
    } else if (resp?.success) {
      return resp.response.token;
    }

    return null;
  }

  public async getMe(): Promise<User>
}

module.exports = Kwork;
