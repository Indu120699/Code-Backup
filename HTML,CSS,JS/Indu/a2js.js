var studentimg = document.getElementById("studentimage");
var sname = document.getElementById("studentname");
var fname = document.getElementById("father'sname");
var mname = document.getElementById("mother'sname");
var gen = document.getElementsByName("Gender");
var date = document.getElementById("dateofbirth");
var mail = document.getElementById("email");
var level = document.getElementById("level");
var dept = document.getElementById("department");

function validateform() {
  // validation for image
  if (studentimg.value == "") {
    document.getElementById("simage_err").innerHTML = "Field should be select";
    studentimg.style.border = "1px solid red";
    document.getElementById("simage").style.visibility = "visible";
    return false;
  }
  else {
    document.getElementById("simage_err").innerHTML = "";
    studentimg.style.border = "1px solid black";
    document.getElementById("simage").style.visibility = "hidden";
  }

  // validation for studentname
  if (sname.value == "") {
    document.getElementById("sname_err").innerHTML = "Enter name";
    sname.style.border = "1px solid red";
    document.getElementById("sname").style.visibility = "visible";
    return false;
  }
  else {
    document.getElementById("sname_err").innerHTML = "";
    sname.style.border = "1px solid black";
    document.getElementById("sname").style.visibility = "hidden";
  }

  // validation for fathername
  if (fname.value == "") {
    document.getElementById("fname_err").innerHTML = "Enter Fathername";
    fname.style.border = "1px solid red";
    document.getElementById("fname").style.visibility = "visible";
    return false;
  }
  else {
    document.getElementById("fname_err").innerHTML = "";
    fname.style.border = "1px solid black";
    document.getElementById("fname").style.visibility = "hidden";
  }

  // validation for mothername
  if (mname.value == "") {
    document.getElementById("mname_err").innerHTML = "Enter Mothername";
    mname.style.border = "1px solid red";
    document.getElementById("mname").style.visibility = "visible";
    return false;
  }
  else {
    document.getElementById("mname_err").innerHTML = "";
    mname.style.border = "1px solid black";
    document.getElementById("mname").style.visibility = "hidden";
  }

  // validation for radios
  var error = false;
  var i = 0;
  if (!error) {
    for (i = 0; i < gen.length; i++) {
      if (gen[i].checked) {
        error = true;
        i++;
      }
    }
  }
  if (!error) {
    document.getElementById("gender_err").innerHTML = "please select one of the gender";
  }
  else {
    document.getElementById("gender_err").innerHTML = " ";
  }

  //  validation for date
  if (date.value == "") {
    document.getElementById("dob_err").innerHTML = "Fill the date";
    date.style.border = "1px solid red";
    return false;
  }
  else {
    document.getElementById("dob_err").innerHTML = "";
    date.style.border = "1px solid black";
  }

  // validation for mail
  if (mail.value == "") {
    document.getElementById("email_err").innerHTML = "Enter your mail";
    mail.style.border = "1px solid red";
    document.getElementById("mail").style.visibility = "visible";
    return false;
  }
  else {
    document.getElementById("email_err").innerHTML = "";
    mail.style.border = "1px solid black";
    document.getElementById("mail").style.visibility = "hidden";
  }

  //validation for level
  if (level.value == "") {
    document.getElementById("level_err").innerHTML = "Field can't be empty";
    level.style.border = "1px solid red";
    return false;
  }
  else {
    document.getElementById("level_err").innerHTML = "";
    level.style.border = "1px solid black";
  }

  //validation for department
  if (dept.value == "") {
    document.getElementById("department_err").innerHTML = "Field can't be empty";
    dept.style.border = "1px solid red";
    return false;
  }
  else {
    document.getElementById("department_err").innerHTML = "";
    dept.style.border = "1px solid black";
  }
}
