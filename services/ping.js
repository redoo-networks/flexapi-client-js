import FlexAPI from '../flexapi.js'
import CRMRecord from '../models/record.js'

class Ping {
    send() {
        return new Promise((resolve, reject) => {
            FlexAPI.get('ping/get').then((response) => {

                resolve(response);

            });
        });
    }
}

export default new Ping();
