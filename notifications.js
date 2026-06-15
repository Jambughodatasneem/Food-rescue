// Page Load
window.onload = function () {

    console.log("Notifications Page Loaded");

    displayNotifications();
};

// Display Notifications
function displayNotifications() {

    let notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];

    console.log("Notifications Found:", notifications);

    let container =
        document.getElementById("notificationList");

    if (!container) {
        console.error("notificationList div not found");
        return;
    }

    container.innerHTML = "";

    if (notifications.length === 0) {

        container.innerHTML = `
            <div class="notification">
                <h3>No Notifications Available</h3>
            </div>
        `;

        return;
    }

    notifications.forEach(notification => {

        container.innerHTML += `
            <div class="notification">

                <h3>${notification.message}</h3>

                <p>${notification.date}</p>

                <button
                    class="delete-btn"
                    onclick="deleteNotification(${notification.id})">
                    Delete
                </button>

            </div>
        `;
    });
}

// Add Notification
function addNotification(message) {

    let notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];

    notifications.push({
        id: Date.now(),
        message: message,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );

    console.log("Notification Added:", message);
}

// Delete Notification
function deleteNotification(id) {

    let notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];

    notifications =
        notifications.filter(
            notification => notification.id !== id
        );

    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );

    displayNotifications();
}

// Clear All Notifications
function clearNotifications() {

    let confirmDelete =
        confirm("Are you sure you want to clear all notifications?");

    if (!confirmDelete) {
        return;
    }

    localStorage.removeItem("notifications");

    displayNotifications();
}