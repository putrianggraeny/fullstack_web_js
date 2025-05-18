document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "http://localhost:8080/api/data";
  const bodyTable = document.getElementById("bodyTable");

  function loadInitialData() {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data from API:", data); 
        if (data.length === 0) {
          console.log("No data found"); 
        }
        renderTable(data); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error); 
      });
  }

  function renderTable(data) {
    bodyTable.innerHTML = ""; 
    data.forEach((tech_test, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${tech_test.number}</td>
        <td>${tech_test.name}</td>
        <td>${tech_test.merk}</td>
        <td>${tech_test.year}</td>
        <td>${tech_test.capacities}</td>
        <td>${tech_test.color}</td>
        <td>${tech_test.fuelType}</td>
        <td>
          <button class="detail" onclick="showDetail('${tech_test.number}')">Detail</button>
          <button class="edit" onclick="editData('${tech_test.number}')">Edit</button>
          <button class="delete" onclick="deleteData('${tech_test.number}')">Delete</button>
        </td>
      `;
      bodyTable.appendChild(row);
    });
  }

  function searchData(number, name) {
    const searchUrl = `http://localhost:8080/api/data/search?number=${number}&name=${name}`;

    fetch(searchUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          alert("Data tidak ditemukan"); 
        }
        renderTable(data); 
      })
      .catch((error) => {
        console.error("Error searching data:", error);
        alert("Terjadi kesalahan saat mencari data");
      });
  }

  document.getElementById("searchButton").addEventListener("click", function () {
    const inputNumber = document.getElementById("inputNumber").value.trim(); 
    const inputName = document.getElementById("inputName").value.trim(); 

    if (inputNumber === "" && inputName === "") {
      loadInitialData();
    } else {
      searchData(inputNumber, inputName);
    }
  });

  document.getElementById("addButton").addEventListener("click", function () {
    window.location.href = "add.html";
  });

 
  loadInitialData();
});

 function showDetail(number) {
  window.location.href = `detail.html?number=${number}`;
}

function editData(number) {
  window.location.href = `edit.html?number=${number}`;
}

function deleteData(number) {
  if (confirm("Yakin ingin menghapus data " +number+ "?")) {
    fetch(`http://localhost:8080/api/data/${number}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Data deleted successfully");
          window.location.reload(); 
        } else {
          alert("Failed to delete data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}