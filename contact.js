//Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

//Submit form
function submitForm(e){
    e.preventDefault();
  
    //Get values
    var fName = getInputVal('fName');
    var lName = getInputVal('lName');
    var email = getInputVal('email');
    var subject = getInputVal('subject');
    var message = getInputVal('message');

    

    //Show alert
    document.querySelector('.alert').style.display = 'block';

    //Hide alert after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
    },2000);

    //Clear form
    document.getElementById('contactForm').reset();

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
