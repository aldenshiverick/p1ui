



function getUserValues() {
    console.log('getUserValues called');
    let method = "GET";
    let user = Cookies.get("uuid");
    let at = "Bearer " + Cookies.get("accessToken");
    let url = apiUrl + "/environments/" + environmentId + "/users/" + user;
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
      console.log(response);
      setUserValues(response);
    });
    console.log("getUserValues completed")
  
  }
  
  function setUserValues(userJson) {
    console.log("setuserValues was called");
    console.log(userJson);
    let uuid = Cookies.get('uuid');
    //let streetAddress = userJson.address.streetAddress + " " + userJson.address.locality + ", " + userJson.address.region + " " + userJson.address.postalCode;
    if (Cookies.get("accessToken")) {
      if(userJson.name){
        if(userJson.name.given){
          console.log("givenname if was passes")
          document.getElementById("user").value = 'Hello ' + userJson.name.given + "!";
          document.getElementById("fname").innerHTML = userJson.name.given;
        }
        if(userJson.name.family){
        document.getElementById("lname").innerHTML = userJson.name.family;
        }
      }
      document.getElementById("email").innerHTML = "userJson.email";
      document.getElementById("username").innerHTML = userJson.username;
      document.getElementById("birthday").innerHTML =  userJson.birthday; //not sure if this is correct!!!!
      document.getElementById("gender").innerHTML = userJson.gender;
      document.getElementById("relationship").innerHTML = userJson.relationship;
      document.getElementById("address").innerHTML = userJson.streetAddress;
      document.getElementById("city").innerHTML = userJson.city;
      document.getElementById("state").innerHTML = userJson.state;
      document.getElementById("zip").innerHTML = userJson.zip;
    } else {
      document.getElementById("username").innerHTML = 'Welcome Guest';
    }
  
    //let idPayload = parseJwt(idToken);
  }
