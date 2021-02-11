function adminGetUser(){
    //{{apiPath}}/environments/{{envID}}/users/?filter=username%20eq%20%22lsmith%22
    console.log('adminGetUser called');
    let method = "GET";
    if(type == 'email'){
      let value = document.getElementById('email').value;
    }
    if(type == 'passID'){
      let value = document.getElementById('PassID').value;
    }
    console.log(value);
    let at = "Bearer " + Cookies.get("workerAT");
    let url = apiUrl + "/environments/" + environmentID + "/users/?filter=" + type + "%20eq%20%22" + value + "%22";
    console.log('ajax (' + url + ')');
    console.log('at =' + at);
    console.log("make ajax call");
    $.ajax({
      async: "true",
      url: url,
      method: method,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', at);
      }
    }).done(function(response) {
      console.log('response '+response);
      adminSetUserValues(response);
    });
    console.log("adminGetUser completed");
  }


  function adminSetUserValues(userJson) {
    console.log("adminsetuserValues was called");
    console.log(userJson);
    console.log(userJson._embedded.users[0].id);
    Cookies.set('currentUser', userJson._embedded.users[0].id);
    if (Cookies.get("accessToken")) {
      document.getElementById("user").value = 'Hello ' + userJson._embedded.users[0].username + "!";
      document.getElementById("fname").value = userJson._embedded.users[0].name.given;
      document.getElementById("lname").value = userJson._embedded.users[0].name.family;
      document.getElementById("email").value = userJson._embedded.users[0].email;
      document.getElementById("username").value = userJson._embedded.users[0].username;
      //document.getElementById("address").innerHTML=streetAddress;
    } else {
      document.getElementById("username").innerHTML = 'Welcome Guest';
    }
  }

  function getWorkerAccessToken() {
    console.log("getWorkerAT called")
    var settings = {
      "url": "https://auth.pingone.com/ca3ad373-df71-4eb5-a3b5-76439336e1d6/as/token",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "grant_type": "client_credentials",
        "client_id": "43bcef4e-95b2-4eab-a354-2cb7bc80430f",
        "client_secret": "5I_PgI1Xgl7f0OvIohFuo7tt-.OKO68ReaV2SdlOc.qtNNH8re5X1GMgmZfKEjgc"
      }
    };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    setCookies(response);
  });
}

function setCookies(data){
  console.log("setcookie Called");
  console.log(data.access_token);
  let at = data.access_token;
  console.log('at is: ' + at);
  Cookies.set('workerAT', at, { sameSite: 'strict' });
}