import FlexAPI from '../flexapi.js'
import CRMRecord from './record.js'

class FlexAPIModule {

    constructor(moduleName) {
        this.moduleName = moduleName;
    }

    getName() {
        return this.moduleName;
    }

    getRecord(crmId) {
        return new Promise((resolve, reject) => {
            FlexAPI.get('records/' + this.moduleName + '/' + crmId).then((response) => {
                let result = new CRMRecord(crmId, this.moduleName);
                result.initData(response);

                resolve(result);
            });
        })
    }

    createInventoryRecord(fields, products, groupTaxes, noResponse = false) {
        return new Promise((resolve, reject) => {

            let parameters = {
                fields: fields,
                products: products,
                group_taxes: groupTaxes
            };

            FlexAPI.post('records/create_inventory/' + this.moduleName, parameters).then((response) => {

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

}

export default FlexAPIModule;
