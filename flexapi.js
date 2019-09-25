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

    setCRMLogin(username, password) {
        return new Promise((resolve, reject) => {
            this.post('login/login', {username: username, password: password}).then((response) => {
                if (typeof response.token !== 'undefined') {
                    this.setToken(response.token);

                    resolve(response.token);
                }
            })
        });
    }

    setBasicAuth(username, password) {
        this.basicAuth = {
            username: username,
            password: password
        }
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

            let options = {};
            if(typeof this.basicAuth !== 'undefined') {
                options['auth'] = this.basicAuth;
            }

            axios.post(this.url, data, options)
                .then((response) => {
                    resolve(response.data.data);
                }, () => {
                    reject();
                });

        });
    }
}

export default new FlexAPI();

