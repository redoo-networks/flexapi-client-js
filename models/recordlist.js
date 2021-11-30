import FlexAPI from '../flexapi.js'
import FlexAPIRecord from "./record.js";

class FlexAPIRecordlist {

    constructor(module) {
        if(typeof module == 'string') {
            this.moduleName = module;
        } else {
            this.moduleName = module.getName();
        }
    }

    /** Setter **/
    setRecordData(recordsData) {
        this.recordsData = recordsData;
    }
    setTotalCount(total) {
        this.totalCount = +total;
    }

    /** Getter **/
    getRecordsData() {
        return this.recordsData;
    }
    getData() {
        return this.getRecordsData();
    }

    getRecords() {
        return this.recordsData.map(value => {
            let newRecord = new FlexAPIRecord(value.crmid, this.moduleName);
            newRecord.initData(value);

            return newRecord;
        })
    }

    getTotalCount() {
        return this.totalCount;
    }

}

export default FlexAPIRecordlist;
