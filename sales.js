const salesForm = document.getElementById('salesForm');
const salesTable = document.getElementById('salesTable');

// Load sales data from localStorage
let salesData = JSON.parse(localStorage.getItem('sales')) || [];

// Render sales table rows
function renderSalesTable() {
  salesTable.innerHTML = '';
  salesData.forEach((sale, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td data-label="Rice Type">${sale.name}</td>
      <td data-label="Quantity Sold (kg)">${sale.quantity}</td>
      <td data-label="Selling Price per kg">₱${sale.price.toFixed(2)}</td>
      <td data-label="Total Sale Value">₱${(sale.quantity * sale.price).toFixed(2)}</td>
      <td data-label="Actions">
        <button class="deleteSaleBtn" data-index="${index}">Delete</button>
      </td>
    `;
    salesTable.appendChild(row);
  });
}

// Save sales data to localStorage
function saveSalesData() {
  localStorage.setItem('sales', JSON.stringify(salesData));
}

// Handle form submission
salesForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('saleItemName').value;
  const quantity = parseFloat(document.getElementById('saleQuantity').value);
  const price = parseFloat(document.getElementById('salePrice').value);

  // Check if the sale item with the same name and price already exists
  const existingSale = salesData.find(
    sale => sale.name.toLowerCase() === name.toLowerCase() && sale.price === price
  );

  if (existingSale) {
    // Update the existing sale's quantity
    existingSale.quantity += quantity;
    (`Updated ${name}: Quantity Sold is now ${existingSale.quantity} kg.`);
  } else {
    // Add new sale to salesData
    salesData.push({ name, quantity, price });
  }

  saveSalesData();
  renderSalesTable();

  // Reset the form
  salesForm.reset();
});

// Handle delete button clicks
salesTable.addEventListener('click', function (e) {
  if (e.target.classList.contains('deleteSaleBtn')) {
    const index = e.target.getAttribute('data-index');
    salesData.splice(index, 1);
    saveSalesData();
    renderSalesTable();
  }
});

// Initial render
renderSalesTable();