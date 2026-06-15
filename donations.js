// Load Donations on Page Load
window.onload = function () {
    displayDonations();
};

// Add Donation
function addDonation() {

    let foodName = document.getElementById("foodName").value.trim();
    let quantity = document.getElementById("quantity").value.trim();
    let category = document.getElementById("category").value.trim();
    let address = document.getElementById("address").value.trim();
    let expiry = document.getElementById("expiry").value;

    if (
        foodName === "" ||
        quantity === "" ||
        category === "" ||
        address === "" ||
        expiry === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    let donations =
        JSON.parse(localStorage.getItem("donations")) || [];

    let donation = {
        id: Date.now(),
        foodName: foodName,
        quantity: quantity,
        category: category,
        address: address,
        expiry: expiry
    };

    donations.push(donation);

    localStorage.setItem(
        "donations",
        JSON.stringify(donations)
    );

    // Notification
    let notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];

    notifications.push({
        id: Date.now(),
        message: "🍱 New Donation Added: " + foodName,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );

    clearForm();
    displayDonations();

    alert("Donation Added Successfully");
}

// Display Donations
function displayDonations() {

    let donations =
        JSON.parse(localStorage.getItem("donations")) || [];

    let tableBody =
        document.getElementById("donationBody");

    tableBody.innerHTML = "";

    if (donations.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    No Donations Available
                </td>
            </tr>
        `;
        return;
    }

    donations.forEach(function (donation) {

        tableBody.innerHTML += `
            <tr>

                <td>${donation.foodName}</td>

                <td>${donation.quantity}</td>

                <td>${donation.category}</td>

                <td>${donation.address}</td>

                <td>${donation.expiry}</td>

                <td>

                    <button
                        class="action-btn edit-btn"
                        onclick="editDonation(${donation.id})">

                        Edit

                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteDonation(${donation.id})">

                        Delete

                    </button>

                </td>

            </tr>
        `;
    });
}

// Edit Donation
function editDonation(id) {

    let donations =
        JSON.parse(localStorage.getItem("donations")) || [];

    let donation =
        donations.find(d => d.id === id);

    if (!donation) {
        alert("Donation not found");
        return;
    }

    let newFoodName =
        prompt("Enter Food Name", donation.foodName);

    if (newFoodName === null) return;

    let newQuantity =
        prompt("Enter Quantity", donation.quantity);

    if (newQuantity === null) return;

    let newCategory =
        prompt("Enter Category", donation.category);

    if (newCategory === null) return;

    let newAddress =
        prompt("Enter Address", donation.address);

    if (newAddress === null) return;

    let newExpiry =
        prompt("Enter Expiry Date", donation.expiry);

    if (newExpiry === null) return;

    donation.foodName = newFoodName;
    donation.quantity = newQuantity;
    donation.category = newCategory;
    donation.address = newAddress;
    donation.expiry = newExpiry;

    localStorage.setItem(
        "donations",
        JSON.stringify(donations)
    );

    // Notification
    let notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];

    notifications.push({
        id: Date.now(),
        message: "✏️ Donation Updated: " + donation.foodName,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );

    displayDonations();

    alert("Donation Updated Successfully");
}

// Delete Donation
function deleteDonation(id) {

    let confirmDelete =
        confirm("Are you sure you want to delete this donation?");

    if (!confirmDelete) {
        return;
    }

    let donations =
        JSON.parse(localStorage.getItem("donations")) || [];

    let donation =
        donations.find(d => d.id === id);

    donations =
        donations.filter(d => d.id !== id);

    localStorage.setItem(
        "donations",
        JSON.stringify(donations)
    );

    // Notification
    let notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];

    notifications.push({
        id: Date.now(),
        message: "🗑️ Donation Deleted: " + donation.foodName,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );

    displayDonations();

    alert("Donation Deleted Successfully");
}

// Clear Form
function clearForm() {

    document.getElementById("foodName").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("category").value = "";
    document.getElementById("address").value = "";
    document.getElementById("expiry").value = "";
}