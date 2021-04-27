import storage from 'node-persist';
import { client, connection, IMessage } from 'websocket';
import axios, { Method, AxiosInstance } from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { SimpleEventDispatcher, ISimpleEvent } from 'strongly-typed-events';
import { Int, Pagination, KworkUser, WorkerOrders, PayerOrders, Category, ExchangeInfo, Project } from './common/types';

class Kwork {
  public login: string;
  public password: string;
  public phone: string;

  private _onNewProject: SimpleEventDispatcher<Project> = new SimpleEventDispatcher<Project>();

  private _token?: string | null;
  private _session: AxiosInstance;
  private _socket: client;
  private _lastProjects?: Project[];

  public constructor(login: string, password: string, phone: string, proxy: string | undefined = undefined) {
    this.login = login;
    this.password = password;
    this.phone = phone;

    storage
      .init({
        dir: 'kwork-api-storage'
      })
      .then(async () => {
        const token = await storage.getItem('token');

        if (token != undefined) {
          this._token = token;
        }
      });

    const httpsAgent = proxy === undefined ? undefined : new SocksProxyAgent(proxy);

    this._token = null;
    this._session = axios.create({
      baseURL: 'https://api.kwork.ru/',
      headers: { Authorization: 'Basic bW9iaWxlX2FwaTpxRnZmUmw3dw==' },
      httpsAgent
    });

    this._socket = new client();
    this._socket.on('connect', (connection: connection) => {
      connection.on('message', this.onMessageReceived.bind(this));
    });
    this._socket.connect(`wss://notice.kwork.ru/ws/public/{this.getChannel()}`);

    this.getProjects().then((x) => (this._lastProjects = x.response));

    setInterval(this.updateProjects.bind(this), 10000);
  }

  private onMessageReceived(message: IMessage): void {
    console.log(message);
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
        await storage.setItem('token', this._token);
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

  public async getWorkerOrders(filter: 'active' | 'cancelled' | 'delivered' | 'unpaid' | 'all' = 'all', page: Int = <Int>0): Promise<WorkerOrders> {
    const resp = await this.apiRequest('post', 'workerOrders', { token: await this.token, filter, page });

    if ((resp.response.paging.pages ?? 0) > 1 && page == 0) {
      for (let i = 2; i <= resp.response.paging.pages; i++) {
        const newResp = await this.apiRequest('post', 'workerOrders', { token: await this.token, filter, page: i });
        resp.response.push(...newResp.response);
      }
    }

    return resp;
  }

  public async getPayerOrders(filter: 'active' | 'cancelled' | 'delivered' | 'unpaid' | 'all' = 'all', page: Int = <Int>0): Promise<PayerOrders> {
    const resp = await this.apiRequest('post', 'payerOrders', { token: await this.token, filter, page });

    if ((resp.response.paging.pages ?? 0) > 1 && page == 0) {
      for (let i = 2; i <= resp.response.paging.pages; i++) {
        const newResp = await this.apiRequest('post', 'payerOrders', { token: await this.token, filter, page: i });
        resp.response.push(...newResp.response);
      }
    }

    return resp;
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

  public async getChannel(): Promise<string> {
    const resp = await this.apiRequest('post', 'getChannel', { token: await this.token });

    return resp.response.channel;
  }
}

module.exports = Kwork;
