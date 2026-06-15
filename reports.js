window.onload = function () {

    loadReports();

};

function loadReports() {

    let donors =
        JSON.parse(localStorage.getItem("donors")) || [];

    let ngos =
        JSON.parse(localStorage.getItem("ngos")) || [];

    let donations =
        JSON.parse(localStorage.getItem("donations")) || [];

    let requests =
        JSON.parse(localStorage.getItem("requests")) || [];

    let allocations =
        JSON.parse(localStorage.getItem("allocations")) || [];

    document.getElementById("totalDonors").innerText =
        donors.length;

    document.getElementById("totalNGOs").innerText =
        ngos.length;

    document.getElementById("totalDonations").innerText =
        donations.length;

    document.getElementById("totalRequests").innerText =
        requests.length;

    document.getElementById("totalAllocations").innerText =
        allocations.length;

    document.getElementById("donorCount").innerText =
        donors.length;

    document.getElementById("ngoCount").innerText =
        ngos.length;

    document.getElementById("donationCount").innerText =
        donations.length;

    document.getElementById("requestCount").innerText =
        requests.length;

    document.getElementById("allocationCount").innerText =
        allocations.length;
}