var rewardPoints;
var poiPoints;
var doUpdate;
var dbKey;
var lat;
var lng;
var rwPoints;

var basemap = new L.TileLayer(baseUrl, {maxZoom: 19, attribution: baseAttribution, subdomains: subdomains, opacity: opacity});

var klat = 41.11954131584224;		//set initial value latitude
var klng = 25.399789810180664;		//set initial value lognitude
var poiLat = 0;		//set initial value latitude for poi
var poiLng = 0;		//set initial value lognitude for poi
var poiTxt = "";
var poiPic = "";

var sLat = 0;
var sLng = 0;
var sBat = 0;
var sBooked = "";
var sId = 0;

var zoom = 16;		//set zoom level
var myPosition = 0;	//set an initial value of user's location


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDU1RPg4avyJA4Dv4DCGtGb2nnne8FZCfk",
    authDomain: "escooter-d43d9.firebaseapp.com",
    databaseURL: "https://escooter-d43d9.firebaseio.com",
    projectId: "escooter-d43d9",
    storageBucket: "escooter-d43d9.appspot.com",
    messagingSenderId: "27699640672",
    appId: "1:27699640672:web:05eb2d79cca519e28d4605",
    measurementId: "G-F2V4WNEBRW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Get a reference to the database service
  let database = firebase.database();

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    user = firebase.auth().currentUser;
    var email = user.email;
    var name = user.name;
    if (email != null){
      //var message = 'Welcome user ' + email;
      //alert(message);
    }else if(name != null){
      //var message = 'Welcome user ' + name;
      //alert(message);
    }
    
  } else {
    location.replace("signin.html");
  }
});






var redIcon = L.icon({			//set a marker icon for current location of user
	iconUrl: 'pics/red_pin.png',
	//shadowUrl: 'img/leaf-shadow.png',

	iconSize:     [38, 46], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	//popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	popupAnchor:  [-6, -86] // point from which the popup should open relative to the iconAnchor
});

var redScooter = L.icon({			//set a marker icon for booked scooters
	iconUrl: 'pics/red_scooter.png',
	//shadowUrl: 'img/leaf-shadow.png',

	iconSize:     [34, 41], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	//popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	popupAnchor:  [-6, -86] // point from which the popup should open relative to the iconAnchor
});

var greenScooter = L.icon({			//set a marker icon for free scooters
	iconUrl: 'pics/green_scooter.png',
	//shadowUrl: 'img/leaf-shadow.png',

	iconSize:     [34, 41], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	//popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	popupAnchor:  [-6, -86] // point from which the popup should open relative to the iconAnchor
});

var poiIcon = L.icon({			//set a marker icon for pois
	iconUrl: 'pics/poi.png',
	//shadowUrl: 'img/leaf-shadow.png',

	iconSize:     [38, 46], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	//popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	popupAnchor:  [-6, -86] // point from which the popup should open relative to the iconAnchor
});
//center and zoom map in a position found by geolocation
var center = new L.LatLng(klat, klng);
//var map = new L.map('map', {center: center, zoomControl: false, maxZoom: maxZoom, layers: [basemap] });
var map = new L.map('map', {center: center, zoomControl: false, minZoom: 0, maxZoom: 50, layers: [basemap] });
var popup = L.popup();

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  }


function setPosition(position) {
  lat = position.coords.latitude.toString();		//find latitude
  lng = position.coords.longitude.toString();		//find lognitude
  var marker = new L.marker([lat, lng], {icon: redIcon}).addTo(map);	//set a marker in current geoposition
  var mypopup = "You are here";
  map.setView([lat, lng], zoom);			//Zoom map in the current geoposition
  marker.bindPopup(mypopup);

  
}

var i;
for (i = 0; i < 11; i++) {
  	let ref = database.ref("poi/" +i); 
	ref.on("value" , gotData , errData);
} 

var j;
for (j = 0; j < 6; j++) {
  	let ref = database.ref("scooters/" +j); 
	ref.on("value" , gotSdata , errSdata);
} 

function gotData(data){
	data = data.val();
	poiLat = data.Lat;
	poiLng = data.Log;
	poiPic = data.Pic;
	poiTxt = data.name;
	poiPoints = data.points;
	
	var marker = new L.marker([poiLat, poiLng], {icon: poiIcon}).addTo(map);	//set a marker in current geoposition
  	var mypopup = "<img src=" + poiPic + ">";		//prepare a custom popup 
	mypopup += "<br><br><b>";
	mypopup += poiTxt;
	mypopup += "</b>";
	marker.bindPopup(mypopup);


	
	tempDistance = getDistance([lat, lng], [poiLat, poiLng]).toFixed(2);		//find the distance between current possition and POIs
	distance = Math.abs(tempDistance);
	
	//if (distance < 1.08){														 
		//console.log("The disttance from "+poiTxt+" is "+distance+" meters");	
	if (distance < 0.03){															//if the distance is less than 30 m from POI get reward
		user = firebase.auth().currentUser;
		email = user.email;
		rwPoints = poiPoints;
		alert("Congratulations! You are in a cultural point of interest named " + poiTxt + " your reward is " + rwPoints + " points");
		readUserData(email);
	}



}

function readUserData(email){
	var ref = firebase.database().ref("users");
	ref.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
		//console.log(snapshot.key);
	dbKey = snapshot.key;	
	let ref = database.ref("users/" + dbKey); 
	ref.on("value" , gotUserData , errData);
	});
	
}

function gotUserData(data){
	data = data.val();
	userEmail = data.email;
	userPoints = data.points;
	if(!doUpdate){
		var ref = firebase.database().ref("users");
		ref.orderByChild("email").equalTo(userEmail).on("child_added", function(snapshot) {
		//console.log(snapshot.key);
		dbKey = snapshot.key;
		doUpdate = true;
		userPoints = data.points;
		//console.log("userPoints before = " + userPoints);
		userPoints = +userPoints + +rwPoints;
		//console.log("You earned  " + rwPoints + " points for this place");
		//console.log("userPoints now = " + userPoints);
		//console.log("dbKey = " + dbKey);
		updateDetails(userPoints, dbKey);	 
	});
		
	}

}

function errData(error){
	console.log(error.message , error.code);
}

//Save the details to firebase
function updateDetails(points, dbKey){
    database.ref("users/" + dbKey).update({ 
	    points : points
	});

}

var available = "";
function gotSdata(sdata){
	sdata = sdata.val();
	sLng = sdata.Log;
	sLat = sdata.Lat;
	sBat = sdata.Bat;
	sBooked = sdata.Booked;
	sId = sdata.ID;
	
	
	if (sBooked == "No"){
		var marker = new L.marker([sLat, sLng], {icon: greenScooter}).addTo(map);	//set a marker in current geoposition
		available = "Yes";
		
	
  	var mypopup = "<b>";		//prepare a custom popup 
	mypopup += "SN: kom" + sId;
	mypopup += "</b><br><br><b>";
	mypopup += "Available: " + available;
	mypopup += "</b><br><b>";
	mypopup += "Battery: " + sBat +"%";
	mypopup += "</b><br><b>";
	mypopup += "1 EURO to unlock";
	mypopup += "</b><br><b>";
	mypopup += "+";
	mypopup += "</b><br><b>";
	mypopup += "0.15 EURO/min";
	mypopup += "</b><br>";
	marker.bindPopup(mypopup);
		
	} else {
		var marker = new L.marker([sLat, sLng], {icon: redScooter}).addTo(map);	//set a marker in current geoposition
		available = "No";
		var mypopup = "<b>";		//prepare a custom popup 
		mypopup += "SN: kom" + sId;
		mypopup += "</b><br><br><b>";
		mypopup += "Available: " + available;
		mypopup += "</b><br>";
		marker.bindPopup(mypopup);
		
	}


}

function getDistance(origin, destination) {
    // return distance in m
    var lon1 = toRadian(origin[1]);
    var lat1 = toRadian(origin[0]);
    var lon2 = toRadian(destination[1]);
    var lat2 = toRadian(destination[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS;
}

function toRadian(degree) {
    return degree*Math.PI/180;
}

function bookFunction(){
	var bookMessage = 'The e-scooter is booked successfully.\rSend free sms to 6912345678with:\rUNLOCK + sn (e.g. UNLOCK kom1) to start the ride,\rPAUSE + sn to pause the ride for a while or\rLOCK + sn to stop and pay for the ride.';

	alert(bookMessage);
}

function errSdata(error){
	console.log(error.message , error.code);
}  



  
function onLocationFound(e) {
        //do nothing
	
    }

    function onLocationError(e) {
        alert(e.message);
    }



map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);


    

    

