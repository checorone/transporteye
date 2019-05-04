var token = "";

function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}
 
function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}
function req() {
        var uri = "transportservice/api/v1/transport";
        
        headerstr = "URL: " + uri + "\n" + "Method: GET\n Headers:\n" 
				+ "Authorization: Bearer " + token;
        
        setTextBox("request", headerstr, "Empty body for GET");
        
        function reqCallback () {
        	var obj = JSON.parse(req.responseText);
        	setTextBox("response", "Status: " + req.status + " " + req.statusText + "\n"
        			+ req.getAllResponseHeaders(), JSON.stringify(obj,null,2));
        	token = obj["access_token"];
          
        }

        var req = new XMLHttpRequest();
        req.onload = reqCallback;
        req.open("GET", uri, true);
        req.setRequestHeader("Authorization", 'Bearer ' + token);
        req.send();
}

function auth() {
        var login = document.getElementById("login").value;
        var passwd = document.getElementById("pass").value;

        var formData = new FormData();
        formData.append("grant_type", "password");
        formData.append("scope", "webclient");
        formData.append("username", login);
        formData.append("password", passwd); 

        var uri = "/authservice/oauth/token";

        var headerstr = "URL: " + uri + "\n" + "Method: POST\n Headers:\n" 
            + "Authorization: Basic " + btoa("netcracker" + ":" + "ncpassword");
        var object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        var bodystr = JSON.stringify(object,null, 2);
        setTextBox("request", headerstr, bodystr);

        function reqCallback () {
        	var obj = JSON.parse(req.responseText);
        	setTextBox("response", "Status: " + req.status + " " + req.statusText + "\n"
        			+ req.getAllResponseHeaders(), JSON.stringify(obj,null,2));
        	token = obj["access_token"];
          
        }

        var req = new XMLHttpRequest();
        req.onload = reqCallback;
        req.open("POST", uri, true);
        req.setRequestHeader("Authorization", 'Basic ' + btoa("netcracker" + ":" + "ncpassword"));
        req.send(formData);

        //FETCH api использует CORS, который пока не реализован
        // var headers = new Headers();
        // headers.set('Authorization', 'Basic ' + btoa("netcracker" + ":" + "ncpassword"));
        // headers.set('Accept', '*/*');

        // var request = new Request("http://localhost:8901/auth/oauth/token", {method: 'POST', credentials: 'include', headers: headers, body: formData});

        // fetch(request).then(function(response) {
        //     str = "URL: " + response.url + "\tStatus: " + response.status + "\tStatusText: " + response.statusText + "\t";
        //     for (var pair of response.headers.entries())
        //         str += pair[0]+ ': '+ pair[1] + "\n";
        //     document.getElementById("resp-headers").textContent = str;
        //     return response.text();
        // }).then(function(text) {
        //     document.getElementById("resp-body").textContent = text;
        // }).catch(error => {
        //     str = "URL: " + request.url;
        //     document.getElementById("resp-headers").textContent = str;
        //     document.getElementById("resp-body").textContent = "401 : Unathorized";
        // });
}

function setTextBox(type, header, body) {
  switch(type) {
    case "request":
        document.getElementById("req-headers").textContent = header;
        document.getElementById("req-body").textContent = body;
        break;
    case "response":
        document.getElementById("resp-headers").textContent = header;
        document.getElementById("resp-body").textContent = body;
        break;
  }

  var myMap;

//Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {
   // Создание экземпляра карты и его привязка к контейнеру с
   // заданным id ("map").
	alert("Loaded");
   myMap = new ymaps.Map('map', {
       // При инициализации карты обязательно нужно указать
       // её центр и коэффициент масштабирования.
       center: [55.76, 37.64], // Москва
       zoom: 10
   }, {
       searchControlProvider: 'yandex#search'
   });

   document.getElementById('destroyButton').onclick = function () {
       // Для уничтожения используется метод destroy.
       myMap.destroy();
   };

}
}