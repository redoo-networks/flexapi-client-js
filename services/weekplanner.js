import FlexAPI from '../flexapi'
import CRMRecord from '../models/record'

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
