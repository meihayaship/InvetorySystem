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
      <td data-label="Quantity (sacks)">${item.quantity}</td> 
      <td data-label="Total Value">₱${ item.price.toFixed(2)}</td>
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

// Handle form submission
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('itemName').value;
  const quantity = parseFloat(document.getElementById('itemQuantity').value);
  const price = parseFloat(document.getElementById('itemPrice').value);

  // Check if the item already exists
  const existingItem = inventoryData.find(item => item.name.toLowerCase() === name.toLowerCase());
  if (existingItem) {
    // Update the existing item's quantity and total value
    existingItem.quantity += quantity;
    existingItem.price += price;
    (`Updated ${name}: Quantity is now ${existingItem.quantity} sacks.`);
    (`Updated ${name}: Quantity is now ${existingItem.prices} sacks.`);
  } else {
    // Add new item to inventory
    inventoryData.push({ name, quantity, price });
  }

  saveInventoryData();
  renderInventoryTable();
  form.reset();
});

// Handle Clear button
clearBtn.addEventListener('click', () => {
  form.reset();
});

// Handle table actions
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
  } else if (target.classList.contains('addBtn')) {
    const additionalQuantity = parseFloat(prompt('Enter the number of sacks to add:'));
    if (!isNaN(additionalQuantity) && additionalQuantity > 0) {
      inventoryData[index].quantity += additionalQuantity;
      saveInventoryData();
      renderInventoryTable();
    } else {
      alert('Please enter a valid number.');
    }
  }
});

// Handle Lookup functionality
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