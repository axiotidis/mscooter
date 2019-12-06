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



function readUserData(email){
	var ref = firebase.database().ref('users');
	ref.orderByChild('email').equalTo(email).on("value", function(snapshot) {
		snapshot.forEach((function(child) { console.log(child.key) }); 
	});
}	

/*********************************************************
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
    var password = getInputVal('password');
    var payment = getInputVal('payment');
    

    // Save message
    saveUser(email, password);
    saveMessage(email, phone, payment);

    //Show alert
    document.querySelector('.alert').style.display = 'block';

    //Hide alert after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
    },2000);

    //Clear form
    document.getElementById('profilepForm').reset();

    setTimeout(function(){
        document.querySelector('.continue').style.display = 'block';
    },2000);

    setTimeout(function(){
        document.querySelector('.continue').style.display = 'none';
        window.location.replace("app.html");
    },4000);

}



//Function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}

//Save the massage to firebase
function saveMessage(email, phone, payment){
    var newUsersRef = usersRef.push();
    newUsersRef.set({
        email: email,
        phone: phone,
        payment: payment
    });
}
function saveUser(email, password){
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	      
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		
		// [START_EXCLUDE]
		if (errorCode == 'auth/weak-password') {		  
			alert('The password is too weak.');
		}else {
			alert(errorMessage);
		}
			console.log(error);
			// [END_EXCLUDE]
		
	
});
}      // [END createwithemail]
***********************************************************************/
