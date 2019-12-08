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
    type: 'horizontalBar',
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
				// Elements options apply to all of the options unless overridden in a dataset
				// In this case, we are setting the border of each horizontal bar to be 2px wide
				elements: {
					rectangle: {
						borderWidth: 2,
						}
					},
					responsive: true,
					legend: {
						position: 'right',
					},
					title: {
						display: true,
						text: 'This week\'s scoring board'
					}
				}
});
		
for (var i = 0; i < numberOfUsers; ++i){
		if (usersArray[i].nickname == userNickname){
			myChart.data.labels.push(usersArray[i].nickname + " (You)");
			myChart.update();
			myChart.data.datasets.forEach((dataset) => {
				dataset.backgroundColor.push('rgba(255, 102, 0, 1)');	//red bar for current user
			});
			myChart.update();
			myChart.data.datasets.forEach((dataset) => {
				dataset.borderColor.push('rgba(255, 102, 0, 0.2)');
			});
			myChart.update();
			idUser = i;
		}else {
			myChart.data.labels.push(usersArray[i].nickname);
			myChart.update();
			myChart.data.datasets.forEach((dataset) => {
				dataset.backgroundColor.push('rgba(0, 151, 70, 1)');
			});
			myChart.update();
			myChart.data.datasets.forEach((dataset) => {
				dataset.borderColor.push('rgba(0, 151, 70, 0.2)');
		});
			myChart.update();
		}
		myChart.data.datasets.forEach((dataset) => {
			dataset.data.push(usersArray[i].points);
		});
		myChart.update();
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



