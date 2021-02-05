



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
          document.getElementById("fname").value = userJson.name.given;
        }
        if(userJson.name.family){
        document.getElementById("lname").value = userJson.name.family;
        }
      }
      document.getElementById("email").value = userJson.email;
      document.getElementById("username").value = userJson.username;
      //document.getElementById("address").innerHTML=streetAddress;
    } else {
      document.getElementById("username").innerHTML = 'Welcome Guest';
    }
  
    //let idPayload = parseJwt(idToken);
  }