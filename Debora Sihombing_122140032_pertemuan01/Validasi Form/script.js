function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (name.length < 3) {
        alert("Nama harus lebih dari 3 karakter");
        return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Email tidak valid");
        return false;
    }
    if (password.length < 8) {
        alert("Password harus minimal 8 karakter");
        return false;
    }

    alert("Form berhasil dikirim!");
    return true;
}
