import axios from 'axios';

export class Client {

  constructor(private secret: string) { }

  async refreshToken(): Promise<string> {
    const auth = { Authorization: `Bearer ${this.secret}` };

    const response = await axios.post('https://my.remarkable.com/token/user/new', {} , {
      headers: { ...auth },
      responseType: 'text',
    });

    return response.data;
  }

}
