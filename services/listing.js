import FlexAPI from '../flexapi.js'
import CRMRecord from '../models/record.js'

class Listing {
    conditionalList(moduleName, fields, condition, limit = 25, page = 1, orderByField = null, sortorder = 'ASC') {
        return new Promise((resolve) => {
            const parameters = {
                fields: fields,
                limit: limit,
                page: page,
                condition: condition,
                orderby: orderByField,
                sortorder: sortorder
            };

            FlexAPI.get('listing/list/' + moduleName, parameters).then((response) => {
                let result = [];

                for(let i in response.entries) {
                    let record = new CRMRecord(i, moduleName);
                    record.initData(response.entries[i]);

                    result.push(record)
                }

                resolve(result);
            });

        });
    }
    list(moduleName, fields, limit = 25, page = 1, orderByField = null, sortorder = 'ASC') {
        return new Promise((resolve) => {
            const parameters = {
                fields: fields,
                limit: limit,
                page: page,
                orderby: orderByField,
                sortorder: sortorder
            };

            FlexAPI.get('listing/list/' + moduleName, parameters).then((response) => {
                let result = [];

                for(let i in response.entries) {
                    let record = new CRMRecord(i, moduleName);
                    record.initData(response.entries[i]);

                    result.push(record)
                }

                resolve(result);
            });

        });
    }
}

export default new Listing();
