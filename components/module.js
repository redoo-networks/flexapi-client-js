import FlexAPI from '../flexapi'
import CRMRecord from './record'

export default class module {

    constructor(moduleName) {
        this.moduleName = moduleName;
    }

    getRecord(crmId) {
        return new Promise((resolve, reject) => {
            FlexAPI.get('records/' + this.moduleName + '/' + +crmId).then((response) => {
                let result = new CRMRecord(+crmId, this.moduleName);
                result.initData(response);

                resolve(result);
            });
        })
    }

    updateRecord(crmId, fields) {
        var parameters = {
            'fields': fields
        };

        FlexAPI.post('records/' + this.moduleName + '/' + crmId, parameters).then((response) => {
            resolve();
        });

    }

    createRecord(fields, noResponse = false) {
        return new Promise((resolve, reject) => {

            let parameters = {
                fields: fields
            };

            FlexAPI.post('records/create/' + this.moduleName, parameters).then((response) => {

                if(noResponse === false) {
                    this.getRecord(response.id).then((record) => {
                        resolve(record);
                    });
                } else {
                    resolve(response.id);
                }

            });
        });
    }

};
