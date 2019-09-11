import FlexAPI from '../flexapi'
import CRMRecord from "./record";

class Search {
    complexe(moduleName, fields, condition, orderByField = null, limit = 100, offset = 0) {
        return new Promise((resolve, reject) => {
            const parameters = {
                module: moduleName,
                fields: fields,
                condition: condition,
                orderby: orderByField,
                limit: 0
            };

            FlexAPI.get('search/complexe', parameters).then((response) => {
                let result = [];
                console.log(response);
                /*
                for(let i in response.entries) {
                    let record = new CRMRecord(i);
                    record.setData(response.entries[i]);

                    result.push(record)
                }

                resolve(result);
                 */
            });

        });
    }
}

export default new Search();
