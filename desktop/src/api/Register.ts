import axios from 'axios';
const uuid = require('uuid4');

export class Register {

  // noinspection JSMethodCanBeStatic
  async registerDevice(code: string): Promise<string> {
    const deviceId = uuid();

    const response = await axios.post(
      'https://my.remarkable.com/token/device/new',
      {
        code,
        deviceId,
        deviceDesc: 'desktop-linux',
      },
      {
        headers: { Authorization: `Bearer ` },
        responseType: 'text',
      }
    ).catch(error => { throw error; });

    return response.data;
  }

}
