var openFlag = new Boolean(false);

function openDropDown(){
    document.getElementsByClassName('dropdown-content')[0].style= "display:flex;";
    if (openFlag == false) {
        document.getElementsByClassName('dropdown-content')[0].style= "display:flex;";
        openFlag = true;
      }else{
        document.getElementsByClassName('dropdown-content')[0].style= "display:none;";
        openFlag = false;
      }
}
