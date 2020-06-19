import FlexAPI from '../flexapi'
import moment from "moment";
import {gravatarFilter} from "../../redoospace/filter/gravatar";
import {nl2br} from "../../redoospace/filter/nl2br";

class FlexAPIComment {

    constructor(data) {
        if(!data) data = {};

        this.commentData = data;
    }

    getData() {
        return this.commentData;
    }

    setCommentContent(content) {
        this.commentData['commentcontent'] = content;
    }

    getAuthorAvatarUrl() {
        return gravatarFilter('ich@stefanwarnat.de');
    }

    isFromCustomer() {
        return ! +this.commentData['userid'];
    }

    isFromCRM() {
        return !! +this.commentData['userid'];
    }

    getId() {
        return this.commentData['commentid'];
    }

    getContent() {
        return nl2br(this.commentData['commentcontent']);
    }

    getAuthor() {
        return this.commentData['author'];
    }

    isPrivate() {
        return !!this.commentData['isprivate'];
    }

    getCreatedDate() {
        return moment(this.commentData['created']);
    }

    get(field) {
        if(typeof this.data !== 'undefined') {
            return this.data[field];
        }

        throw 'Field ' + field + ' not found in Record !';
    }

}

export default FlexAPIComment;
