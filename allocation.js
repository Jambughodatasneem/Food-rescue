// Load Page
window.onload = function () {
    loadDropdowns();
    displayAllocations();
    updateStatistics();
};

// Load Donations and Requests into Dropdowns
function loadDropdowns() {

    let donations =
        JSON.parse(localStorage.getItem("donations")) || [];

    let requests =
        JSON.parse(localStorage.getItem("requests")) || [];

    let donationSelect =
        document.getElementById("donationSelect");

    let requestSelect =
        document.getElementById("requestSelect");

    donationSelect.innerHTML =
        '<option value="">Select Donation</option>';

    requestSelect.innerHTML =
        '<option value="">Select Request</option>';

    donations.forEach((donation) => {

        donationSelect.innerHTML += `
            <option value="${donation.id}">
                ${donation.foodName} (${donation.quantity})
            </option>
        `;
    });

    requests.forEach((request) => {

        requestSelect.innerHTML += `
            <option value="${request.id}">
                ${request.ngoName} - ${request.foodItem}
            </option>
        `;
    });
}

// Allocate Food
function allocateFood() {

    let donationId =
        document.getElementById("donationSelect").value;

    let requestId =
        document.getElementById("requestSelect").value;

    let allocatedQuantity =
        document.getElementById("allocatedQuantity").value;

    if (
        donationId === "" ||
        requestId === "" ||
        allocatedQuantity === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    let donations =
        JSON.parse(localStorage.getItem("donations")) || [];

    let requests =
        JSON.parse(localStorage.getItem("requests")) || [];

    let allocations =
        JSON.parse(localStorage.getItem("allocations")) || [];

    let donation =
        donations.find(
            d => d.id == donationId
        );

    let request =
        requests.find(
            r => r.id == requestId
        );

    let allocation = {

        id: Date.now(),

        ngoName:
            request.ngoName,

        foodItem:
            donation.foodName,

        quantity:
            allocatedQuantity,

        status:
            "Allocated",

        allocationDate:
            new Date().toLocaleDateString()
    };

    allocations.push(allocation);

    let notifications =
    JSON.parse(localStorage.getItem("notifications")) || [];

notifications.push({
    id: Date.now(),
    message: "🔄 Food Allocated to " + request.ngoName,
    date: new Date().toLocaleString()
});

localStorage.setItem(
    "notifications",
    JSON.stringify(notifications)
);

    document.getElementById(
        "allocatedQuantity"
    ).value = "";

    displayAllocations();
    updateStatistics();

    alert("Food Allocated Successfully");
}

// Display Allocation History
function displayAllocations() {

    let allocations =
        JSON.parse(localStorage.getItem("allocations")) || [];

    let table =
        document.getElementById("allocationTable");

    table.innerHTML = "";

    allocations.forEach((allocation) => {

        table.innerHTML += `
            <tr>

                <td>${allocation.ngoName}</td>

                <td>${allocation.foodItem}</td>

                <td>${allocation.quantity}</td>

                <td>${allocation.allocationDate}</td>

                <td>${allocation.status}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteAllocation(${allocation.id})">

                        Delete

                    </button>

                </td>

            </tr>
        `;
    });
}

// Delete Allocation
function deleteAllocation(id) {

    let confirmDelete =
        confirm(
            "Delete this allocation?"
        );

    if (!confirmDelete) {
        return;
    }

    let allocations =
        JSON.parse(localStorage.getItem("allocations")) || [];

    allocations =
        allocations.filter(
            allocation =>
                allocation.id !== id
        );

    localStorage.setItem(
        "allocations",
        JSON.stringify(allocations)
    );

    displayAllocations();
    updateStatistics();

    alert("Allocation Deleted");
}

// Statistics
function updateStatistics() {

    let donations =
        JSON.parse(localStorage.getItem("donations")) || [];

    let requests =
        JSON.parse(localStorage.getItem("requests")) || [];

    let allocations =
        JSON.parse(localStorage.getItem("allocations")) || [];

    document.getElementById(
        "totalDonations"
    ).innerText =
        donations.length;

    document.getElementById(
        "totalRequests"
    ).innerText =
        requests.length;

    document.getElementById(
        "totalAllocations"
    ).innerText =
        allocations.length;

    let allocatedTotal = 0;

    allocations.forEach((allocation) => {

        allocatedTotal +=
            parseInt(allocation.quantity);
    });

    document.getElementById(
        "remainingFood"
    ).innerText =
        allocatedTotal;
}