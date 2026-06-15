window.onload = function () {

    loadFood();

};

function loadFood() {

    let donations =
        JSON.parse(localStorage.getItem("donations")) || [];

    let table =
        document.getElementById("foodTableBody");

    table.innerHTML = "";

    if(donations.length === 0){

        table.innerHTML =
        "<tr><td colspan='5'>No Food Available</td></tr>";

        return;
    }

    donations.forEach(food => {

        table.innerHTML += `
        <tr>

            <td>${food.foodName}</td>
            <td>${food.quantity}</td>
            <td>${food.category}</td>
            <td>${food.address}</td>
            <td>${food.expiry}</td>

        </tr>
        `;
    });
}