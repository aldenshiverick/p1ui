//p14C Variables
const environmentID = 'ca3ad373-df71-4eb5-a3b5-76439336e1d6'; // env ID from p1 console
const baseUrl = 'https://morgapp.ping-eng.com/p1ui'; //Where this app lives

const scopes = 'openid profile email address phone p1:update:user p1:read:user p1:reset:userPassword p1:read:userPassword p1:validate:userPassword'; // default scopes to request
const responseType = 'token id_token'; // tokens to recieve

const landingUrl = baseUrl + '/index.html'; // url to send the person once authentication is complete
const logoutUrl = baseUrl + 'logout/'; // whitelisted url to send a person who wants to logout
const redirectUri = baseUrl + '/login.html'; // whitelisted url P14C sends the token or code to

const workerClientID = 'cedd8115-38d5-49f6-8bd8-043505fd83c6'; //used to create/manage users
const workerClientSecret = 'EAarQcJAyAsS2QZN46MSrQD_nUHUK9~b2liHYlULE3jKne1EPIFwGG3Jayo6upBQ';

const appClientID = 'dd2157ed-6f2b-4de9-81e3-11feb2b19302';
const authUrl = 'https://auth.pingone.com';
const apiUrl = 'https://api.pingone.com/v1';

const agentClientID ='9d6751a0-cbb9-4e3f-8efb-c93d2733dc9d';
//const agentWorkerApp ='';
//const agentWorkerSecret = '';



const flowId = '';

const regexLower = new RegExp('(?=.*[a-z])');
const regexUpper = new RegExp('(?=.*[A-Z])');
const regexNumeric = new RegExp('(?=.*[0-9])');
const regexSpecial = new RegExp('(?=.*[~!@#\$%\^&\*\)\(\|\;\:\,\.\?\_\-])');
const regexLength = new RegExp('(?=.{8,})');

// simple function to parse json web token
function parseJwt(token) {
    console.log("parseJWT was called");
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  
  // function to generate random nonce
  
  function generateNonce(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:;_-.()!';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  
  if (!appClientID || !environmentID) {
  
    alert('Be sure to edit js/auth.js with your environmentID and clientId');
  
  }
  
  
  // exJax function makes an AJAX call
  function exJax(method, url, callback, contenttype, payload) {
    console.log('ajax (' + url + ')');
    console.log("content type: "+contenttype);
    $.ajax({
        url: url,
        method: method,
        dataType: 'json',
        contentType: contenttype,
        data: payload,
        xhrFields: {
          withCredentials: true
        }
      })
      .done(function(data) {
        callback(data);
      })
      .fail(function(data) {
        console.log('ajax call failed');
        console.log(data);
        $('#warningMessage').text(data.responseJSON.details[0].message);
        $('#warningDiv').show();
      });
  }