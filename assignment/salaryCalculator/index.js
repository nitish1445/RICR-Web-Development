function calculateSalary(){
    let bs = document.getElementById("basicSalary").value;
    if(bs<0){
        document.getElementById("errorMsg").style.display = "block";
    }
}