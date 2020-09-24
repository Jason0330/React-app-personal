import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 50000;
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.withCredentials = true;

let http = {
    post: "",
    get: ""
};

http.post = function (api, data) {
    let params = qs.stringify(data);
    return new Promise((resolve, reject) => {
        axios.post(api, params).then((res) => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
};

http.get = function (api, data) {
    let params = qs.stringify(data);
    return new Promise((resolve, reject) => {
        axios.get(api, params).then((res) => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
    })
};

export default http

//使用
// import http from '../../server'

// //get
// http.get('/sys/logout').then((response) => {
//     if (response.data === "SUCCESS") {
//         ...
//     } else {
//         ...
//     }
// })

// //post
// http.post('/sys/login', {
//     loginInfo: loginInfo,
//     password: password
// }).then((response) => {
//     if (response.data === 'SUCCESS') {
//         ...
//     } else {
//         ...          
//     }
// });