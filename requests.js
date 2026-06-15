// Load Requests When Page Opens
window.onload = function () {
    displayRequests();
    updateStatistics();
};

// Add Request
function addRequest() {

    let ngoName = document.getElementById("ngoName").value.trim();
    let foodItem = document.getElementById("foodItem").value.trim();
    let quantity = document.getElementById("quantity").value.trim();
    let location = document.getElementById("location").value.trim();
    let status = document.getElementById("status").value;

    if (
        ngoName === "" ||
        foodItem === "" ||
        quantity === "" ||
        location === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    let requests =
        JSON.parse(localStorage.getItem("requests")) || [];

    let request = {
        id: Date.now(),
        ngoName: ngoName,
        foodItem: foodItem,
        quantity: quantity,
        location: location,
        status: status
    };

    requests.push(request);

    let notifications =
    JSON.parse(localStorage.getItem("notifications")) || [];

notifications.push({
    id: Date.now(),
    message: "📋 New Food Request Created by " + ngoName,
    date: new Date().toLocaleString()
});

localStorage.setItem(
    "notifications",
    JSON.stringify(notifications)
);

    clearForm();
    displayRequests();
    updateStatistics();

    alert("Food Request Added Successfully");
}

// Display Requests
function displayRequests() {

    let requests =
        JSON.parse(localStorage.getItem("requests")) || [];

    let tableBody =
        document.getElementById("requestTableBody");

    tableBody.innerHTML = "";

    requests.forEach(function (request) {

        tableBody.innerHTML += `
            <tr>
                <td>${request.ngoName}</td>
                <td>${request.foodItem}</td>
                <td>${request.quantity}</td>
                <td>${request.location}</td>
                <td>${request.status}</td>

                <td>
                    <button class="edit-btn"
                        onclick="editRequest(${request.id})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteRequest(${request.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

// Edit Request
function editRequest(id) {

    let requests =
        JSON.parse(localStorage.getItem("requests")) || [];

    let request =
        requests.find(item => item.id === id);

    let newNGO =
        prompt("NGO Name", request.ngoName);

    let newFood =
        prompt("Food Item", request.foodItem);

    let newQuantity =
        prompt("Quantity", request.quantity);

    let newLocation =
        prompt("Location", request.location);

    let newStatus =
        prompt(
            "Status (Pending / Approved / Completed)",
            request.status
        );

    request.ngoName = newNGO;
    request.foodItem = newFood;
    request.quantity = newQuantity;
    request.location = newLocation;
    request.status = newStatus;

    localStorage.setItem(
        "requests",
        JSON.stringify(requests)
    );

    displayRequests();
    updateStatistics();

    alert("Request Updated Successfully");
}

// Delete Request
function deleteRequest(id) {

    let confirmDelete =
        confirm("Are you sure you want to delete this request?");

    if (!confirmDelete) {
        return;
    }

    let requests =
        JSON.parse(localStorage.getItem("requests")) || [];

    requests = requests.filter(
        request => request.id !== id
    );

    localStorage.setItem(
        "requests",
        JSON.stringify(requests)
    );

    displayRequests();
    updateStatistics();

    alert("Request Deleted Successfully");
}

// Update Dashboard Statistics
function updateStatistics() {

    let requests =
        JSON.parse(localStorage.getItem("requests")) || [];

    let total = requests.length;

    let pending =
        requests.filter(
            request => request.status === "Pending"
        ).length;

    let approved =
        requests.filter(
            request => request.status === "Approved"
        ).length;

    let completed =
        requests.filter(
            request => request.status === "Completed"
        ).length;

    document.getElementById("totalRequests").innerText = total;
    document.getElementById("pendingRequests").innerText = pending;
    document.getElementById("approvedRequests").innerText = approved;
    document.getElementById("completedRequests").innerText = completed;
}

// Clear Form
function clearForm() {

    document.getElementById("ngoName").value = "";
    document.getElementById("foodItem").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("location").value = "";
    document.getElementById("status").value = "Pending";
}