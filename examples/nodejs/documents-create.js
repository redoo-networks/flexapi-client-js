import FlexAPI from '../../flexapi.js'
import setup from '../setup.js'
import Document from '../../models/document.js'
import { readFile }  from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var currentPath  = process.cwd();;

setup().then(() => {

    readFile(path.join(__dirname, '/../example.pdf'), 'base64', function(err, data) {
        if (err) throw err;

        Document.createFromBase64('testfile.pdf', data, {
            'notes_title': 'Testfile',
        }).then(document => {
            // Document if object of Document model
            console.log('[Example Output] ', document);

            // Can be related to any record ID
            document.connectToRecordId(2);
        })
    });

});

// 

