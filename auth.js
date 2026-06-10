// REGISTER

function registerUser() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let message = document.getElementById("message");

    const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if(name === "" || email === "" || password === "" || confirmPassword === ""){

        message.innerHTML =
        "<p class='error'>All fields are required.</p>";

        return;
    }

    if(!passwordRegex.test(password)){

        message.innerHTML =
        "<p class='error'>Password must contain uppercase, lowercase, number and special character.</p>";

        return;
    }

    if(password !== confirmPassword){

        message.innerHTML =
        "<p class='error'>Passwords do not match.</p>";

        return;
    }

    let users =
    JSON.parse(localStorage.getItem("users")) || [];

    let existingUser =
    users.find(user => user.email === email);

    if(existingUser){

        message.innerHTML =
        "<p class='error'>Email already exists.</p>";

        return;
    }

    const user = {
        id: Date.now(),
        name: name,
        email: email,
        password: password
    };

    users.push(user);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    message.innerHTML =
    "<p class='success'>Registration Successful!</p>";

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 1500);
}


// LOGIN

function loginUser() {

    let email =
    document.getElementById("loginEmail").value.trim();

    let password =
    document.getElementById("loginPassword").value;

    let message =
    document.getElementById("message");

    let users =
    JSON.parse(localStorage.getItem("users")) || [];

    let user =
    users.find(
        u => u.email === email &&
        u.password === password
    );

    if(user){

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );

        window.location.href =
        "pages/dashboard.html";

    }else{

        message.innerHTML =
        "<p class='error'>Invalid Email or Password.</p>";
    }
}


// DASHBOARD

if(window.location.pathname.includes("dashboard.html")){

    let user =
    JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    if(!user){

        window.location.href =
        "../index.html";

    }else{

        document.getElementById("welcome").innerText =
        "Welcome, " + user.name;
    }
}


// LOGOUT

function logout(){

    localStorage.removeItem("loggedInUser");

    window.location.href =
    "../index.html";
}