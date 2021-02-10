
function getUserValues() {
    console.log('getUserValues called');
    let method = "GET";
    let user = Cookies.get("userAPIid");
    let at = "Bearer " + Cookies.get("accessToken");
    let url = apiUrl + "/environments/" + environmentID + "/users/" + user;
    console.log('ajax (' + url + ')');
    console.log('at =' + at);
    console.log("make ajax call");
    $.ajax({
      async: "true",
      url: url,
      method: method,
      // beforeSend: function(xhr) {
      //   xhr.setRequestHeader('Authorization', at);
      // }
      xhrFields: {
        withCredentials: true
      }
    }).done(function(response) {
      console.log(response);
      setUserValues(response);
    });

    console.log("getUserValues completed");
  
  }
  
  function setUserValues(userJson) {
    console.log("setuserValues was called");
    console.log(userJson);
    let uuid = Cookies.get("uuid");
    //let streetAddress = userJson.address.streetAddress + " " + userJson.address.locality + ", " + userJson.address.region + " " + userJson.address.postalCode;
    if (Cookies.get("accessToken")) {
      if(userJson.name){
        if(userJson.name.given){
          console.log("givenname if was passes")
          document.getElementById("fname").value = userJson.name.given;
        }
        if(userJson.name.family){
        document.getElementById("lname").value = userJson.name.family;
        }
      }
      document.getElementById("email").value = userJson.email;
      //document.getElementById("username").value = userJson.username;
      document.getElementById("Hello").innerHTML = 'Welcome ' + userJson.username;
      if(userJson.daysSkied != null){
        //document.getElementById("daysSkied").value = userJson.daysSkied;
        document.getElementById("daysSkied").innerHTML = 'Days Skied this Year ' + userJson.daysSkied;
      }
      if(userJson.birthday != null){
        document.getElementById("birthday").value =  userJson.birthday;
      }
      if(userJson.gender != null){
        document.getElementById("gender").value = userJson.gender;
      }
      if(userJson.relationship != null){
        document.getElementById("relationship").value = userJson.relationship;
      }
      if(userJson.address.streetAddress != null){
        document.getElementById("address").value = userJson.address.streetAddress;
      }
      if(userJson.address.locality != null){
        document.getElementById("city").value = userJson.address.locality;
      }
      if(userJson.address.region != null){
        document.getElementById("state").value = userJson.address.region;
      }
      if(userJson.address.postalCode != null){
        document.getElementById("zip").value = userJson.address.postalCode;
      }
    } else {
      document.getElementById("Hello").value = 'Welcome Guest';
    }
    console.log(userJson.username);
  
    //let idPayload = parseJwt(idToken);
  }


function updateUserValues(){
  console.log("updateUserValues was called");
  let method = "PATCH";
  let user = Cookies.get("userAPIid");
  let at = "Bearer " + Cookies.get("accessToken");
  let url = apiUrl + "/environments/" + environmentID + "/users/" + user;
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
  console.log(payload);
  console.log('ajax (' + url + ')');
  console.log('at =' + at);
  console.log("make ajax call");
  $.ajax({
      async: "true",
      url: url,
      method: method,
      dataType: 'json',
      contentType: 'application/json',
      data: payload,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', at);
      }
    }).done(function(data) {
      console.log(data);
    })
    .fail(function(data) {
      console.log('ajax call failed');
      console.log(data);
      $('#warningMessage').text(data.responseJSON.details[0].message);
      $('#warningDiv').show();
    });
  //add brief delay so info is populated
  setTimeout(function() {
    getUserValues();
  }, 1000);
}


function updatePassword(){
  console.log("updatePassword was called");
  let method = "PUT";
  let user = Cookies.get("userAPIid");
  let at = "Bearer " + Cookies.get("accessToken");
  let url = apiUrl + "/environments/" + environmentID + "/users/" + user + "/password";
  let payload = JSON.stringify({
    currentPassword: $('#currentPass').val(),
    newPassword: $('#newPass').val()
  });
  console.log(payload);
  console.log('ajax (' + url + ')');
  console.log('at =' + at);
  console.log('user = ' + user);
  console.log("make ajax call");
  $.ajax({
      async: "true",
      url: url,
      method: method,
      dataType: 'json',
      contentType: 'application/vnd.pingidentity.password.reset+json',
      data: payload,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', at);
      }
    }).done(function(data) {
      console.log(data);
    })
    .fail(function(data) {
      console.log('ajax call failed');
      console.log(data);
      $('#warningMessage').text(data.responseJSON.details[0].message);
      $('#warningDiv').show();
    });
  //add brief delay so info is populated
  setTimeout(function() {
    getUserValues();
  }, 1000);
}