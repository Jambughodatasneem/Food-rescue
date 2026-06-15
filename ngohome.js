window.onload = function () {

    loadNGOData();

};

function loadNGOData() {

    let requests =
        JSON.parse(localStorage.getItem("requests")) || [];

    let allocations =
        JSON.parse(localStorage.getItem("allocations")) || [];

    let notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];

    document.getElementById("totalRequests").innerText =
        requests.length;

    document.getElementById("allocatedFood").innerText =
        allocations.length;

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