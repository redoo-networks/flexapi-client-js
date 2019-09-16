import FlexAPI from '../flexapi'

export default class Record {

    constructor(recordId, moduleName = '') {
        this.recordId = recordId;
        this.moduleName = moduleName;
    }

    initData(data) {
        this.data = data;
    }
	
    getId() {
        return this.recordId;
    }

    updateRecord(fields) {
        if(this.moduleName === '') {
            throw 'updateRecord() requires a not empty moduleName parameter in Record constructor';
        }

        var parameters = {
            'fields': fields
        };

        return FlexAPI.post('records/' + this.moduleName + '/' + this.recordId, parameters).then((response) => {
            return response;
        });

        // return new Promise((resolve) => {
        //     FlexAPI.post('records/' + this.moduleName + '/' + this.recordId, parameters).then((response) => {
        //         resolve(response);
        //     });
        // });
    }


    get(field) {
        if(typeof this.data !== 'undefined') {
            return this.data[field];
        }

        throw 'Field ' + field + ' not found in Record !';
    }

}
