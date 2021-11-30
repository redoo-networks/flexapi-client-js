import FlexAPI from '../flexapi.js'
import { CRMUrl, CRMUserword, CRMPassword } from './config.js'

export default function() {
    return new Promise(resolve => {
    // FlexAPI.setCRMUrl('http://localhost/vtiger/dev_env/vtigercrm-flexxapi/');
    FlexAPI.setCRMUrl(CRMUrl);

    FlexAPI.setCRMLogin(CRMUserword, CRMPassword)
        .then(token => {
            console.log('[Setup] Connected with token: ' + token);
            
            resolve();
        })

    });
        //FlexAPI.setToken('AccessToken');
}