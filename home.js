console.log("HOME JS LOADED");

window.onload = function () {

    loadStatistics();

    loadRecentActivity();
};

function loadStatistics() {

    let donations =
        JSON.parse(localStorage.getItem("donations")) || [];

    let donors =
        JSON.parse(localStorage.getItem("donors")) || [];

    let ngos =
        JSON.parse(localStorage.getItem("ngos")) || [];

    let requests =
        JSON.parse(localStorage.getItem("requests")) || [];

    document.getElementById("totalDonations").innerText =
        donations.length;

    document.getElementById("totalDonors").innerText =
        donors.length;

    document.getElementById("totalNGOs").innerText =
        ngos.length;

    document.getElementById("totalRequests").innerText =
        requests.length;
}

function loadRecentActivity() {

    let notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];

    let activityList =
        document.getElementById("activityList");

    activityList.innerHTML = "";

    if(notifications.length === 0){

        activityList.innerHTML =
        "<li>No Recent Activity</li>";

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

    let confirmLogout =
        confirm("Are you sure you want to logout?");

    if(!confirmLogout){
        return;
    }

    localStorage.removeItem("loggedInUser");

    window.location.href =
        "login.html";
}