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

// Prepare data for the chart
const labels = inventoryData.map(item => item.name); // Rice types
const quantities = inventoryData.map(item => item.quantity); // Quantities

// Create the bar chart
const ctx = document.getElementById('inventoryChart').getContext('2d');
const inventoryChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Quantity (kg)',
      data: quantities,
      backgroundColor: 'rgba(183, 28, 28, 0.7)', // Deep red
      borderColor: 'rgba(183, 28, 28, 1)',
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