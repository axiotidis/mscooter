var userEmail ="";
var userPhone =0;
var userPayment = "";
var userFname = "";
var userLname = "";
var userBday = ""; 
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
	userPhone = data.phone;
	userPayment = data.payment;
	userFname = data.fname;
	userLname = data.lname;
	userBday = data.bday;
	document.getElementById("email").value = userEmail;
	document.getElementById("phone").value = userPhone;
	document.getElementById("payment").value = userPayment;
	document.getElementById("fname").value = userFname;
	document.getElementById("lname").value = userLname;
	document.getElementById("bday").value = userBday;
}

function errData(error){
	console.log(error.message , error.code);
}


  //Reference messages collection
  var usersRef = firebase.database().ref('users');
  
  

//Listen for form submit
document.getElementById('profileForm').addEventListener('submit', submitForm);

//Submit form
function submitForm(e){
    e.preventDefault();
  
    //Get values
    var email = getInputVal('email');
    var phone = getInputVal('phone');
    var payment = getInputVal('payment');
    var fname = getInputVal('fname');
    var lname = getInputVal('lname');
    var bday = getInputVal('bday');
	
	var today = new Date();
    var difference = (today.getFullYear() - bday.substring(0,4));
    if (difference > 17){
	

    
    // update user details
    updateDetails(email, phone, payment, fname, lname, bday);

    //Show alert
    document.querySelector('.alert').style.display = 'block';

    //Hide alert after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
    },2000);

    //Clear form
    document.getElementById('profileForm').reset();

    setTimeout(function(){
        document.querySelector('.continue').style.display = 'block';
    },2000);

    setTimeout(function(){
        document.querySelector('.continue').style.display = 'none';
        window.location.replace("app.html");
    },4000);
	}else {
	alert("You must be adult to rent a scooter");
}
}



//Function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}

//Save the details to firebase
function updateDetails(email, phone, payment, fname, lname, bday){
    database.ref("users/" + dbKey).update({ 
	    email: email,
	    phone: phone,
	    payment: payment,
	    fname : fname,
	    lname : lname,
	    bday : bday
	});

}

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Τάσος', 'Χρίστος', 'Αλεξάνδρα', 'Μιχάλης', 'Περικλής', 'Γιώργος'],
        datasets: [{
            label: 'This week\'s scoring board',
            data: [6, 4, 7, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
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
