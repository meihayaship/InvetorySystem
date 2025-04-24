const form = document.getElementById('inventoryForm');
const inventoryTable = document.getElementById('inventoryTable');
const clearBtn = document.getElementById('clearForm');
const lookupBtn = document.getElementById('lookupBtn');
const lookupInput = document.getElementById('lookupName');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('itemName').value;
  const quantity = parseFloat(document.getElementById('itemQuantity').value);
  const price = parseFloat(document.getElementById('itemPrice').value);
  const total = quantity * price;

  const row = document.createElement('tr');
  row.innerHTML = `
    <td data-label="Rice Type">${name}</td>
    <td data-label="Quantity (kg)">${quantity}</td>
    <td data-label="Price per kg">${price.toFixed(2)}</td>
    <td data-label="Total Value">${total.toFixed(2)}</td>
    <td data-label="Actions">
      <button class="editBtn">Edit</button>
      <button class="deleteBtn">Delete</button>
    </td>
  `;

  inventoryTable.appendChild(row);
  form.reset();
});

clearBtn.addEventListener('click', () => {
  form.reset();
});

inventoryTable.addEventListener('click', function (e) {
  const target = e.target;
  const row = target.closest('tr');

  if (target.classList.contains('editBtn')) {
    const cells = row.querySelectorAll('td');
    document.getElementById('itemName').value = cells[0].innerText;
    document.getElementById('itemQuantity').value = cells[1].innerText;
    document.getElementById('itemPrice').value = cells[2].innerText;
    row.remove();
  } else if (target.classList.contains('deleteBtn')) {
    row.remove();
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
