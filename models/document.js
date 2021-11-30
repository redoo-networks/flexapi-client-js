import FlexAPI from '../flexapi.js'


class FlexAPIDocument {

    constructor(documentId) {
        if(!documentId) documentId = 0;

        this.documentId = +documentId;
    }


    connectToRecordId(recordId) {
        return new Promise((resolve, reject) => {

            FlexAPI.post('documents/' + this.documentId + '/relate', {
                crmid: recordId,
            }).then(response => {
                resolve();
            });

        });

    }

    /** Static Function **/
    static createFromBlob(filename, blob, recordData) {
        return new Promise((resolve, reject) => {
            if(!recordData) recordData = {};

            var reader = new FileReader();
            reader.readAsDataURL(blobContent);

            reader.onloadend = function () {
                var base64String = reader.result;
                console.log('Base64 String - ', base64String);
        
                // Simply Print the Base64 Encoded String,
                // without additional data: Attributes.
                console.log('Base64 String without Tags- ', 
                base64String.substr(base64String.indexOf(', ') + 1));

                FlexAPIDocument.createFromBase64(filename, blob, recordData).then(resolve);
            }
        });
    }

    static createFromBase64(filename, base64FileContent, recordData) {
        if(!recordData) recordData = {};

        return new Promise((resolve, reject) => {
            recordData.filelocationtype = 'I';

            FlexAPI.post('documents/create', {
                fields: recordData,
                filename: filename, 
                file: base64FileContent
            }).then(response => {
                resolve(new FlexAPIDocument(response.id));
            });

        });
        
    }
    
}

export default FlexAPIDocument;
