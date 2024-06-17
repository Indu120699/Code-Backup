function radiobutton()
{
    var rb=document.getElementById("gender");
    var val=false;
    var i=0;
    if(!val)
    {
     for(i=0;i<rb.length;i++)
     {
      if(rb[i].checked)
      {
       val=true;
       i++;
      }
     }
    }
    if(!val)
    {
     document.getElementById("validate").innerHTML="Please select gender";
    }
    else
    {
     document.getElementById("validate").innerHTML="";
    }
}