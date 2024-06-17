
class patientform {
    formvalues = {
        valid: "",
        medicareno: "",
        title: "",
        name: "",
        prefname: "",
        dob: "",
        gender: "",
        mobile: "",
        enumber: "",
        mail: "",
        address1: "",
        pcode1: "",
        country1: "",
        state1: "",
        address2: "",
        pcode2: "",
        country2: "",
        state2: "",
        ihino: "",
        registerby: ""
    }
    errorvalues = {
        validerr: "",
        medicarenoerr: "",
        titleerr: "",
        nameerr: "",
        prefnameerr: "",
        doberr: "",
        gendererr: "",
        mobileerr: "",
        enumbererr: "",
        mailerr: "",
        address1err: "",
        pcode1err: "",
        country1err: "",
        state1err: "",
        address2err: "",
        country2err: "",
        pcode2err: "",
        state2err: "",
        ihinoerr: "",
        registerbyerr: ""
    }
    ErrorMsg(index, msg) {
        const fields = document.getElementsByClassName("fields")[index];
        fields.classList.add('error');
        fields.getElementsByTagName('span')[0].textContent = msg;
    }
    SuccessMsg(index) {
        const fields = document.getElementsByClassName("fields")[index]
        fields.classList.remove('error');
        fields.classList.add('success')
    }
    getInputs() {
        this.formvalues.valid = document.getElementById('vdate').value.trim();
        this.formvalues.medicareno = document.getElementById('mnumber').value.trim();
        this.formvalues.title = document.getElementById('title').value.trim();
        this.formvalues.name = document.getElementById('name').value.trim();
        this.formvalues.prefname = document.getElementById('pname').value.trim();
        this.formvalues.dob = document.getElementById('date').value.trim();
        this.formvalues.gender = document.getElementsByName('gender');
        this.formvalues.mobile = document.getElementById('mobile').value.trim();
        this.formvalues.enumber = document.getElementById('emergenynum').value.trim();
        this.formvalues.mail = document.getElementById('mail').value.trim();
        this.formvalues.address1 = document.getElementById('address1').value.trim();
        this.formvalues.pcode1 = document.getElementById('pcode1').value.trim();
        this.formvalues.country1 = document.getElementById('country1').value.trim();
        this.formvalues.state1 = document.getElementById('state1').value.trim();
        this.formvalues.address2 = document.getElementById('address2').value.trim();
        this.formvalues.pcode2 = document.getElementById('pcode2').value.trim();
        this.formvalues.country2 = document.getElementById('country2').value.trim();
        this.formvalues.state2 = document.getElementById('state2').value.trim();
        this.formvalues.ihino = document.getElementById('ihi').value.trim();
        this.formvalues.registerby = document.getElementById('registerby').value.trim();
    }
    validatevdate() {
        if (this.formvalues.valid === "") {
            this.errorvalues.validerr = "Select date"
            this.ErrorMsg(0, this.errorvalues.validerr)
        } else {
            this.errorvalues.validerr = ""
            this.SuccessMsg(0)
        }

    }
    validatemedicareno() {
        if (this.formvalues.medicareno === "") {
            this.errorvalues.medicarenoerr = "Enter medicare no"
            this.ErrorMsg(1, this.errorvalues.medicarenoerr)
        } else {
            this.errorvalues.medicarenoerr = ""
            this.SuccessMsg(1)
        }

    }
    validatetitle() {
        var regExp = /^(Mr|Mrs|Dr)$/;
        if (this.formvalues.title === "") {
            this.errorvalues.titleerr = "Enter title"
            this.ErrorMsg(2, this.errorvalues.titleerr)
        }
        else if (!(regExp.test(this.formvalues.title))) {
            this.errorvalues.titleerr = "It allows only Mr,Mrs or Dr"
            this.ErrorMsg(2, this.errorvalues.titleerr)
        }
        else {
            this.errorvalues.titleerr = ""
            this.SuccessMsg(2)
        }
    }
    validatename() {
        var regExp = /^[A-Za-z]+$/;
        if (this.formvalues.name === "") {
            this.errorvalues.nameerr = "Enter name"
            this.ErrorMsg(3, this.errorvalues.nameerr)
        }
        else if (!(regExp.test(this.formvalues.name))) {
            this.errorvalues.nameerr = "Name contains only character"
            this.ErrorMsg(3, this.errorvalues.nameerr)
        }
        else {
            this.errorvalues.nameerr = ""
            this.SuccessMsg(3)
        }
    }
    validateprefname() {
        var regExp = /^[A-Za-z]+$/;
        if (this.formvalues.name === "") {
            this.errorvalues.nameerr = "Enter pref.name"
            this.ErrorMsg(4, this.errorvalues.nameerr)
        }
        else if (!(regExp.test(this.formvalues.name))) {
            this.errorvalues.nameerr = "Name contains only Character"
            this.ErrorMsg(4, this.errorvalues.nameerr)
        }
        else {
            this.errorvalues.nameerr = ""
            this.SuccessMsg(4)
        }
    }
    validatedob() {
        if (this.formvalues.dob === "") {
            this.errorvalues.doberr = "Select date"
            this.ErrorMsg(5, this.errorvalues.doberr)
        } else {
            this.errorvalues.doberr = ""
            this.SuccessMsg(5)
        }
    }
    validategender() {
        this.formvalues.gender = false;
        var i = 0;
        if (!this.formvalues.gender) {
            for (i = 0; i < this.formvalues.gender.length; i++) {
                if (this.formvalues.gender[i].checked) {
                    this.formvalues.gender = true;
                    i++;
                }
            }
            if (!this.formvalues.gender) {
                this.errorvalues.gendererr = "Select gender"
                this.ErrorMsg(6, this.errorvalues.gendererr)
            } else {
                this.errorvalues.gendererr = ""
                this.SuccessMsg(6)
            }
        }
    }
    validatemobile() {
        var regExp = /^[0-9]+$/;
        if (this.formvalues.mobile === "") {
            this.errorvalues.mobileerr = "Enter mobile number"
            this.ErrorMsg(12, this.errorvalues.mobileerr)
        }
        else if (!(regExp.test(this.formvalues.mobile))) {
            this.errorvalues.mobileerr = "It takes only number"
            this.ErrorMsg(12, this.errorvalues.mobileerr)
        }
        else {
            this.errorvalues.mobileerr = ""
            this.SuccessMsg(12)
        }
    }
    validateemergencynumber() {
        var regExp = /^[0-9]+$/;
        if (this.formvalues.enumber === "") {
            this.errorvalues.enumbererr = "Enter emergency number"
            this.ErrorMsg(15, this.errorvalues.enumbererr)
        }
        else if (!(regExp.test(this.formvalues.enumber))) {
            this.errorvalues.mobileerr = "It takes only number"
            this.ErrorMsg(15, this.errorvalues.enumbererr)
        }
        else {
            this.errorvalues.enumbererr = ""
            this.SuccessMsg(15)
        }
    }
    validatemail() {
        var regExp = /^([a-z0-9-_\.]+)@([a-z]+)\.([a-z]{2,10})?$/
        if (this.formvalues.mail === "") {
            this.errorvalues.mailerr = "Enter valid email"
            this.ErrorMsg(16, this.errorvalues.mailerr)
        }
        else if (!(regExp.test(this.formvalues.mail))) {
            this.errorvalues.mailerr = "Invalid email"
            this.ErrorMsg(16, this.errorvalues.mailerr)
        }
        else {
            this.errorvalues.mailerr = ""
            this.SuccessMsg(16)
        }
    }
    validateaddress1() {
        if (this.formvalues.address1 === "") {
            this.errorvalues.address1err = "Enter address"
            this.ErrorMsg(17, this.errorvalues.address1err)
        } else {
            this.errorvalues.address1err = ""
            this.SuccessMsg(17)
        }
    }
    validatepostalcode1() {
        if (this.formvalues.pcode1 === "") {
            this.errorvalues.pcode1err = "Enter postal code"
            this.ErrorMsg(20, this.errorvalues.pcode1err)
        }
        else {
            this.errorvalues.pcode1err = ""
            this.SuccessMsg(20)
        }
    }
    validatecountry1() {
        if (this.formvalues.country1 === "") {
            this.errorvalues.country1err = "Select country"
            this.ErrorMsg(21, this.errorvalues.country1err)
        } else {
            this.errorvalues.country1err = ""
            this.SuccessMsg(21)
        }
    }
    validatestate1() {
        if (this.formvalues.state1 === "") {
            this.errorvalues.state1err = "Select state"
            this.ErrorMsg(22, this.errorvalues.state1err)
        } else {
            this.errorvalues.state1err = ""
            this.SuccessMsg(22)
        }
    }
    validateaddress2() {
        if (this.formvalues.address2 === "") {
            this.errorvalues.address2err = "Enter address"
            this.ErrorMsg(24, this.errorvalues.address2err)
        } else {
            this.errorvalues.address2err = ""
            this.SuccessMsg(24)
        }
    }
    validatepostalcode2() {
        if (this.formvalues.pcode2 === "") {
            this.errorvalues.pcode2err = "Enter postal code"
            this.ErrorMsg(27, this.errorvalues.pcode2err)
        }
        else {
            this.errorvalues.pcode2err = ""
            this.SuccessMsg(27)
        }
    }
    validatecountry2() {
        if (this.formvalues.country2 === "") {
            this.errorvalues.country2err = "Select country"
            this.ErrorMsg(28, this.errorvalues.country2err)
        } else {
            this.errorvalues.country2err = ""
            this.SuccessMsg(28)
        }
    }
    validatestate2() {
        if (this.formvalues.state2 === "") {
            this.errorvalues.state2err = "Select state"
            this.ErrorMsg(29, this.errorvalues.state2err)
        } else {
            this.errorvalues.state2err = ""
            this.SuccessMsg(29)
        }
    }
    validateihinumber() {
        if (this.formvalues.ihino === "") {
            this.errorvalues.ihinoerr = "Enter IHI code"
            this.ErrorMsg(30, this.errorvalues.ihinoerr)
        }
        else {
            this.errorvalues.ihinoerr = ""
            this.SuccessMsg(30)
        }
    }
    validateregisteredby() {
        var regExp = /^[A-Za-z]+$/;
        if (this.formvalues.registerby === "") {
            this.errorvalues.registerbyerr = "Enter the field"
            this.ErrorMsg(34, this.errorvalues.registerbyerr)
        }
        else if (!(regExp.test(this.formvalues.registerby))) {
            this.errorvalues.registerbyerr = "It contains only Character"
            this.ErrorMsg(34, this.errorvalues.registerbyerr)
        }
        else {
            this.errorvalues.registerbyerr = ""
            this.SuccessMsg(34)
        }
    }


}

const UserInputs = new patientform();
document.getElementsByClassName("forms")[0].addEventListener('submit', event => {
    event.preventDefault()
    // console.log(document.getElementsByClassName('form'));
    UserInputs.getInputs()
    UserInputs.validatevdate()
    UserInputs.validatemedicareno()
    UserInputs.validatetitle()
    UserInputs.validatename()
    UserInputs.validateprefname()
    UserInputs.validatedob()
    UserInputs.validategender()
    UserInputs.validatemobile()
    UserInputs.validateemergencynumber()
    UserInputs.validatemail()
    UserInputs.validateaddress1()
    UserInputs.validatepostalcode1()
    UserInputs.validatecountry1()
    UserInputs.validatestate1()
    UserInputs.validateaddress2()
    UserInputs.validatepostalcode2()
    UserInputs.validatecountry2()
    UserInputs.validatestate2()
    UserInputs.validateihinumber()
    UserInputs.validateregisteredby()
})
function countryselect() {
    var a = document.getElementById("country1").value;
    if (a === "india") {
        var arr = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];
    }
    else {
        var arr = ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan"];

    }
    var string = "";

    for (i = 0; i < arr.length; i++) {
        string = string + "<option value=" + arr[i] + ">" + arr[i] + "</option>";
    }
    document.getElementById("state1").innerHTML = string;
}
function countryselect2() {
    var a = document.getElementById("country2").value;
    if (a === "india") {
        var arr = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];
    }
    else {
        var arr = ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan"];

    }
    var string = "";

    for (i = 0; i < arr.length; i++) {
        string = string + "<option value=" + arr[i] + ">" + arr[i] + "</option>";
    }
    document.getElementById("state2").innerHTML = string;
}