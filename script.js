const form = document.getElementById('inventoryForm');
const inventoryTable = document.getElementById('inventoryTable');
const clearBtn = document.getElementById('clearForm');
const lookupBtn = document.getElementById('lookupBtn');
const lookupInput = document.getElementById('lookupName');

// Load inventory data from localStorage
let inventoryData = JSON.parse(localStorage.getItem('inventory')) || [];

// Render inventory table rows
function renderInventoryTable() {
  inventoryTable.innerHTML = '';
  inventoryData.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td data-label="Rice Type">${item.name}</td>
      <td data-label="Quantity (kg)">${item.quantity}</td>
      <td data-label="Price per kg">${item.price.toFixed(2)}</td>
      <td data-label="Total Value">${(item.quantity * item.price).toFixed(2)}</td>
      <td data-label="Actions">
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
      </td>
    `;
    inventoryTable.appendChild(row);
  });
}

// Save inventory data to localStorage
function saveInventoryData() {
  localStorage.setItem('inventory', JSON.stringify(inventoryData));
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('itemName').value;
  const quantity = parseFloat(document.getElementById('itemQuantity').value);
  const price = parseFloat(document.getElementById('itemPrice').value);

  inventoryData.push({ name, quantity, price });
  saveInventoryData();
  renderInventoryTable();
  form.reset();
});

clearBtn.addEventListener('click', () => {
  form.reset();
});

inventoryTable.addEventListener('click', function (e) {
  const target = e.target;
  const row = target.closest('tr');
  const index = Array.from(inventoryTable.children).indexOf(row);

  if (target.classList.contains('editBtn')) {
    const item = inventoryData[index];
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemQuantity').value = item.quantity;
    document.getElementById('itemPrice').value = item.price;
    inventoryData.splice(index, 1);
    saveInventoryData();
    renderInventoryTable();
  } else if (target.classList.contains('deleteBtn')) {
    inventoryData.splice(index, 1);
    saveInventoryData();
    renderInventoryTable();
  }
});

lookupBtn.addEventListener('click', () => {
  const keyword = lookupInput.value.toLowerCase();
  const rows = inventoryTable.querySelectorAll('tr');
  rows.forEach(row => {
    const name = row.children[0].innerText.toLowerCase();
    row.style.display = name.includes(keyword) ? '' : 'none';
  });
});

// Initial render
renderInventoryTable();
