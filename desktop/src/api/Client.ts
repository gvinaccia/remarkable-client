import axios from 'axios';

// noinspection TsLint
const SERVICE_LOCATION_URL = 'https://service-manager-production-dot-remarkable-production.appspot.com/service/json/1/document-storage?environment=production&group=auth0%7C5a68dc51cb30df3877a1d7c4&apiVer=2';
const NEW_TOKEN_URL = 'https://my.remarkable.com/token/user/new';

// https://github.com/splitbrain/ReMarkableAPI/wiki
export class Client {

  private apiUrl = '';
  private token = '';

  constructor(private secret: string) { }

  init() {
    return Promise.all([this.refreshToken(), this.serviceDiscovery()]);
  }

  async refreshToken() {
    const auth = { Authorization: `Bearer ${this.secret}` };

    const response = await axios.post(NEW_TOKEN_URL, {} , {
      headers: { ...auth },
      responseType: 'text',
    });

    this.token = response.data;
  }

  // noinspection TsLint
  async serviceDiscovery() {
    const response = await axios.get(SERVICE_LOCATION_URL);
    this.apiUrl = response.data.Host;
  }

  async listItems(): Promise<any> {
    const auth = { Authorization: `Bearer ${this.token}` };

    const response = await axios.get(`https://${this.apiUrl}/document-storage/json/2/docs`, {
      headers: { ...auth },
      params: { withBlob: 'true'}
    });

    return response.data;
  }
}
