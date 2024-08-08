
export function isEmailAddress(str) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    // alert(str.match(pattern)); 
    return str.match(mailformat);    

}