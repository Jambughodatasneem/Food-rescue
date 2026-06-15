// ===============================
// REGISTER USER
// ===============================

function registerUser() {

    let fullName =
        document.getElementById("fullName").value.trim();

    let email =
        document.getElementById("email").value.trim();

    let mobile =
        document.getElementById("mobile").value.trim();

    let role =
        document.getElementById("role").value;

    let password =
        document.getElementById("password").value;

    let confirmPassword =
        document.getElementById("confirmPassword").value;

    if (
        fullName === "" ||
        email === "" ||
        mobile === "" ||
        role === "" ||
        password === "" ||
        confirmPassword === ""
    ) {
        alert("Please Fill All Fields");
        return;
    }

    let regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!regex.test(password)) {

        alert(
            "Password must contain Uppercase, Lowercase, Number and Special Character"
        );

        return;
    }

    if (password !== confirmPassword) {

        alert("Passwords Do Not Match");
        return;
    }

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    let existingUser =
        users.find(user => user.email === email);

    if (existingUser) {

        alert("Email Already Registered");
        return;
    }

    users.push({

        id: Date.now(),

        fullName,

        email,

        mobile,

        role,

        password

    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("Registration Successful");

    window.location.href =
        "login.html";
}


// ===============================
// LOGIN USER
// ===============================

function loginUser() {

    let email =
        document.getElementById("loginEmail").value.trim();

    let password =
        document.getElementById("loginPassword").value;

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    let user =
        users.find(
            u =>
            u.email === email &&
            u.password === password
        );

    if (!user) {

        alert("Invalid Email or Password");
        return;
    }

    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
    );

    alert("Login Successful");

    if(user.role === "Admin") {

        window.location.href =
            "home.html";

    }
    else if(user.role === "Donor") {

        window.location.href =
            "donorhome.html";

    }
    else if(user.role === "NGO") {

        window.location.href =
            "ngohome.html";

    }
    else {

        alert("Invalid User Role");

    }
}


// ===============================
// LOGOUT
// ===============================

function logout() {

    localStorage.removeItem(
        "loggedInUser"
    );

    window.location.href =
        "login.html";
}