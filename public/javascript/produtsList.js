document.getElementById("fetchProducts").addEventListener("click", () => {
  fetch("/api/products")
    .then((response) => response.json())

    .then((products) => {
      // Clear any existing rows
      const tableBody = document.querySelector("#productsTable tbody");
      tableBody.innerHTML = "";

      // Loop through the products and add them to the table
      products.forEach((product) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="border border-gray-300 px-4 py-2">${product.name}</td>
            <td class="border border-gray-300 px-4 py-2">${product.SKU}</td>
            <td class="border border-gray-300 px-4 py-2">${product.price} kr</td>
          `;

        // Append the row to the table
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching products:", error));
});
