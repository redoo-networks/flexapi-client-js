import FlexAPI from '../flexapi'
import Comment from './comment'

class FlexAPIRecord {

    constructor(recordId, moduleName = '') {
        this.recordId = recordId;

        this.moduleName = moduleName;
        this.comments = null;
    }

    initData(data) {
        this.data = data;
    }

    getData() {
        return this.data;
    }

    getId() {
        return this.recordId;
    }

    /**
     * var comment = new FlexAPIComment();
     * comment.setCommentContent(this.ticketcontent);
     *
     * @param commentObj
     */
    createComment(commentObj) {
        return new Promise((resolve, reject) => {

            FlexAPI.post('records/comments/' + this.moduleName + '/' + this.recordId, commentObj.getData()).then(response => {
                this.comments.unshift(new Comment(response));
                resolve();
            });

        });
    }

    getComments(onlyPublic, force) {
        if(force) this.comments = null;

        if(typeof onlyPublic === 'undefined') onlyPublic = true;

        return new Promise((resolve, reject) => {
            if(this.comments) {
                resolve(this.comments);
                return;
            }

            FlexAPI.get('records/comments/' + this.moduleName + '/' + this.recordId + (onlyPublic ? '/public' : '')).then((response) => {
                this.comments = [];

                for(let comment of response) {
                    this.comments.push(new Comment(comment));
                }

                resolve(this.comments);
            });

        });
    }

    updateRecord(fields) {
        if(this.moduleName === '') {
            throw 'updateRecord() requires a not empty moduleName parameter in Record constructor';
        }

        var parameters = {
            'fields': fields
        };

        return new Promise((resolve, reject) => {

            FlexAPI.post('records/' + this.moduleName + '/' + this.recordId, parameters).then((response) => {
                resolve(response);
            });

        })
    }
    updateInventoryRecord(fields, products, groupTaxes) {
        return new Promise((resolve, reject) => {

            let parameters = {
                fields: fields,
                products: products,
                group_taxes: groupTaxes
            };

            FlexAPI.post('records/update_inventory/' + this.moduleName + '/' + this.recordId, parameters).then((response) => {

                resolve(this);

            });
        });
    }


    get(field) {
        if(typeof this.data !== 'undefined') {
            return this.data[field];
        }

        throw 'Field ' + field + ' not found in Record !';
    }

}

export default FlexAPIRecord;
