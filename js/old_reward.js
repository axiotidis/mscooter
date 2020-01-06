var userPoints = 0;
var rewardPoints = 10;
var doUpdate;

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
    //read user details
    readUserData(email);
  } else {
    location.replace("signin.html");
  }
});


//find user's records based on email address
function readUserData(email){
	var ref = firebase.database().ref("users");
	ref.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
		//console.log(snapshot.key);
	dbKey = snapshot.key;	
	let ref = database.ref("users/" + dbKey); 
	ref.on("value" , gotData , errData);
	});
	
}	

function gotData(data){
	data = data.val();
	if(!doUpdate){
		doUpdate = true;
		userPoints = data.points;
		userPoints = +userPoints + +rewardPoints;
		//alert("userPoints = " + userPoints);
		updateDetails(userPoints);
	}
}

function errData(error){
	console.log(error.message , error.code);
}

function errData(error){
	console.log(error.message , error.code);
}


  //Reference messages collection
  var usersRef = firebase.database().ref('users');
  


//Save the details to firebase
function updateDetails(points){
    database.ref("users/" + dbKey).update({ 
	    points : points
	});

}

