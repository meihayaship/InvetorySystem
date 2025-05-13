const reportsTable = document.getElementById('reportsTable');
const yearSelector = document.getElementById('yearSelector');
const ctx = document.getElementById('inventoryChart').getContext('2d');

// Fetch inventory and sales data from localStorage
const inventoryData = JSON.parse(localStorage.getItem('inventory')) || [];
const salesData = JSON.parse(localStorage.getItem('sales')) || [];

// Helper function to group data by month and year
function groupInvDataByMonthAndYear(data, year) {
  const grouped = {};
  data.forEach(item => {
    const date = new Date(item.timestamp);
    if (date.getFullYear() === year) {
      const month = date.toLocaleString('default', { month: 'long' }); // Full month name
      if (!grouped[month]) {
        grouped[month] = 0;
      }
      grouped[month] +=  item.price; // Calculate total value
    }
  });
  return grouped;
}
function groupSalesDataByMonthAndYear(data, year) {
  const grouped = {};
  data.forEach(item => {
    const date = new Date(item.timestamp);
    if (date.getFullYear() === year) {
      const month = date.toLocaleString('default', { month: 'long' }); // Full month name
      if (!grouped[month]) {
        grouped[month] = 0;
      }
      grouped[month] += item.quantity * item.price; // Calculate total value
    }
  });
  return grouped;
}

// Function to update the chart
function updateChart(year) {
  const groupedInventory = groupInvDataByMonthAndYear(inventoryData, year);
  const groupedSales = groupSalesDataByMonthAndYear(salesData, year);

  // Define all months from January to December
  const months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Prepare data for the chart
  const inventoryValues = months.map(month => groupedInventory[month] || 0);
  const salesValues = months.map(month => groupedSales[month] || 0);

  
  // Update the chart
  inventoryChart.data.labels = months;
  inventoryChart.data.datasets[0].data = inventoryValues;
  inventoryChart.data.datasets[1].data = salesValues;
  inventoryChart.update();
  
}

// Create the inventory line chart
const inventoryChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [], // Months will be dynamically added
    datasets: [
      {
        label: 'Inventory Total Value (₱)',
        data: [],
        borderColor: 'rgba(54, 162, 235, 1)', // Blue line
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue fill
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Total Sale Value (₱)',
        data: [],
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

// Event listener for year selection
yearSelector.addEventListener('change', () => {
  const selectedYear = parseInt(yearSelector.value, 10);
  updateChart(selectedYear);
});

// Initial render for the default year (2025)
updateChart(2025);