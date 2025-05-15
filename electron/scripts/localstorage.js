function storageClear() {
    localStorage.clear();
    document.getElementById("vertical").value = "";
    document.getElementById("horizontal").value = "";
    document.getElementById("deleteRight").value = "";
    document.getElementById("deleteLeft").value = "";
    document.getElementById("eyesight").value = "";
    document.getElementById("girlsSeats").value = "";
}

function saveLocalstorage() {
    document.getElementById("vertical").value = localStorage.getItem("vertical");
    document.getElementById("horizontal").value = localStorage.getItem("horizontal");
    document.getElementById("deleteRight").value = localStorage.getItem("deleteRight");
    document.getElementById("deleteLeft").value = localStorage.getItem("deleteLeft");
    document.getElementById("eyesight").value = localStorage.getItem("eyesightText");
    document.getElementById("girlsSeats").value = localStorage.getItem("girlSeatsText");
}