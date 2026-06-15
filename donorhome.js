let user =
    JSON.parse(localStorage.getItem("loggedInUser"));

if(!user){

    window.location.href =
        "login.html";
}

if(user.role !== "Donor"){

    alert("Access Denied");

    window.location.href =
        "login.html";
}

window.onload = function () {

    loadDonorData();

};

function loadDonorData() {

    let donations =
        JSON.parse(localStorage.getItem("donations")) || [];

    let notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];

    document.getElementById("myDonations").innerText =
        donations.length;

    document.getElementById("foodItems").innerText =
        donations.length;

    document.getElementById("notificationsCount").innerText =
        notifications.length;

    let activityList =
        document.getElementById("activityList");

    activityList.innerHTML = "";

    if(notifications.length === 0){

        activityList.innerHTML =
        "<li>No Activity Found</li>";

        return;
    }

    notifications
        .slice(-5)
        .reverse()
        .forEach(item => {

            activityList.innerHTML +=
            `<li>${item.message}</li>`;

        });
}

function logout(){

    localStorage.removeItem(
        "loggedInUser"
    );

    window.location.href =
    "login.html";
}