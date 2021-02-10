function registerUser() {
  console.log("registerUser was called");
  let method = "POST";
  let contentType = 'application/vnd.pingidentity.user.register+json';
  let url = apiUrl + "/environments/" + environmentID + "/users";
  // let url = $('#registerUserUrl').val();
  let payload = JSON.stringify({
    username: $('#username').val(),
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
  });
  console.log('url:' + url);
  console.log('payload:' + payload);
  console.log('registered user: ' + username);
  exJax("POST", url, nextStep, contentType, payload);
}

function getAccessToken() {
  console.log("getAccessToken was called");
  let url = authUrl + "/environments/" + environmentID + "/as/token";
  console.log(url);
  let tok = workerClientID + ':' + workerClientSecret;
  let hash = btoa(tok);
  let auth = "Basic " + hash;
  let contentType = "application/x-www-form-urlencoded";
  console.log(auth);
  exJax("POST", url, nextStep, contentType, payload);
}

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
