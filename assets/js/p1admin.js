function adminGetUser(){
    //{{apiPath}}/environments/{{envID}}/users/?filter=username%20eq%20%22lsmith%22
    console.log('adminGetUser called');
    let method = "GET";
    let user = document.getElementById('username').value;
    console.log(user);
    let at = "Bearer " + Cookies.get("accessToken");
    let url = apiUrl + "/environments/" + environmentId + "/users/?filter=username%20eq%20%22" + user + "%22";
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
    console.log("adminGetUser completed")
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