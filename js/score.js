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
	//console.log("Current user email = " + userEmail);
	//console.log("Current user nickname = " + userNickname);
	//console.log("Current user points = " + userPoints);
	
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
		

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'This week\'s scoring board',
            data: [],
            backgroundColor: [],
            borderColor: [],
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
for (var i = 0; i < numberOfUsers; ++i){
		if (usersArray[i].nickname == userNickname){
			myChart.data.labels.push(usersArray[i].nickname + " (You)");
			myChart.data.datasets.forEach((dataset) => {
				dataset.backgroundColor.push('rgba(255, 99, 132, 0.2)');
		});
			myChart.data.datasets.forEach((dataset) => {
				dataset.borderColor.push('rgba(255, 99, 132, 0.2)');
		});
			idUser = i;
		}else {
		myChart.data.labels.push(usersArray[i].nickname);
		myChart.data.datasets.forEach((dataset) => {
			dataset.backgroundColor.push('rgba(54, 162, 235, 0.2)');
		});
		myChart.data.datasets.forEach((dataset) => {
				dataset.borderColor.push('rgba(54, 162, 235, 0.2)');
		});
		}
		myChart.data.datasets.forEach((dataset) => {
			dataset.data.push(usersArray[i].points);
		});
		//console.log("User " + currentNickname + " have " + currentPoints + " points");
		
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



