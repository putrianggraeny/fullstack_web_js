document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const number = urlParams.get("number"); 

  if (number) {
    fetch(`http://localhost:8080/api/data/detail/${number}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Data tidak ditemukan");
        }
        return response.json();
      })
      .then((data) => {
        document.getElementById("editNumber").value = data.number;
        document.getElementById("editName").value = data.name;
        document.getElementById("editMerk").value = data.merk;
        document.getElementById("editAddress").value = data.address;
        document.getElementById("editYear").value = data.year;
        document.getElementById("editCapacities").value = data.capacities;
        document.getElementById("editColor").value = data.color;
        document.getElementById("editFuelType").value = data.fuelType;
      })
      .catch((error) => {
        console.error("Error fetching data for edit:", error);
        alert(error.message);
      });
  } else {
    console.error("Number parameter is missing in the URL");
    alert("Number parameter is missing in the URL");
  }

  const editForm = document.getElementById("editForm");
  editForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const updatedData = {
      number: document.getElementById("editNumber").value,
      name: document.getElementById("editName").value,
      merk: document.getElementById("editMerk").value,
      address: document.getElementById("editAddress").value,
      year: document.getElementById("editYear").value,
      capacities: document.getElementById("editCapacities").value,
      color: document.getElementById("editColor").value,
      fuelType: document.getElementById("editFuelType").value,
    };

    fetch(`http://localhost:8080/api/data`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Data berhasil diupdate!");
          window.location.href = "index.html"; 
        } else {
          alert("Gagal mengupdate data");
        }
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  });
});