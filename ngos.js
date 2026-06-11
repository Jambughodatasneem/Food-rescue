window.onload = function () {
    displayNGOs();
};

function addNGO() {

    let ngoName =
    document.getElementById("ngoName").value;

    let contactPerson =
    document.getElementById("contactPerson").value;

    let email =
    document.getElementById("email").value;

    let phone =
    document.getElementById("phone").value;

    let address =
    document.getElementById("address").value;

    let requirement =
    document.getElementById("requirement").value;

    if(
        ngoName === "" ||
        contactPerson === "" ||
        email === "" ||
        phone === "" ||
        address === "" ||
        requirement === ""
    ){
        alert("Please fill all fields");
        return;
    }

    let ngos =
    JSON.parse(localStorage.getItem("ngos"))
    || [];

    ngos.push({
        id: Date.now(),
        ngoName,
        contactPerson,
        email,
        phone,
        address,
        requirement
    });

    localStorage.setItem(
        "ngos",
        JSON.stringify(ngos)
    );

    displayNGOs();

    document.getElementById("ngoName").value="";
    document.getElementById("contactPerson").value="";
    document.getElementById("email").value="";
    document.getElementById("phone").value="";
    document.getElementById("address").value="";
    document.getElementById("requirement").value="";
}

function displayNGOs(){

    let ngos =
    JSON.parse(localStorage.getItem("ngos"))
    || [];

    document.getElementById("ngoCount").innerText =
    ngos.length;

    let table =
    document.getElementById("ngoTable");

    table.innerHTML="";

    ngos.forEach(ngo => {

        table.innerHTML += `
        <tr>

            <td>${ngo.ngoName}</td>
            <td>${ngo.contactPerson}</td>
            <td>${ngo.email}</td>
            <td>${ngo.phone}</td>
            <td>${ngo.requirement}</td>

            <td>

                <button class="edit-btn"
                onclick="editNGO(${ngo.id})">
                Edit
                </button>

                <button class="delete-btn"
                onclick="deleteNGO(${ngo.id})">
                Delete
                </button>

            </td>

        </tr>
        `;
    });
}

function deleteNGO(id){

    let ngos =
    JSON.parse(localStorage.getItem("ngos"))
    || [];

    ngos =
    ngos.filter(
        ngo => ngo.id !== id
    );

    localStorage.setItem(
        "ngos",
        JSON.stringify(ngos)
    );

    displayNGOs();
}

function editNGO(id){

    let ngos =
    JSON.parse(localStorage.getItem("ngos"))
    || [];

    let ngo =
    ngos.find(n => n.id === id);

    ngo.requirement =
    prompt(
        "Update Requirement",
        ngo.requirement
    );

    localStorage.setItem(
        "ngos",
        JSON.stringify(ngos)
    );

    displayNGOs();
}