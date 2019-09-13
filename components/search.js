import FlexAPI from '../flexapi'
import CRMRecord from "./record";

class Search {
    complexe(moduleName, fields, condition, orderByField = null, limit = 100, offset = 0, referenceFields = null) {
        return new Promise((resolve, reject) => {
            const parameters = {
                module: moduleName,
                fields: fields,
                condition: condition,
                orderby: orderByField,
                limit: 0,
                referencefields: referenceFields
            };

            FlexAPI.get('search/complexe', parameters).then((response) => {
                let result = {
                    'total': +response.total,
                    'records': []
                };

                for(let i in response.entries) {
                    let record = new CRMRecord(response.entries[i].crmid, moduleName);
                    record.initData(response.entries[i]);

                    result.records.push(record)
                }

                resolve(result);
            });

        });
    }
}

export default new Search();
