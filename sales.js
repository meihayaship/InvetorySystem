const salesForm = document.getElementById('salesForm');
const salesTable = document.getElementById('salesTable');

salesForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('saleItemName').value;
  const quantity = parseFloat(document.getElementById('saleQuantity').value);
  const price = parseFloat(document.getElementById('salePrice').value);
  const total = quantity * price;

  const row = document.createElement('tr');
  row.innerHTML = `
    <td data-label="Rice Type">${name}</td>
    <td data-label="Quantity Sold (kg)">${quantity}</td>
    <td data-label="Selling Price per kg">${price.toFixed(2)}</td>
    <td data-label="Total Sale Value">${total.toFixed(2)}</td>
    <td data-label="Actions">
      <button class="deleteSaleBtn">Delete</button>
    </td>
  `;

  salesTable.appendChild(row);
  salesForm.reset();
});

salesTable.addEventListener('click', function (e) {
  const target = e.target;
  if (target.classList.contains('deleteSaleBtn')) {
    const row = target.closest('tr');
    row.remove();
  }
});