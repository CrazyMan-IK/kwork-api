import axios, { Method, AxiosInstance } from 'axios';
import { SimpleEventDispatcher, ISimpleEvent } from 'strongly-typed-events';
import { Int, Pagination, KworkUser, Category, ExchangeInfo, Project } from './common/types';

class Kwork {
  public login: string;
  public password: string;
  public phone: string;

  private _onNewProject: SimpleEventDispatcher<Project> = new SimpleEventDispatcher<Project>();

  private _token?: string | null;
  private _session: AxiosInstance;
  private _lastProjects?: Project[];

  public constructor(login: string, password: string, phone: string) {
    this.login = login;
    this.password = password;
    this.phone = phone;

    this._token = null;
    this._session = axios.create({
      baseURL: 'https://api.kwork.ru/',
      headers: { Authorization: 'Basic bW9iaWxlX2FwaTpxRnZmUmw3dw==' }
    });

    this.getProjects().then((x) => (this._lastProjects = x.response));

    setInterval(this.updateProjects.bind(this), 10000);
  }

  private async updateProjects(): Promise<void> {
    const currentProjects = (await this.getProjects()).response;

    const lastProjects = this._lastProjects?.map((x) => x.id);

    const newProjects = currentProjects?.filter((x) => !lastProjects?.includes(x.id));

    if (newProjects != undefined) {
      for (const project of newProjects) {
        this._onNewProject.dispatch(project);
      }
      //console.log(newProjects.length);
    }

    this._lastProjects = currentProjects;
  }

  public get onNewProject(): ISimpleEvent<Project> {
    return this._onNewProject.asEvent();
  }

  public get token(): Promise<string | null> {
    return (async () => {
      if (this._token == null || this._token == undefined) {
        this._token = await this.getToken();
      }

      return this._token;
    })();
  }

  public async apiRequest(requestMethod: Method, apiMethod: string, params?: unknown): Promise<any> {
    const resp = await this._session.request({ method: requestMethod, url: apiMethod, params: params });

    if (resp.status == 200) {
      //console.log(resp.data);
      return resp.data;
    }

    return null;
  }

  public async getToken(): Promise<string | null> {
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

  public async getMe(): Promise<KworkUser> {
    const resp = await this.apiRequest('post', 'actor', { token: await this.token });

    return resp.response;
  }

  public async getUser(id: Int): Promise<KworkUser> {
    const resp = await this.apiRequest('post', 'user', { id });

    return resp.response;
  }

  public async getFavouriteCategories(): Promise<Category[]> {
    const resp = await this.apiRequest('post', 'favoriteCategories', { token: await this.token });

    return resp.response;
  }

  public async getExchangeInfo(): Promise<ExchangeInfo[]> {
    const resp = await this.apiRequest('post', 'exchangeInfo', { token: await this.token });

    return resp.response;
  }

  public async getProjects(categories: Int[] = [], page: Int = <Int>0): Promise<{ response?: Project[]; paging?: Pagination }> {
    const resp = await this.apiRequest('post', 'projects', { token: await this.token, categories: categories.join(','), page });

    if (resp.paging.pages > 1 && page == 0) {
      for (let i = 2; i <= resp.paging.pages; i++) {
        const newResp = await this.apiRequest('post', 'projects', { token: await this.token, categories: categories.join(','), page: i });
        resp.response.push(...newResp.response);
      }
    }

    return resp;
  }
}

module.exports = Kwork;
