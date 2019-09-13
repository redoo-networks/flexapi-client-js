import FlexAPI from '../flexapi'
import CRMRecord from './record'

class Listing {
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
