class formvalidation 
{
  formvalues=
    {
      username: "", 
      gender: "", 
      email: "", 
      phonenumber: "", 
      address: "", 
      course: "", 
      language: "",
      password: "", 
      confirmpassword: ""
    }
  errorvalues=
    {
      usernameerr: "", 
      gendererr: "",  
      emailerr: "", 
      phonenumbererr: "", 
      addresserr: "",
      courseerr: "", 
      languageerr: "",
      passworderr: "", 
      confirmpassworderr: ""
    }
  showerrormsg(index,msg)
  {
    const form_field = document.getElementsByClassName('formfield')[index];
    form_field.classList.add('error');
    form_field.getElementsByTagName('span')[0].textContent = msg;
  }
  showsuccessmsg(index) 
  {
    const form_field = document.getElementsByClassName('formfield')[index];
    form_field.classList.remove('error');
    form_field.classList.add('success');
  }
  getinputs()
  {
    this.formvalues.username = document.getElementById('username').value.trim();
    this.formvalues.gender = document.getElementsByName('gender');
    this.formvalues.email = document.getElementById('email').value.trim();
    this.formvalues.phonenumber = document.getElementById('phonenumber').value.trim();
    this.formvalues.address = document.getElementById('address').value.trim();
    this.formvalues.course = document.getElementById('course').value;
    this.formvalues.language = document.querySelectorAll('input[type="checkbox"]');
    this.formvalues.password = document.getElementById('password').value.trim();
    this.formvalues.confirmpassword = document.getElementById('confirmpassword').value.trim();
  }
  validateusername() 
  {
    if (this.formvalues.username === "") 
    {
      this.errorvalues.usernameerr = "Enter username";
      this.showerrormsg(0, this.errorvalues.usernameerr);
    }
    else if (this.formvalues.username.length <= 3) 
    {
      this.errorvalues.usernameerr = "Username must be atleast 4 characters";
      this.showerrormsg(0, this.errorvalues.usernameerr);
    }
    else if (this.formvalues.username.length > 10) 
    {
      this.errorvalues.usernameerr = "Username should not exceeds 10 characters";
      this.showerrormsg(0, this.errorvalues.usernameerr);
    }
    else 
    {
      this.errorvalues.usernameerr = "";
      this.showsuccessmsg(0);
    }
  }
  validategender() 
  {
    let gen= false;
    if (!gen) 
    {
      for (let i = 0; i < this.formvalues.gender.length; i++) 
      {
        if (this.formvalues.gender[i].checked) 
        {
          gen = true;
        }
      }
      if (!gen) 
      {
        this.errorvalues.gendererr = "Select gender";
        this.showerrormsg(1, this.errorvalues.gendererr);
      }
      else 
      {
        this.errorvalues.gendererr = "";
        this.showsuccessmsg(1);
      }
    }
  }
  validateemail() 
  {
    const regexp = /^([a-zA-Z0-9-_\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,10})(\.[a-zA-Z]{2,8})?$/;
    if (this.formvalues.email === "") 
    {
      this.errorvalues.emailerr = "Enter email";
      this.showerrormsg(2, this.errorvalues.emailerr);
    }
    else if (!(regexp.test(this.formvalues.email))) 
    {
      this.errorvalues.emailerr = "Invalid email";
      this.showerrormsg(2, this.errorvalues.emailerr);
    }
    else 
    {
      this.errorvalues.emailerr = "";
      this.showsuccessmsg(2);
    }
  }
  validatephonenumber() 
  {
    if (this.formvalues.phonenumber === "") 
    {
      this.errorvalues.phonenumbererr = "Enter phonenumber";
      this.showerrormsg(3, this.errorvalues.phonenumbererr);
    }
    else if (this.formvalues.phonenumber.length == 10) 
    {
      this.errorvalues.phonenumbererr = "";
      this.showsuccessmsg(3);
    }
    else
    {
      this.errorvalues.phonenumbererr = "Invalid phone number";
      this.showerrormsg(3, this.errorvalues.phonenumbererr);
    }
  }
  validateaddress()
  {
    if(this.formvalues.address==="")
    {
      this.errorvalues.addresserr="Enter Address";
      this.showerrormsg(4,this.errorvalues.addresserr);
    }
    else
    {
     this.errorvalues.addresserr="";
     this.showsuccessmsg(4);
    }
  }
  validatecourse() 
  {
    if (this.formvalues.course === "") 
    {
        this.errorvalues.courseerr = "Select course";
        this.showerrormsg(5, this.errorvalues.courseerr);
    }
    else 
    {
        this.errorvalues.courseerr = "";
        this.showsuccessmsg(5);
    }
  }
  validatelanguage()
  {
    let lang = false;
    this.formvalues.language.forEach(i =>{
    if(i.checked) 
    {
      lang=true;
    }
    })
    if(!lang)
    {
      this.errorvalues.languageerr = "Check any one of the languages";
      this.showerrormsg(6,this.errorvalues.languageerr);
    }
    else
    {
     this.errorvalues.languageerr = "";
     this.showsuccessmsg(6);
    }
  }
  validatepassword()
  {
    if (this.formvalues.password === "") 
    {
      this.errorvalues.passworderr = "Enter password";
      this.showerrormsg(7, this.errorvalues.passworderr);
    }
    else if (this.formvalues.password.length < 4) 
    {
      this.errorvalues.passworderr = "Password must be atleast 4 characters";
      this.showerrormsg(7, this.errorvalues.passworderr);
    }
    else if (this.formvalues.password.length > 10) 
    {
      this.errorvalues.passworderr = "Password should not exceeds 10 characters";
      this.showerrormsg(7, this.errorvalues.passworderr);
    }
    else 
    {
      this.errorvalues.passworderr = "";
      this.showsuccessmsg(7);
    }
  }
  validateconfirmpassword() 
  {
    if (this.formvalues.confirmpassword === "") 
    {
      this.errorvalues.confirmpassworderr = "Confirm password";
      this.showerrormsg(8, this.errorvalues.confirmpassworderr);
    }
    else if (this.formvalues.confirmpassword == this.formvalues.password) 
    {
      this.errorvalues.confirmpassworderr = "";
      this.showsuccessmsg(8);
    }
    else 
    {
      this.errorvalues.confirmpassworderr = "Password must match";
      this.showerrormsg(8, this.errorvalues.confirmpassworderr);
    }
  }
  alertmessage() 
  {
    const { usernameerr, gendererr, emailerr, phonenumbererr, addresserr, courseerr, languageerr, passworderr, confirmpassworderr } = this.errorvalues
    if (usernameerr === "" && gendererr === "" && emailerr === "" && phonenumbererr === "" && addresserr === ""
        && courseerr === "" && languageerr === "" && passworderr === "" && confirmpassworderr === "" )
        {
         swal("Registration successfull", "Thankyou," + this.formvalues.username, "success").then(() => {
          console.log(this.formvalues);
          this.removeinputs()})
        } 
        else 
        {
         swal("Give valid inputs", "Click ok to continue", "error")
        }
  }
  removeinputs() 
  {
    window.location.reload();
  }
}
const validateinputs = new formvalidation()
document.getElementsByClassName('forms')[0].addEventListener('submit', event => 
{
  event.preventDefault();
  validateinputs.getinputs();
  validateinputs.validateusername();
  validateinputs.validategender();
  validateinputs.validateemail();
  validateinputs.validatephonenumber();
  validateinputs.validateaddress();
  validateinputs.validatecourse();
  validateinputs.validatelanguage();
  validateinputs.validatepassword();
  validateinputs.validateconfirmpassword();
  validateinputs.alertmessage();
})
