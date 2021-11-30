import FlexAPI from '../flexapi.js'
import CRMRecord from "../models/record.js";
import FlexAPIRecordlist from "../models/recordlist.js";

class APIServiceSearch {
    fulltextsearch(query, moduleName = null) {
        return new Promise((resolve, reject) => {
            const parameters = {
                query: query,
                module: moduleName
            };

            FlexAPI.get('search/fulltext', parameters).then((response) => {
                let result = {
                    'total': 0,
                    'records': []
                };

                for(let modulename in response) {
                    if(response.hasOwnProperty(modulename)) {
                        result.records[modulename] = [];

                        for (let recordIndex in response[modulename].result) {
                            if (response[modulename].result.hasOwnProperty(recordIndex)) {
                                result.total++;

                                let record = new CRMRecord(response[modulename].result[recordIndex].crmid, modulename);
                                record.initData(response[modulename].result[recordIndex]);

                                result.records[modulename].push(record);
                            }
                        }

                    }

                }

                resolve(result);
            });

        });
    }

    simple(query, moduleName = null) {
        return new Promise((resolve, reject) => {
            const parameters = {
                query: query,
                module: moduleName
            };

            FlexAPI.get('search/simple', parameters).then((response) => {
                let result = {
                    'total': 0,
                    'records': []
                };

                for(let modulename in response) {
                    if(response.hasOwnProperty(modulename)) {
                        result.records[modulename] = [];

                        for (let recordIndex in response[modulename].result) {
                            if (response[modulename].result.hasOwnProperty(recordIndex)) {
                                result.total++;

                                let record = new CRMRecord(response[modulename].result[recordIndex].crmid, modulename);
                                record.initData(response[modulename].result[recordIndex]);

                                result.records[modulename].push(record);
                            }
                        }

                    }

                }

                resolve(result);
            });

        });
    }

    complexe(moduleName, fields, condition, orderByField = null, limit = 100, offset = 0, referenceFields = null) {
        return new Promise((resolve, reject) => {
            const parameters = {
                module: moduleName,
                fields: fields,
                condition: condition,
                orderby: orderByField,
                limit: limit,
                offset: offset,
                referencefields: referenceFields
            };

            FlexAPI.get('search/complexe', parameters).then((response) => {
                let result = new FlexAPIRecordlist(moduleName);
                result.setTotalCount(response.total);
                result.setRecordData(response.entries);
                /*
                    'total': +response.total,
                    'records': []
                };*/
/*
                for(let i in response.entries) {
                    let record = new CRMRecord(response.entries[i].crmid, moduleName);
                    record.initData(response.entries[i]);

                    result.records.push(record)
                }

                let resultList = ;
*/
                resolve(result);
            });

        });
    }
}

export default new APIServiceSearch();
