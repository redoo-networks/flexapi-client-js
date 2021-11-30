import FlexAPI from '../flexapi.js'
import CRMRecord from '../models/record.js'

class Weekplanner {
    getCurrentPlanByDate(relatedId, date) {
        return new Promise((resolve, reject) => {
            FlexAPI.get('redooweekplanner/current/' + relatedId + '/' + date).then((response) => {

                resolve(response);
            });
        });
    }
}

export default new Weekplanner();
