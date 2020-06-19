import FlexAPI from '../flexapi'
import CRMRecord from '../models/record'

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
