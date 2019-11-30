
var basemap = new L.TileLayer(baseUrl, {maxZoom: 17, attribution: baseAttribution, subdomains: subdomains, opacity: opacity});

var lat = 0;		//set initial value latitude
var lng = 0;		//set initial value lognitude
var zoom = 15;		//set zoom level
var myPosition = 0;	//set an initial value of user's location
var range = 10;		//set default range to 10km
var indx = 0;		//set the array index
var poi = [];		//this array holds the marker's details

var greenIcon = L.icon({			//set a personal marker icon
	iconUrl: 'img/leaf-green.png',
	shadowUrl: 'img/leaf-shadow.png',

	iconSize:     [38, 95], // size of the icon
	shadowSize:   [50, 64], // size of the shadow
	iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

//center and zoom map in a position found by geolocation
var center = new L.LatLng(lat, lng);
//var map = new L.map('map', {center: center, zoomControl: false, maxZoom: maxZoom, layers: [basemap] });
var map = new L.map('map', {center: center, zoomControl: false, minZoom: 0, maxZoom: 50, layers: [basemap] });
var popup = L.popup();

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  }


function setPosition(position) {
  lat = position.coords.latitude.toString();		//find latitude
  lng = position.coords.longitude.toString();		//find lognitude
  var marker = new L.marker([lat, lng], {icon: greenIcon}).addTo(map);	//set a marker in current geoposition
  
  map.setView([lat, lng], zoom);
  
}




function onLocationFound(e) {
        //do nothing
	
    }

    function onLocationError(e) {
        alert(e.message);
    }

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);


    

    

