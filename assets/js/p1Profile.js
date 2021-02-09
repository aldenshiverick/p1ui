
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
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', at);
      }
    }).done(function(response) {
      console.log(response);
      setUserValues(response);
    });
  // document.getElementById("fname").innerHTML = userJson.name.given;
  // document.getElementById("lname").innerHTML = userJson.name.family;
  // document.getElementById("email").innerHTML = userJson.email;
  // document.getElementById("username").innerHTML = userJson.username;
  // document.getElementById("birthday").innerHTML =  userJson.birthday; 
  // document.getElementById("gender").innerHTML = userJson.gender;
  // document.getElementById("relationship").innerHTML = userJson.relationship;
  // document.getElementById("address").innerHTML = userJson.address.streetAddress;
  // document.getElementById("city").innerHTML = userJson.address.locality;
  // document.getElementById("state").innerHTML = userJson.address.region;
  // document.getElementById("zip").innerHTML = userJson.address.postalCode;


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
      document.getElementById("Hello").innerHTML = 'Welcome User ' + userJson.username;
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
      if(userJson.address.postelCode != null){
        document.getElementById("zip").value = userJson.address.postalCode;
      }
    } else {
      document.getElementById("Hello").value = 'Welcome Guest';
    }
    console.log(userJson.username);
  
    //let idPayload = parseJwt(idToken);
  }


