var userEmail ="";
var userNickname = ""; 
var userPoints  = 0;		
var dbKey ="";

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
	userEmail = data.email;
	userNickname = data.nickname;
	userPoints = data.points;
	console.log("Current user email = " + userEmail);
	console.log("Current user nickname = " + userNickname);
	console.log("Current user points = " + userPoints);
	
	var idUser = 0;
	var usersArray = [];
	// Get a database reference to the users section
    var ref = firebase.database().ref().child("users");
	ref.on('value', function(snapshot) {
    //console.log(snapshotToArray(snapshot));
	usersArray = snapshotToArray(snapshot);
	//console.log(usersArray);
	var numberOfUsers = usersArray.length;
	//console.log("There are " + numberOfUsers + "  registered users");
	var stringOfNicknames = "";
	var stringOfPoints = "";
	
	for (var i = 0; i < numberOfUsers; ++i){
		if (usersArray[i].nickname == userNickname){
			stringOfNicknames = stringOfNicknames.concat(usersArray[i].nickname + " (You) " + ", ");
			idUser = i;
		}else {
		stringOfNicknames = stringOfNicknames.concat(usersArray[i].nickname + ", ");
		}
		stringOfPoints = stringOfPoints.concat(usersArray[i].points + ", ");
		//console.log("User " + currentNickname + " have " + currentPoints + " points");
		
	}
	console.log(stringOfNicknames);
	console.log(stringOfPoints);
	console.log("User ID = " + idUser);
});
	

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [stringOfNicknames],
        datasets: [{
            label: 'This week\'s scoring board',
            data: [stringOfPoints],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
				'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
				'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

}

function errData(error){
	console.log(error.message , error.code);
}

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};



