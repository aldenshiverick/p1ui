const adminClient = '9d6751a0-cbb9-4e3f-8efb-c93d2733dc9d';
const adminRedirect = 'https://morgapp.ping-eng.com/p1ui/adminlogon.html';
// build the authorization url in case we need it

const authorizationUrl =
  authUrl +
  '/' +
  environmentID +
  '/as/authorize?client_id=' +
  adminClient +
  '&response_type=' +
  responseType +
  '&redirect_uri=' +
  adminRedirect +
  '&scope=' +
  scopes +
  '&response_mode=pi.flow';


  function setUserinfoCookie() {  //put the AT and uuid somewhere handy --> bad coding :)
    let idToken = Cookies.get('idToken');
    let idPayload = parseJwt(idToken);
    Cookies.set('uuid', idPayload.sub);
    //Cookies.set('name', idPayload.given_name);
  }

//----initate logon ---- //
function initiateLogon() {
    console.log('initiateLogon called')
    let url = authorizationUrl;
    let method = 'GET'
    //exJax('GET', url, nextStep);
    $.ajax({
      url: url,
      method: method
    })
    .done(function(data) {
      nextStep(data);
    })
    .fail(function(data) {
      console.log('ajax call failed');
      console.log(data);
      $('#warningMessage').text(data.responseJSON.details[0].message);
      $('#warningDiv').show();
    });
  }


  function finishLogon(url){
      //get to redirect to get user info 
      console.log('finishLogon called')
      let method = 'GET'
      console.log('url is: '+ url);
      //exJax('GET', url, nextStep);
      $.ajax({
        url: url,
        method: method,
        xhrFields: {
            withCredentials: true
        }
      })
      .done(function(data) {
        setCookies(data);
      })
      .fail(function(data) {
        console.log('ajax call failed');
        console.log(data);
        $('#warningMessage').text(data.responseJSON.details[0].message);
        $('#warningDiv').show();
      });

  }

  function setCookies(data){
      console.log("setcookie Called");
      console.log(data);
      let userAPIid = data._embedded.user.id;
      console.log('user is: ' + userAPIid);
      let accessToken = data.authorizeResponse.access_token
    Cookies.set('userAPIid', userAPIid,{ sameSite: 'strict' });
    Cookies.set('accessToken', accessToken, { sameSite: 'strict' });
    window.location.replace("https://morgapp.ping-eng.com/p1ui/admin.html");
  }
  
   //----What should we do? ----//
   function nextStep(data) {
    status = data.status;
    console.log('Parsing json to determine next step: ' + status);
  
    switch (status) {
      case 'USERNAME_PASSWORD_REQUIRED':
        console.log('Rendering login form');
        $('#loginDiv').show();
        $('#otpDiv').hide();
        $('#pushDiv').hide();
        $('#changePasswordDiv').hide();
        $('#pwResetCodeDiv').hide();
        $('#validatePasswordUrl').val(data._links['usernamePassword.check'].href);
        $('#validatePasswordContentType').val('application/vnd.pingidentity.usernamePassword.check+json');
        //$('#registerUserUrl').val(data._links['user.register'].href);
        $('#forgotPasswordURL').val(data._links["password.forgot"].href);
        //$('#socialLoginUrl').val(data._embedded.socialProviders[0]._links.authenticate.href);
        //$('#partnerLoginUrl').val(data._embedded.socialProviders[1]._links.authenticate.href);
        $('#ppDiv').hide('');
        break;
      case 'VERIFICATION_CODE_REQUIRED':
        console.log('Rendering Verification code form');
        $('#loginDiv').hide();
        $('#otpDiv').show();
        $('#pushDiv').hide();
        $('#pwResetCodeDiv').hide();
        $('#changePasswordDiv').hide();
        $('#verifyUserUrl').val(data._links['user.verify'].href);
        $('#ppDiv').hide('');
        break;
      case 'PASSWORD_REQUIRED':
        console.log('Rendering login form');
        $('#loginDiv').show();
        $('#otpDiv').hide();
        $('#pushDiv').hide();
        $('#pwResetCodeDiv').hide();
        $('#changePasswordDiv').hide();
        $('#validatePasswordUrl').val(data._embedded.requiredStep._links['usernamePassword.check'].href);
        $('#validatePasswordContentType').val('application/vnd.pingidentity.usernamePassword.check+json');
        $('#ppDiv').hide('');
        break;
      case 'OTP_REQUIRED':
        console.log('Rendering otp form');
        $('#loginDiv').hide();
        $('#otpDiv').show();
        $('#pushDiv').hide();
        $('#pwResetCodeDiv').hide();
        $('#changePasswordDiv').hide();
        $('#validateOtpUrl').val(data._links['otp.check'].href);
        $('#validateOtpContentType').val('application/vnd.pingidentity.otp.check+json')
        $('#ppDiv').hide('');
        break;
      case 'PUSH_CONFIRMATION_REQUIRED':
        console.log('Rendering wait for push form');
        $('#loginDiv').hide();
        $('#otpDiv').hide();
        $('#pushDiv').show();
        $('#pwResetCodeDiv').hide();
        $('#changePasswordDiv').hide();
        $('#pushResumeUrl').val(data._links["device.select"].href);
        $('#ppDiv').hide('');
        break;
      case 'MUST_CHANGE_PASSWORD':
        console.log('Rendering password form');
        $('#loginDiv').hide();
        $('#otpDiv').hide();
        $('#pushDiv').hide();
        $('#pwResetCodeDiv').hide();
        $('#changePasswordDiv').show();
        $('#changePasswordUrl').val(data._links['password.reset'].href);
        $('#changePasswordContentType').val('application/vnd.pingidentity.password.reset+json')
        $('#ppDiv').hide('');
        break;
      case 'RECOVERY_CODE_REQUIRED':
      console.log('Rendering password form');
        $('#loginDiv').hide();
        $('#otpDiv').hide();
        $('#pushDiv').hide();
        $('#changePasswordDiv').hide();
        $('#pwResetCodeDiv').show();
        $('#changePasswordUrl').val(data._links['password.reset'].href);
        $('#pwcodeUrl').val(data._links['password.recover'].href);
        $('#changePasswordContentType').val('application/vnd.pingidentity.password.reset+json')
        $('#ppDiv').hide('');
        break;
      case 'COMPLETED':
        console.log('completed authentication successfully');
        $('#loginDiv').hide();
        $('#otpDiv').hide();
        $('#pushDiv').hide();
        $('#changePasswordDiv').hide();
        $('#pwResetCodeDiv').hide();
        $('#warningMessage').text('');
        $('#warningDiv').hide();
        $('#ppDiv').hide('');
        console.log('Finish logon called');
        console.log(data);
        console.log('resueme url is: '+ data.resumeUrl);
        finishLogon(data.resumeUrl);
        break;
      case 'PROFILE_DATA_REQUIRED':
      console.log('rendering PP form');
        $('#loginDiv').hide();
        $('#otpDiv').hide();
        $('#pushDiv').hide();
        $('#changePasswordDiv').hide();
        $('#pwResetCodeDiv').hide();
        $('#warningMessage').hide('');
        $('#warningDiv').hide();
        $('#ppDiv').text('');
      break;
      default:
        console.log('Unexpected outcome');
        break;
    }
  }
  
  
  
  //-----Authentication related methods -----//
  
  //--------First Factor------//
  
  // change password function
  function changePassword() {
    console.log('changePassword called');
    let payload = JSON.stringify({
      currentPassword: $('#current_password').val(),
      newPassword: $('#change_new_password').val()
    });
    let url = $('#changePasswordUrl').val();
    let contenttype = 'application/vnd.pingidentity.password.reset+json';
    console.log('payload '+ payload);
    exJax('POST', url, nextStep, contenttype, payload);
  }
  
  // validate password function
  function validatePassword() {
    console.log('validatePassword called');
    let payload = JSON.stringify({
      username: $('#user_login').val(),
      password: $('#user_pass').val()
    });
    console.log('payload is ' + payload);
    let url = $('#validatePasswordUrl').val();
    //let url = (authUrl + environmentID + '/flows/' + flowId);
    console.log('url is: ' + url);
    let contenttype = 'application/vnd.pingidentity.usernamePassword.check+json';
    console.log('contenttype is ' + contenttype);
    exJax('POST', url, nextStep, contenttype, payload);
  }
  
  
  function resetPassword(){
  
    //https://api.pingone.com/v1/environments/7334523a-4a2d-4dd6-9f37-93c60114e938/users/bfd0e265-abe6-41c9-aca6-2352478b30da/password
    console.log("resetPassword was called");
    let method = "POST";
    let user = $('#user_login').val();
    let url = $('#forgotPasswordURL').val();
    let contentType='application/vnd.pingidentity.password.forgot+json';
    console.log('url (' + url + ')');
    console.log('user =' + user);
    console.log("make exJax call");
    let payload = JSON.stringify({
      username: user
    });
    exJax(method, url, nextStep, contentType, payload);
    console.log("resetPassword finished");
  }
  
  
  function validatePWResetCode(){
    console.log("validate password code called ")
    let method = "POST";
    let url = $('#forgotPasswordURL').val();
    let contentType='application/vnd.pingidentity.password.recover+json';
    console.log('url (' + url + ')');
    console.log("make exJax call");
    let payload = JSON.stringify({
      recoveryCode: $('#pwReset_Code').val(),
      newPassword: $('#new_password').val()
    });
      console.log('payload =' + payload);
    exJax(method, url, nextStep, contentType, payload);
    console.log("validate Password code finished");
  
  }
  
  
  //-------MFA Calls -------//
  // validate one time passcode function
  function validateOTP() {
    console.log('validateOtp called');
    let otp = $('#otp_login').val();
    let payload = JSON.stringify({
      otp: otp
    });
    let url = $('#validateOtpUrl').val();
    //let url = (authUrl + '/' + environmentID + '/flows/' + flowId);
    let contenttype ='application/vnd.pingidentity.otp.check+json';
    //$('#validateOtpContentType').val();
    console.log('url :' + url);
    console.log('otp: ' + otp);
    console.log('content' + contenttype);
  
    exJax('POST', url, nextStep, contenttype, payload);
  }
  
  function continue_push() {
    //location.href=authUrl + '/' + environmentID + '/flows/' + flowId;
    console.log('continue push called');
    //let url = $('#pushResumeUrl');
    let url = authUrl + '/' + environmentID + '/flows/' + flowId;
    let contenttype ='application/json';
    //location.href = $('#pushResumeUrl').val();
    console.log('url ' + url);
    exJax('GET', url, nextStep, contenttype);
  }
