// Fetch inventory and sales data from localStorage
const inventoryData = JSON.parse(localStorage.getItem('inventory')) || [];
const salesData = JSON.parse(localStorage.getItem('sales')) || [];

// Calculate the total value of inventory
const totalInventoryValue = inventoryData.reduce((sum, item) => sum + (item.quantity * item.price), 0);

// Calculate the total sale value
const totalSalesValue = salesData.reduce((sum, sale) => sum + (sale.quantity * sale.price), 0);
const earnValue = totalSalesValue - totalInventoryValue;

// Display the total inventory value
const inventoryTable = document.getElementById('inventoryTable');
inventoryTable.innerHTML = `
  <tr>
    <td>₱${totalInventoryValue.toFixed(2)}</td>
  </tr>
`;

// Display the total sales value
const salesTable = document.getElementById('salesTable');
salesTable.innerHTML = `
  <tr>
    <td>₱${totalSalesValue.toFixed(2)}</td>
  </tr>
`;

document.getElementById('earnTable').innerHTML = `
  <tr>
    <td>₱${earnValue.toFixed(2)}</td>
  </tr>
`;

// Create the inventory bar chart
const inventoryCtx = document.getElementById('inventoryChart').getContext('2d');
const inventoryChart = new Chart(inventoryCtx, {
  type: 'bar',
  data: {
    labels: ['Total Inventory Value'], // Single label for total value
    datasets: [{
      label: 'Total Value (₱)',
      data: [totalInventoryValue], // Single data point for total value
      backgroundColor: 'rgba(54, 162, 235, 0.7)', // Blue
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Create the sales bar chart to show the total sales value
const salesChartCtx = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(salesChartCtx, {
  type: 'bar',
  data: {
    labels: ['Total Sales Value'], // Single label for the total sales value
    datasets: [{
      label: 'Total Sale Value (₱)',
      data: [totalSalesValue], // Single data point for the total sales value
      backgroundColor: 'rgba(255, 99, 132, 0.7)', // Red
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

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