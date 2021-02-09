



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
    document.getElementById("fname").innerHTML = userJson.name.given;
    document.getElementById("lname").innerHTML = userJson.name.family;
    document.getElementById("email").innerHTML = userJson.email;
    document.getElementById("username").innerHTML = userJson.username;
    document.getElementById("birthday").innerHTML =  userJson.birthday; 
    document.getElementById("gender").innerHTML = userJson.gender;
    document.getElementById("relationship").innerHTML = userJson.relationship;
    document.getElementById("address").innerHTML = userJson.streetAddress;
    document.getElementById("city").innerHTML = userJson.city;
    document.getElementById("state").innerHTML = userJson.state;
    document.getElementById("zip").innerHTML = userJson.zip;


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
          document.getElementById("fname").value = userJson.name.given;
        }
        if(userJson.name.family){
        document.getElementById("lname").value = userJson.name.family;
        }
      }
      document.getElementById("email").value = userJson.email;
      document.getElementById("username").value = userJson.username;
      document.getElementById("birthday").value =  userJson.birthday; //need to understand which attributes we are saving
      document.getElementById("gender").value = userJson.gender;
      document.getElementById("relationship").value = userJson.relationship;
      document.getElementById("address").value = userJson.address.streetAddress;
      document.getElementById("city").value = userJson.address.locality;
      document.getElementById("state").value = userJson.address.region;
      document.getElementById("zip").value = userJson.address.postalCode;
    } else {
      document.getElementById("username").value = 'Welcome Guest';
    }
  
    //let idPayload = parseJwt(idToken);
  }
