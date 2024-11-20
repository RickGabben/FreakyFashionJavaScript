document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newProduct");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Convert form data to JSON format

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send JSON data to the server
      });

      if (response.ok) {
        alert("Product added successfully!");
        window.location.href = "/admin/products"; // Redirect after success
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error("Error submitting the form:", err);
      alert("An error occurred while submitting the form.");
    }
  });
});
