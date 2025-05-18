document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const number = urlParams.get("number"); 

  if (number) {
    fetch(`http://localhost:8080/api/data/detail/${number}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Data not found"); 
        }
        return response.json();
      })
      .then((data) => {
        document.getElementById("detailNumber").textContent = data.number;
        document.getElementById("detailName").textContent = data.name;
        document.getElementById("detailMerk").textContent = data.merk;
        document.getElementById("detailAddress").textContent = data.address;
        document.getElementById("detailYear").textContent = data.year;
        document.getElementById("detailCapacities").textContent = data.capacities;
        document.getElementById("detailColor").textContent = data.color;
        document.getElementById("detailFuelType").textContent = data.fuelType;
      })
      .catch((error) => {
        console.error("Error fetching detail data:", error);
        alert(error.message); 
      });
  } else {
    console.error("Number parameter is missing in the URL");
    alert("Number parameter is missing in the URL");
  }
});