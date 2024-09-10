async function backRequest(method, data) {
  switch (method) {
    case "post":
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const postOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data),
      };
      const response = await fetch(
        "http://127.0.0.1:8000/product/",
        postOptions
      );
      const result = response.status;
      return result;

    case "get":
      const getOptions = {
        method: "GET",
      };
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/product/",
          getOptions
        );
        const result = await response.json();
        return result;
      } catch {
        return "some error";
      }
  }
}

function resetTable() {
  const table = document.querySelector(".productTableBody");
  while (table.rows[0]) {
    table.deleteRow(0);
  }
}

async function getTableData() {
  const productsList = await backRequest("get");
  const table = document.querySelector(".productTableBody");
  if (typeof productsList == "object") {
    for (let i = 0; i < productsList.length; i++) {
      const tableString = document.createElement("tr");
      tableString.innerHTML = ` <tr>
                              <td>${productsList[i].id}</td>
                              <td>${productsList[i].name}</td>
                              <td>${productsList[i].description}</td>
                              <td>${productsList[i].price}</td>
                              </tr>`;
      table.appendChild(tableString);
    }
  } else {
    table.innerHTML = productsList;
  }
}

async function createNewProduct() {
  const productForm = document.getElementById("productForm");
  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(productForm);
    const postData = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
    };
    const result = await backRequest("post", postData);
    if (result == 400) {
      document.getElementById("errorP").innerHTML = "Some thing wrong";
    } else {
      document.getElementById("errorP").innerHTML = "";
      productForm.reset();
      resetTable();
      getTableData();
    }
  });
}

window.addEventListener("load", async function () {
  getTableData();
  createNewProduct();
});
