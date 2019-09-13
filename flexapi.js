/**
 * @author Redoo Networks GmbH (SW)
 */
import axios from "axios";
import Module from "./components/module";

class FlexAPI {
    setCRMUrl(url) {
        this.url = url + '/modules/FlexAPI/api.php';
    }
	
    setToken(token) {
        this.token = token;
    }

    module(moduleName) {
        return new Module(moduleName);
    }

    get(action, parameters) {
        return this.request('GET', action, parameters);
    }

    post(action, parameters) {
        return this.request('POST', action, parameters);
    }

    request(method, action, parameters) {
        return new Promise((resolve, reject) => {
            let data = {};
            data.action = action;
            data.method = method.toUpperCase();

            if(typeof this.token !== 'undefined') {
                data['user-token'] = this.token;
            }
            data.params = parameters;

            axios.post(this.url, data)
                .then((response) => {
                    resolve(response.data.data);
                }, () => {
                    reject();
                });

        });
    }
}

export default new FlexAPI();

