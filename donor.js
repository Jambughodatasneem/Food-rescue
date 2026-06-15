// Load Donors When Page Opens
window.onload = function () {
    displayDonors();
};

// Register New Donor
function addDonor() {

    let donorName =
        document.getElementById("donorName").value.trim();

    let organization =
        document.getElementById("organization").value.trim();

    let email =
        document.getElementById("email").value.trim();

    let phone =
        document.getElementById("phone").value.trim();

    let address =
        document.getElementById("address").value.trim();

    let donorType =
        document.getElementById("donorType").value;

    // Validation
    if (
        donorName === "" ||
        organization === "" ||
        email === "" ||
        phone === "" ||
        address === "" ||
        donorType === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    let donors =
        JSON.parse(localStorage.getItem("donors")) || [];

    let donor = {
        id: Date.now(),
        donorName,
        organization,
        email,
        phone,
        address,
        donorType
    };

    donors.push(donor);

    let notifications =
    JSON.parse(localStorage.getItem("notifications")) || [];

notifications.push({
    id: Date.now(),
    message: "👤 New Donor Registered: " + donorName,
    date: new Date().toLocaleString()
});

localStorage.setItem(
    "notifications",
    JSON.stringify(notifications)
);

    clearForm();
    displayDonors();

    alert("Donor Registered Successfully!");
}

// Display Donors
function displayDonors() {

    let donors =
        JSON.parse(localStorage.getItem("donors")) || [];

    let table =
        document.getElementById("donorTable");

    table.innerHTML = "";

    donors.forEach(function (donor) {

        table.innerHTML += `
        <tr>

            <td>${donor.donorName}</td>
            <td>${donor.organization}</td>
            <td>${donor.email}</td>
            <td>${donor.phone}</td>
            <td>${donor.donorType}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editDonor(${donor.id})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteDonor(${donor.id})">
                    Delete
                </button>

            </td>

        </tr>
        `;
    });

    updateStatistics(donors);
}

// Update Dashboard Statistics
function updateStatistics(donors) {

    document.getElementById("totalDonors").innerText =
        donors.length;

    let restaurants =
        donors.filter(
            donor => donor.donorType === "Restaurant"
        ).length;

    let hotels =
        donors.filter(
            donor => donor.donorType === "Hotel"
        ).length;

    let individuals =
        donors.filter(
            donor => donor.donorType === "Individual"
        ).length;

    document.getElementById("restaurantCount").innerText =
        restaurants;

    document.getElementById("hotelCount").innerText =
        hotels;

    document.getElementById("individualCount").innerText =
        individuals;
}

// Edit Donor
function editDonor(id) {

    let donors =
        JSON.parse(localStorage.getItem("donors")) || [];

    let donor =
        donors.find(
            item => item.id === id
        );

    if (!donor) return;

    donor.donorName =
        prompt(
            "Enter Donor Name",
            donor.donorName
        ) || donor.donorName;

    donor.organization =
        prompt(
            "Enter Organization Name",
            donor.organization
        ) || donor.organization;

    donor.email =
        prompt(
            "Enter Email",
            donor.email
        ) || donor.email;

    donor.phone =
        prompt(
            "Enter Phone Number",
            donor.phone
        ) || donor.phone;

    donor.address =
        prompt(
            "Enter Address",
            donor.address
        ) || donor.address;

    donor.donorType =
        prompt(
            "Enter Donor Type",
            donor.donorType
        ) || donor.donorType;

    localStorage.setItem(
        "donors",
        JSON.stringify(donors)
    );

    displayDonors();

    alert("Donor Updated Successfully!");
}

// Delete Donor
function deleteDonor(id) {

    let confirmDelete =
        confirm(
            "Are you sure you want to delete this donor?"
        );

    if (!confirmDelete) {
        return;
    }

    let donors =
        JSON.parse(localStorage.getItem("donors")) || [];

    donors =
        donors.filter(
            donor => donor.id !== id
        );

    localStorage.setItem(
        "donors",
        JSON.stringify(donors)
    );

    displayDonors();

    alert("Donor Deleted Successfully!");
}

// Clear Form
function clearForm() {

    document.getElementById("donorName").value = "";
    document.getElementById("organization").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    document.getElementById("donorType").value = "";
}