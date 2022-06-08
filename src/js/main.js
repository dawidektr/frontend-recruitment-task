let counter = localStorage.getItem("counter") || 0;
const button = document.querySelector(".section__button");
const modalReset = document.querySelector(".modal__reset");
modalReset.addEventListener("click", () => {
  counter = 0;
  modalReset.style.display = "none";
  modalCounter.textContent = `0 times`;
  localStorage.setItem("counter", counter);
});
const modalCounter = document.querySelector(".modal__counter");
// button.addEventListener("click", () => alert("Kliknąłeś w buttona"));

var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.querySelector(".close");

// When the user clicks the button, open the modal
button.addEventListener("click", () => {
  counter++;
  if (counter >= 5) modalReset.style.display = "block";
  modal.style.display = "block";
  modalCounter.textContent = `${counter} times`;
  localStorage.setItem("counter", counter);
  const element = document.getElementsByTagName("table");

  generateTable();
});

// button.onclick = () => {};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let users;

const table = document.createElement("table");

const getData = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) {
      throw new Error(`Http error: ${res.status}`);
    }
    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
};

const generateTable = () => {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  table.appendChild(thead);
  table.appendChild(tbody);
  const row_1 = document.createElement("tr");
  const heading_1 = document.createElement("th");
  heading_1.innerHTML = "Name & Surname";
  const heading_2 = document.createElement("th");
  heading_2.innerHTML = "Email";
  const heading_3 = document.createElement("th");
  heading_3.innerHTML = "Address";
  const heading_4 = document.createElement("th");
  heading_4.innerHTML = "Phone number";
  const heading_5 = document.createElement("th");
  heading_5.innerHTML = "Company";
  row_1.appendChild(heading_1);
  row_1.appendChild(heading_2);
  row_1.appendChild(heading_3);
  row_1.appendChild(heading_4);
  row_1.appendChild(heading_5);
  thead.appendChild(row_1);
  (async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) {
        throw new Error(`Http error: ${res.status}`);
      }
      const json = await res.json();
      json.map((item) => {
        let tableRow = document.createElement("tr");
        let tD1 = document.createElement("td");
        tD1.innerHTML = item.name;
        let tD2 = document.createElement("td");
        tD2.innerHTML = item.email;
        let tD3 = document.createElement("td");
        tD3.innerHTML = `${item.address.city} ${item.address.street} ${item.address.suite}`;
        let tD4 = document.createElement("td");
        tD4.innerHTML = item.phone;
        let tD5 = document.createElement("td");
        tD5.innerHTML = item.company.name;
        tableRow.appendChild(tD1);
        tableRow.appendChild(tD2);
        tableRow.appendChild(tD3);
        tableRow.appendChild(tD4);
        tableRow.appendChild(tD5);
        tbody.appendChild(tableRow);
      });
    } catch (error) {
      console.error(error);
    }
  })();

  document.querySelector(".modal-content").appendChild(table);
};
