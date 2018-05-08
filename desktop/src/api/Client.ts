import axios from 'axios';

export class Client {

  private apiUrl: string;
  private token: string;

  constructor(private secret: string) { }

  init() {
    return Promise.all([this.refreshToken(), this.serviceDiscovery()]);
  }

  async refreshToken() {
    const auth = { Authorization: `Bearer ${this.secret}` };

    const response = await axios.post('https://my.remarkable.com/token/user/new', {} , {
      headers: { ...auth },
      responseType: 'text',
    });

    this.token = response.data;
  }

  // noinspection TsLint
  async serviceDiscovery() {
    const response = await axios.get('https://service-manager-production-dot-remarkable-production.appspot.com/service/json/1/document-storage?environment=production&group=auth0%7C5a68dc51cb30df3877a1d7c4&apiVer=2');
    this.apiUrl = response.data.Host;
  }

  async listItems(): Promise<any> {
    const auth = { Authorization: `Bearer ${this.token}` };

    const response = await axios.get(`https://${this.apiUrl}/document-storage/json/2/docs`, {
      headers: { ...auth },
    });

    return response.data;
  }
}
