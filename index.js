document.addEventListener("DOMContentLoaded", function () {
  const userTableBody = document.getElementById("userTableBody");
  const userData = JSON.parse(localStorage.getItem("userData")) || [];

  userData.forEach(addRowToTable);

  document
    .getElementById("userForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const dob = document.getElementById("dob").value;
      const acceptedTerms = document.getElementById("terms").checked;

      const age = calculateAge(dob);
      if (age < 18 || age > 55) {
        alert("You must be between 18 and 55 years old.");
        return;
      }

      const userEntry = { name, email, password, dob, acceptedTerms };
      userData.push(userEntry);
      localStorage.setItem("userData", JSON.stringify(userData));

      addRowToTable(userEntry);
      document.getElementById("userForm").reset();
    });

  function addRowToTable(user) {
    const newRow = userTableBody.insertRow();
    newRow.insertCell(0).textContent = user.name;
    newRow.insertCell(1).textContent = user.email;
    newRow.insertCell(2).textContent = user.password;
    newRow.insertCell(3).textContent = user.dob;
    newRow.insertCell(4).textContent = user.acceptedTerms ? "true" : "false";
  }

  function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }
});
