function registerUser() {
  console.log("registerUser was called");
  let method = "POST";
  //let at = Cookies.get('at');
  let flow = Cookies.get('flowID');
  let contentType = 'application/vnd.pingidentity.user.register+json';
  let url = authUrl + '/' + environmentID + '/flows/' + flow;
  let payload = JSON.stringify({
    username: $('#email').val(),
    email: $('#email').val(),
    name: {
      given: $('#fname').val(),
      family: $('#lname').val()
    },
    birthday: $('#birthday').val(),
    gender: $('gender').val(),
    //relationship: 
    address: {
      streetAddress: $('#address').val(),
      locality: $('city').val(),
      region: $('state').val(),
      postalCode: $('zip').val()
    },
    password: $('#user_pass').val()
  });
  console.log('url:' + url);
  console.log('payload:' + payload);
  exJax("POST", url, nextStep, contentType, payload);
}

// function getAccessToken() {
//   var settings = {
//     "url": "https://auth.pingone.com/ca3ad373-df71-4eb5-a3b5-76439336e1d6/as/token",
//     "method": "POST",
//     "timeout": 0,
//     "headers": {
//       "Content-Type": "application/x-www-form-urlencoded"
//     },
//     "data": {
//       "grant_type": "client_credentials",
//       "client_id": "cedd8115-38d5-49f6-8bd8-043505fd83c6",
//       "client_secret": "EAarQcJAyAsS2QZN46MSrQD_nUHUK9~b2liHYlULE3jKne1EPIFwGG3Jayo6upBQ"
//     }
//   };
  
//   $.ajax(settings).done(function (response) {
//     console.log(response);
//     setCookies(response);
//   });
// }

// function setCookies(data){
//   console.log("setcookie Called");
//   console.log(data.access_token);
//   let at = data.access_token;
//   console.log('at is: ' + at);
//   Cookies.set('at', at, { sameSite: 'strict' });
// }

function checkPass()
{
    //Store the password field objects into variables ...
    var password = document.getElementById('user_pass');
    var confirm  = document.getElementById('user_pass_conf');
    //Store the Confirmation Message Object ...
    var message = document.getElementById('confirm-message2');
    //Set the colors we will be using ...
    var good_color = "#66cc66";
    var bad_color  = "#ff6666";
    //Compare the values in the password field 
    //and the confirmation field
    if(password.value == confirm.value){
        //The passwords match. 
        //Set the color to the good color and inform
        //the user that they have entered the correct password 
        confirm.style.backgroundColor = good_color;
        message.style.color           = good_color;
        message.innerHTML             = '<img src="/wp-content/uploads/2019/04/tick.png" alt="Passwords Match!">';
    }else{
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        confirm.style.backgroundColor = bad_color;
        message.style.color           = bad_color;
        message.innerHTML             = '<img src="/wp-content/uploads/2019/04/publish_x.png" alt="Passwords Do Not Match!">';
    }
}  

function validateUser(){
  console.log('verifyUser called');
  let otp = $('#user_otp').val();
  let payload = JSON.stringify({
    verificationCode: $('#user_otp').val()
  });
  //let url = $('#validateOtpUrl').val();
  //let url = $('verifyUserUrl').val();
  let url = authUrl + '/'+ environmentID + '/flows/' + flowId;
  let contenttype ='application/vnd.pingidentity.user.verify+json';
  console.log('url :' + url);
  console.log('verificationCode: ' + otp);
  console.log('content' + contenttype);

  exJax('POST', url, nextStep, contenttype, payload);
}

function nextStep(data) {
  status = data.status;
  console.log('Parsing json to determine next step: ' + status);
  flowId= data.id;
  console.log('FlowId is: ' + flowId);
  console.log('FlowId is: ' + data);

  switch (status) {
    case 'VERIFICATION_CODE_REQUIRED':
      console.log('Verify email');
      $('#reg').hide();
      $('#otpDiv').show();
      
      break;
    case 'COMPLETED':
      console.log('Registration was a SUCCESS!');
      console.log(data._links);
      let url = data.resumeUrl;
      console.log('resume url is :' + url);
      finishAuth(url);
      

    default:
      console.log('something went wrong');
      break;
  }
}
function getFlowStatus(){
  let url = authUrl + "/" + environmentID + "/flows/" +flowId;
  exJax('POST', url ,nextStep);
}
function finishAuth(url){
  console.log('finishAuth called');
  let contentType = 'application/json';
  exJax('GET', url , setCookies, contentType);
  location.href = 'https://morgapp.ping-eng.com/p1ui/profile.html';
}


function setCookies(data){
  console.log("setcookie Called");
  console.log(data);
  let userAPIid = data._embedded.user.id;
  console.log('user is: ' + userAPIid);
  let accessToken = data.authorizeResponse.access_token
Cookies.set('userAPIid', userAPIid,{ sameSite: 'strict' });
Cookies.set('accessToken', accessToken, { sameSite: 'strict' });
window.location.replace("https://morgapp.ping-eng.com/p1ui/profile.html");
}