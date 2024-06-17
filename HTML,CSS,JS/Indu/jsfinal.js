class formvalidation 
{
  formvalues=
    {
      mno: "", 
      vt: "", 
      title: "", 
      pname: "", 
      dob: "", 
      gen: "", 
      mob: "",
      emno: "", 
      email: "",
      add1: "",
      pcode: "",
      country: "",
      state: "",
      ihi: "",
      
    }
  errorvalues=
    {
        mnoerr: "", 
        vterr: "", 
        titleerr: "", 
        pnameerr: "", 
        doberr: "", 
        sexerr: "", 
        moberr: "",
        emnoerr: "", 
        emailerr: "",
        add1err: "",
        pcodeerr: "",
        countryerr: "",
        stateerr: "",
        ihierr: "",
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
    this.formvalues.mno = document.getElementById('medicalno').value.trim();
    this.formvalues.vt = document.getElementById('valid till').value.trim();
    this.formvalues.title = document.getElementById('title').value.trim();
    this.formvalues.pname = document.getElementById('prefname').value.trim();
    this.formvalues.dob = document.getElementById('date of birth').value.trim();
    this.formvalues.gen = document.getElementsByClassName('gen');
    this.formvalues.mob = document.getElementById('mobile').value.trim();
    this.formvalues.emno = document.getElementById('emergencynumber').value.trim();
    this.formvalues.email = document.getElementById('email').value.trim();
    this.formvalues.add1 = document.getElementById('address1').value.trim();
    this.formvalues.pcode = document.getElementById('prefname').value.trim();
    this.formvalues.country = document.getElementById('country').value;
    this.formvalues.state = document.getElementById('state').value;
    this.formvalues.ihi = document.getElementById('ihi').value.trim();
  }
  validatemno() 
  {
    if (this.formvalues.mno === "") 
    {
      this.errorvalues.mnoerr = "Enter number";
      this.showerrormsg(0, this.errorvalues.mnoerr);
    }
    else
    {
        this.errorvalues.mnoerr = "";
        this.showsuccessmsg(0);
    }
  }
  const validateinputs = new formvalidation()
document.getElementsByClassName('forms')[0].addEventListener('submit', event => 
{
  event.preventDefault();
  validateinputs.getinputs();
  validateinputs.validatemno();
}
})
