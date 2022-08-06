var axios = require('axios');

const showResponse = (status, message, data = null, other = null, code = null) => {
    let response = {}
    response.status = status
    response.message = message
    if (data !== null) {
        response.data = data
    }
    if (other !== null) {
        response.other = other
    }
    if (code !== null) {
        response.code = code
    }
    return response;
}

const showOutput = (res, response, code) => {
    delete response.code;
    res.status(code).json(response);
}

const randomStr = (len, arr) => {
    var digits = arr;
    let OTP = '';
    for (let i = 0; i < len; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    if (OTP.length < len || OTP.length > len) {
        randomStr(len, arr);
    }
    return (OTP);
}

const showConsole = (content) => {
    console.log(content);
}

const validateParams = (request, feilds) => {
    var postKeys = [];
    var missingFeilds = [];
    for (var key in request.body) {
        postKeys.push(key);
    }
    for (var i = 0; i < feilds.length; i++) {
        if (postKeys.indexOf(feilds[i]) >= 0) {
            if (request.body[feilds[i]] == "")
                missingFeilds.push(feilds[i]);
        } else {
            missingFeilds.push(feilds[i]);
        }
    }
    if (missingFeilds.length > 0) {
        let response = showResponse(false, `Following fields are required : ${missingFeilds}`)
        return response;
    }
    let response = showResponse(true, ``)
    return response;
}

const validateParamsArray = (data, feilds) => {
    var postKeys = [];
    var missingFeilds = [];
    for (var key in data) {
        postKeys.push(key);
    }
    for (var i = 0; i < feilds.length; i++) {
        if (postKeys.indexOf(feilds[i]) >= 0) {
            if (data[feilds[i]] == "")
                missingFeilds.push(feilds[i]);
        } else {
            missingFeilds.push(feilds[i]);
        }
    }
    if (missingFeilds.length > 0) {
        let response = showResponse(false, `Following fields are required : ${missingFeilds}`)
        return response;
    }
    let response = showResponse(true, ``)
    return response;
}

const sendSMS = (mobile, message) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: 'https://sms.sslwireless.com/pushapi/dynamic/server.php?user=' + process.env.SMS_USER + '&pass=' +
                process.env.SMS_PASS + '&sms=' + message + '&sid=' + process.env.SMS_SENDER_ID + '&msisdn=' + mobile + '&csmsid=123456789',
            headers: {}
        };
        axios(config)
        .then((response) => {
            // console.log("in then",response)
            return resolve(true);
        })
        .catch((error) => {
            // console.log("in error",error)
            return resolve(false);
        });
    });
}

const sendCurlNotification = (title, body, notif_data, tokens) => {
    var data = JSON.stringify({
        "notification":{
            "title" :title,
            "body"  :body,
        },
        "data" : notif_data,
        "to":tokens
    });
    var config = {
        method: 'post',
        url: process.env.FIREBASE_URL,
        headers: {
            'Authorization': 'key='+ process.env.FIREBASE_SERVER_KEY,
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
    .then(function (response) {
        // console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        // console.log(error);
    });
}

const dynamicSort = (property) => {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}

const validateEmail = (email) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
        return true
    }
    return false
}

const validatePassword = (password) => {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(password.match(passw)){ 
        return true;
    }
    return false;
}

module.exports = {
    showResponse,
    showOutput,
    randomStr,
    validateParams,
    validateParamsArray,
    showConsole,
    sendSMS,
    sendCurlNotification,
    dynamicSort,
    validateEmail,
    validatePassword
}