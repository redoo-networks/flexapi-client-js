export default class Record {

    constructor(recordId) {
        this.recordId = recordId;
    }

    setData(data) {
        this.data = data;
    }
    getId() {
        return this.recordId;
    }

    get(field) {
        if(typeof this.data !== 'undefined') {
            return this.data[field];
        }

        throw 'Field ' + field + ' not found in Record !';
    }

};
