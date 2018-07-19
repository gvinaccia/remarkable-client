import axios from 'axios';
const uuid = require('uuid4');

export class Register {

  registerDevice(code: string) {
    const deviceID = uuid();
    console.log(deviceID, code);

    /*
    axios.post(
      'https://my.remarkable.com/token/device/new',
      {
        code,
        deviceDesc: 'rm-client',
        deviceID: '701c3752-1025-4770-af43-5ddcfa4dabb2'
      },
      {
        headers: { Authorization: `Bearer ` }
      }
    );
    */
  }

}
