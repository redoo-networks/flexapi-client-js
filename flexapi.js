/**
 * @author Redoo Networks GmbH (SW)
 */
import axios from "axios";
import Module from "./models/module.js";
import search from "./services/search.js";
import listing from "./services/listing.js";
import weekplanner from "./services/weekplanner.js";
import ping from "./services/ping.js";

class FlexAPI {
    setOnAccessDeniedCallback(callback) {
        this.onAccessDeniedCb = callback;
    }

    setCRMUrl(url) {
        this.url = url + '/modules/FlexAPI/api.php';
    }

    setCustomerToken(customerToken) {
        this.customerToken = customerToken;
        console.log(customerToken, this.customerToken);
    }

    setToken(token) {
        this.token = token;
    }

    loginCustomer(email, password) {
        return new Promise((resolve, reject) => {
            this.post('customerportal/login', {
                email: email,
                password: password
            }).then(function(response) {
                resolve(response);
            });
        });

    }

    loginCustomerByKey(email, key) {
        this.post('customerportal/login', {
            email: email,
            key: key
        })
    }

    setCRMLogin(username, password) {
        return new Promise((resolve, reject) => {
            this.post('login/login', {username: username, password: password})
                .then((response) => {
                    if (typeof response.token !== 'undefined') {
                        this.setToken(response.token);

                        resolve(response.token);
                    }
                }, (error) => {
                    console.error('Error during setCRMLogin ', error);
                });
        });
    }

    setTimezone(timezone) {
        this.timezone = timezone;
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

    async post(action, parameters) {
        return this.request('POST', action, parameters);
    }

    async request(method, action, parameters) {
            return new Promise((resolve, reject) => {
                this.requestRAW(method, action, parameters).then((response) => {
                    if(typeof response.data.tokenexpire !== 'undefined' && response.data.tokenexpire !== false) {
                        localStorage.setItem('api-expire', response.data.tokenexpire);
                    }

                    resolve(response.data.data);
                }, e => {
                    console.log('ERROR', e);
                });
            });
    }

    async requestRAW(method, action, parameters, options = {}) {
        return new Promise((resolve, reject) => {
            let data = {};
            data.action = action;
            data.method = method.toUpperCase();
            if(this.timezone) {
                data.timezone = this.timezone;
            }

            if(typeof this.customerToken !== 'undefined') {
                data['customer-mode'] = true;
                data['customer-token'] = this.customerToken;
            }
            if(typeof this.token !== 'undefined') {
                data['user-token'] = this.token;
            }
            data.params = parameters;

            if(typeof this.basicAuth !== 'undefined') {
                options['auth'] = this.basicAuth;
            }

            axios.post(this.url, data, options)
                .then((response) => {
                    if(response.data.result == 403 && this.onAccessDeniedCb) {
                        this.onAccessDeniedCb();
                    }

                    resolve(response);
                }, (error) => {
                    reject(error);
                });

        });
    }

    service(service) {
        switch(service.toLowerCase()) {
            case 'weekplanner':
                return weekplanner;
            case 'listing':
                return listing;
            case 'search':
                return search;
            case 'ping':
                return ping;
        }
    }
}

export default new FlexAPI();

