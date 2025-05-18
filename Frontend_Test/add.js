document.addEventListener("DOMContentLoaded", function () {
  const addForm = document.getElementById("addForm");

  addForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const newData = {
      number: document.getElementById("addNumber").value,
      name: document.getElementById("addName").value,
      address: document.getElementById("addAddress").value,
      year: document.getElementById("addYear").value,
      capacities: document.getElementById("addCapacities").value,
      color: document.getElementById("addColor").value,
      fuelType: document.getElementById("addFuelType").value,
      merk: document.getElementById("addMerk").value,
    };

    fetch("http://localhost:8080/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Data berhasil ditambahkan!");
          window.location.href = "index.html"; 
        } else {
          alert("Gagal menambahkan data");
        }
      })
      .catch((error) => {
        console.error("Error adding data:", error);
        alert("Terjadi kesalahan saat menambahkan data");
      });
  });
});