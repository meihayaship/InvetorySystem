// Fetch inventory and sales data from localStorage
const inventoryData = JSON.parse(localStorage.getItem('inventory')) || [];
const salesData = JSON.parse(localStorage.getItem('sales')) || [];

// Calculate Total Value in Inventory
const totalInventoryValue = inventoryData.reduce((sum, item) => sum + (item.price), 0);

// Calculate Total Sale Value in Sales
const totalSalesValue = salesData.reduce((sum, sale) => sum + (sale.quantity * sale.price), 0);

// Calculate Earn
const earn =  totalSalesValue - totalInventoryValue;

// Update Earn Table
const earnTable = document.getElementById('earnTable');
earnTable.innerHTML = `
  <tr>
    <td style="color: ${earn >= 0 ? 'green' : 'red'}; font-weight: bold;">
      ₱${earn.toFixed(2)}
    </td>
  </tr>
`;

// Update Inventory and Sales Tables
const inventoryTable = document.getElementById('inventoryTable');
inventoryTable.innerHTML = `
  <tr>
    <td>₱${totalInventoryValue.toFixed(2)}</td>
  </tr>
`;

const salesTable = document.getElementById('salesTable');
salesTable.innerHTML = `
  <tr>
    <td>₱${totalSalesValue.toFixed(2)}</td>
  </tr>
`;

// Calculate total number of sacks and total weight in kilograms from inventory
const totalSacks = inventoryData.reduce((sum, item) => sum + item.quantity, 0);
const totalInventoryWeightKg = totalSacks * 50; // Each sack is equivalent to 50kg

// Calculate total quantity sold (kg) from sales
const totalQuantitySoldKg = salesData.reduce((sum, sale) => sum + sale.quantity, 0);

// Calculate available stocks (kg)
const availableStocksKg = totalInventoryWeightKg - totalQuantitySoldKg;

// Update the summary section
document.getElementById('inventoryWeight').textContent = `${totalInventoryWeightKg} kg`;
document.getElementById('quantitySold').textContent = `${totalQuantitySoldKg} kg`;
document.getElementById('availableStocks').textContent = `${availableStocksKg} kg`;

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.sidebar').classList.toggle('dark-mode');
  document.querySelector('.container').classList.toggle('dark-mode');
  document.querySelectorAll('table').forEach(table => table.classList.toggle('dark-mode'));

  // Update button text
  if (document.body.classList.contains('dark-mode')) {
    themeToggle.textContent = 'Switch to Light Mode';
  } else {
    themeToggle.textContent = 'Switch to Dark Mode';
  }
});