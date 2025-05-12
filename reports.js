const reportsTable = document.getElementById('reportsTable');

// Example reports data
const reportsData = [
  { type: 'Inventory Summary', description: 'Overview of current inventory levels.' },
  { type: 'Sales Report', description: 'Detailed report of sales transactions.' },
  { type: 'Profit Analysis', description: 'Analysis of profits based on sales and inventory costs.' },
];

// Populate the reports table
reportsData.forEach(report => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td data-label="Report Type">${report.type}</td>
    <td data-label="Description">${report.description}</td>
    <td data-label="Actions">
      <button class="viewReportBtn">View</button>
    </td>
  `;
  reportsTable.appendChild(row);
});

// Handle "View" button clicks
reportsTable.addEventListener('click', function (e) {
  const target = e.target;
  if (target.classList.contains('viewReportBtn')) {
    const reportType = target.closest('tr').querySelector('td').innerText;
    alert(`Viewing report: ${reportType}`);
    // Add logic to display or download the report
  }
});

// Fetch inventory data from localStorage
const inventoryData = JSON.parse(localStorage.getItem('inventory')) || [];
const salesData = JSON.parse(localStorage.getItem('sales')) || [];

// Group inventory data by month
const groupedInventory = groupInventoryByMonth(inventoryData);
const groupedSales = groupSalesByMonth(salesData);

// Helper function to group data by month
function groupInventoryByMonth(data) {
  const grouped = {};
  data.forEach(item => {
    const date = new Date(item.timestamp);
    const month = date.toLocaleString('default', { month: 'long' }); // Full month name (e.g., "January")
    if (!grouped[month]) {
      grouped[month] = { totalValue: 0 };
    }
    grouped[month].totalValue += item.price ; // Calculate total value
  });
  return grouped;
}

function groupSalesByMonth(data) {
  const grouped = {};
  data.forEach(sale => {
    const date = new Date(sale.timestamp); // Ensure the timestamp is correct
    const month = date.toLocaleString('default', { month: 'long' }); // Full month name (e.g., "January")
    if (!grouped[month]) {
      grouped[month] = { SalesValue: 0 };
    }
    grouped[month].SalesValue += sale.quantity * sale.price; // Calculate total sale value
  });
  return grouped;
}

// Define all months from January to December
const months = [
  'January', 'February', 'March', 'April', 'May',
  'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

// Prepare data for the chart
const inventoryValues = months.map(month => groupedInventory[month]?.totalValue || 0); // Inventory values per month
const salesValues = months.map(month => groupedSales[month]?.SalesValue || 0); // Total sale value per month

// Create the inventory line chart
const ctx = document.getElementById('inventoryChart').getContext('2d');
const inventoryChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: months, // Months from January to December as X-axis labels
    datasets: [
      {
        label: 'Inventory Total Value (₱)',
        data: inventoryValues,
        borderColor: 'rgba(54, 162, 235, 1)', // Blue line
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue fill
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Total Sale Value (₱)',
        data: salesValues, // Use the calculated salesValues array
        borderColor: 'rgba(255, 99, 132, 1)', // Red line
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light red fill
        borderWidth: 2,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Values (₱)',
        },
        ticks: {
          callback: function (value) {
            return `₱${value}`; // Format the tick values with a currency symbol
          },
        },
        max: Math.max(...salesValues, ...inventoryValues) * 1.5, // Set the max value to 1.5x the highest value
      },
      x: {
        title: {
          display: true,
          text: 'Months (January to December)',
        },
      },
    },
  },
});

// Create the sales line chart
const ctxSales = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctxSales, {
  type: 'line',
  data: {
    labels: months, // Months from January to December as X-axis labels
    datasets: [
      {
        label: 'Total Sale Value (₱)',
        data: salesValues, // Use the calculated salesValues array
        borderColor: 'rgba(255, 99, 132, 1)', // Red line
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light red fill
        borderWidth: 2,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Values (₱)',
        },
        ticks: {
          callback: function (value) {
            return `₱${value}`; // Format the tick values with a currency symbol
          },
        },
        max: Math.max(...salesValues) * 1.5, // Set the max value to 1.5x the highest value
      },
      x: {
        title: {
          display: true,
          text: 'Months (January to December)',
        },
      },
    },
  },
});