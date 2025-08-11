// New JavaScript for Riata Market website
// This script powers the navigation, footer year, and the unified shop & order page.

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Update the year in the footer dynamically
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  // Mobile navigation toggle for responsive menu
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }
  // If the shop & order form exists on the page, initialise it
  const orderForm = document.getElementById('order-form');
  if (orderForm) {
    initShopPage(orderForm);
  }
});

/**
 * Initialise the shop & order page.
 * Builds product lists, handles search, sets default pickup date/time,
 * updates order summary and manages form submission.
 * @param {HTMLFormElement} form The order form element on the page
 */
function initShopPage(form) {
  // Product catalogue organised by category. Each item has a unique id and name.
  const products = [
    // Spices & Masalas
    { id: 'turmeric', name: 'Turmeric Powder', category: 'spices' },
    { id: 'cumin-seeds', name: 'Cumin Seeds', category: 'spices' },
    { id: 'coriander-powder', name: 'Coriander Powder', category: 'spices' },
    { id: 'kashmiri-chili', name: 'Kashmiri Chili Powder', category: 'spices' },
    { id: 'garam-masala', name: 'Garam Masala', category: 'spices' },
    { id: 'mustard-seeds', name: 'Mustard Seeds', category: 'spices' },
    { id: 'fennel-seeds', name: 'Fennel Seeds', category: 'spices' },
    { id: 'curry-powder', name: 'Curry Powder', category: 'spices' },
    // Pulses & Lentils
    { id: 'toor-dal', name: 'Toor Dal', category: 'pulses' },
    { id: 'masoor-dal', name: 'Masoor Dal', category: 'pulses' },
    { id: 'rajma', name: 'Rajma (Kidney Beans)', category: 'pulses' },
    { id: 'chickpeas', name: 'Chickpeas (Chana)', category: 'pulses' },
    { id: 'chana-dal', name: 'Chana Dal', category: 'pulses' },
    { id: 'urad-dal', name: 'Urad Dal', category: 'pulses' },
    { id: 'moong-dal', name: 'Moong Dal', category: 'pulses' },
    { id: 'black-eyed-peas', name: 'Black‑eyed Peas', category: 'pulses' },
    // Rice & Flours
    { id: 'basmati-rice', name: 'Basmati Rice', category: 'rice' },
    { id: 'brown-basmati', name: 'Brown Basmati Rice', category: 'rice' },
    { id: 'rava', name: 'Rava (Sooji)', category: 'rice' },
    { id: 'poha', name: 'Poha (Flattened Rice)', category: 'rice' },
    { id: 'puffed-rice', name: 'Puffed Rice (Kurmura)', category: 'rice' },
    { id: 'millet-flour', name: 'Millet Flour', category: 'rice' },
    { id: 'besan', name: 'Besan (Chickpea Flour)', category: 'rice' },
    { id: 'atta', name: 'Whole Wheat Atta', category: 'rice' },
    // Snacks & Essentials – combine Indian treats with convenience‑store staples
    { id: 'jaggery', name: 'Jaggery', category: 'snacks' },
    { id: 'tamarind', name: 'Tamarind', category: 'snacks' },
    { id: 'coconut-milk', name: 'Coconut Milk', category: 'snacks' },
    { id: 'golden-raisins', name: 'Golden Raisins', category: 'snacks' },
    { id: 'cashews', name: 'Cashews', category: 'snacks' },
    { id: 'pistachios', name: 'Pistachios', category: 'snacks' },
    { id: 'alphonso-pulp', name: 'Alphonso Mango Pulp', category: 'snacks' },
    // Convenience‑store snacks and basic groceries
    { id: 'chips', name: 'Chips (Lay’s, Doritos)', category: 'snacks' },
    { id: 'chocolate-bar', name: 'Chocolate Bar (Snickers, KitKat)', category: 'snacks' },
    { id: 'candy', name: 'Candy (Assorted)', category: 'snacks' },
    { id: 'cookies', name: 'Cookies (Oreos)', category: 'snacks' },
    { id: 'gum', name: 'Gum (Mint, Bubble)', category: 'snacks' },
    { id: 'bread', name: 'Bread (White & Wheat)', category: 'snacks' },
    { id: 'milk', name: 'Milk (Whole & 2%)', category: 'snacks' },
    { id: 'eggs', name: 'Eggs (Dozen)', category: 'snacks' },
    { id: 'canned-soup', name: 'Canned Soup', category: 'snacks' },
    { id: 'pasta', name: 'Pasta', category: 'snacks' },
    { id: 'cooking-oil', name: 'Cooking Oil', category: 'snacks' },
    { id: 'sugar', name: 'Sugar', category: 'snacks' },
    // Fresh Produce
    { id: 'curry-leaves', name: 'Curry Leaves', category: 'fresh' },
    { id: 'coriander-leaves', name: 'Coriander Leaves', category: 'fresh' },
    { id: 'mint-leaves', name: 'Mint Leaves', category: 'fresh' },
    { id: 'shredded-coconut', name: 'Shredded Coconut', category: 'fresh' },
    { id: 'green-chillies', name: 'Green Chillies', category: 'fresh' },
    // Drinks & Alcohol – focus on convenience store beverages
    { id: 'soft-drinks', name: 'Soft Drinks (Coke, Sprite, etc.)', category: 'drinks' },
    { id: 'energy-drink', name: 'Energy Drink (Red Bull)', category: 'drinks' },
    { id: 'bottled-water', name: 'Bottled Water', category: 'drinks' },
    { id: 'juice-box', name: 'Juice Boxes (Assorted)', category: 'drinks' },
    { id: 'beer', name: 'Beer (various brands)', category: 'drinks' },
    { id: 'wine', name: 'Wine (Red & White)', category: 'drinks' },
    // Additional packaged beverages and cocktails found in convenience stores
    { id: 'sports-drink', name: 'Sports Drink (Gatorade)', category: 'drinks' },
    { id: 'cold-coffee', name: 'Iced Coffee (Bottled)', category: 'drinks' },
    { id: 'bottled-tea', name: 'Bottled Tea', category: 'drinks' },
    { id: 'ready-cocktail', name: 'Ready‑to‑Drink Cocktail', category: 'drinks' },
    { id: 'masala-chai', name: 'Masala Chai', category: 'drinks' },
    { id: 'lassi', name: 'Lassi (Sweet/Salty)', category: 'drinks' }
  ];
  // Create cart with zero quantities for each item
  const cart = {};
  products.forEach(prod => { cart[prod.id] = 0; });
  // Map categories to their respective DOM containers
  const containers = {
    spices: document.getElementById('spices-list'),
    pulses: document.getElementById('pulses-list'),
    rice: document.getElementById('rice-list'),
    snacks: document.getElementById('snacks-list'),
    fresh: document.getElementById('fresh-list'),
    drinks: document.getElementById('drinks-list')
  };
  const summaryContainer = document.getElementById('order-summary');
  // Helper to build a product row with plus/minus controls
  function buildRow(product) {
    const row = document.createElement('div');
    row.className = 'order-item';
    row.dataset.id = product.id;
    const nameSpan = document.createElement('span');
    nameSpan.className = 'order-item-name';
    nameSpan.textContent = product.name;
    const controls = document.createElement('div');
    controls.className = 'qty-controls';
    const minusBtn = document.createElement('button');
    minusBtn.type = 'button';
    minusBtn.className = 'qty-minus';
    minusBtn.textContent = '−';
    const qtyInput = document.createElement('input');
    qtyInput.type = 'text';
    qtyInput.className = 'qty-value';
    qtyInput.readOnly = true;
    qtyInput.value = '0';
    const plusBtn = document.createElement('button');
    plusBtn.type = 'button';
    plusBtn.className = 'qty-plus';
    plusBtn.textContent = '+';
    controls.appendChild(minusBtn);
    controls.appendChild(qtyInput);
    controls.appendChild(plusBtn);
    row.appendChild(nameSpan);
    row.appendChild(controls);
    // Click handlers to adjust quantities
    plusBtn.addEventListener('click', () => {
      cart[product.id] += 1;
      qtyInput.value = cart[product.id];
      updateSummary();
    });
    minusBtn.addEventListener('click', () => {
      if (cart[product.id] > 0) {
        cart[product.id] -= 1;
        qtyInput.value = cart[product.id];
        updateSummary();
      }
    });
    return row;
  }
  // Populate each category list with its products
  products.forEach(prod => {
    const container = containers[prod.category];
    if (container) {
      container.appendChild(buildRow(prod));
    }
  });
  // Function to refresh the order summary box
  function updateSummary() {
    const selected = products.filter(p => cart[p.id] > 0);
    if (selected.length === 0) {
      summaryContainer.textContent = 'No items selected.';
      return;
    }
    const list = document.createElement('ul');
    selected.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = '<span>' + item.name + '</span><span>x ' + cart[item.id] + '</span>';
      list.appendChild(li);
    });
    summaryContainer.innerHTML = '';
    summaryContainer.appendChild(list);
  }
  // Search filter functionality
  const searchInput = document.getElementById('product-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      products.forEach(prod => {
        const el = document.querySelector('.order-item[data-id="' + prod.id + '"]');
        if (!el) return;
        if (!query || prod.name.toLowerCase().includes(query)) {
          el.style.display = '';
        } else {
          el.style.display = 'none';
        }
      });
      // Hide category sections if no items visible
      Object.keys(containers).forEach(cat => {
        const container = containers[cat];
        const visible = Array.from(container.children).some(child => child.style.display !== 'none');
        const section = document.getElementById(cat);
        if (section) {
          section.style.display = visible ? '' : 'none';
        }
      });
    });
  }
  // Set pickup date to today and time to half an hour from now
  const dateInput = document.getElementById('pickup-date');
  const timeInput = document.getElementById('pickup-time');
  if (dateInput) {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
    if (timeInput) {
      const halfHourLater = new Date(now.getTime() + 30 * 60000);
      const hrs = String(halfHourLater.getHours()).padStart(2, '0');
      const mins = String(halfHourLater.getMinutes()).padStart(2, '0');
      timeInput.value = hrs + ':' + mins;
    }
  }
  // Handle form submission for pickup orders
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    if (!name || !phone) {
      alert('Please provide your name and phone number.');
      return;
    }
    const chosen = products.filter(p => cart[p.id] > 0);
    if (chosen.length === 0) {
      alert('Please select at least one item to order.');
      return;
    }
    const dateVal = dateInput ? dateInput.value : '';
    const timeVal = timeInput ? timeInput.value : '';
    const itemsSummary = chosen.map(item => item.name + ' × ' + cart[item.id]).join(', ');
    const when = dateVal ? (' on ' + dateVal + (timeVal ? ' at ' + timeVal : '')) : '';
    alert('Thank you, ' + name + '! Your order (' + itemsSummary + ') is received for pickup' + when + '. We will contact you at ' + phone + '.');
    // Reset quantities and form after submission
    chosen.forEach(item => { cart[item.id] = 0; });
    document.querySelectorAll('.qty-value').forEach(inputEl => { inputEl.value = '0'; });
    updateSummary();
    form.reset();
    // Reset date and time inputs to new defaults
    if (dateInput) {
      dateInput.value = dateInput.min;
    }
    if (timeInput) {
      const nowReset = new Date();
      const nextReset = new Date(nowReset.getTime() + 30 * 60000);
      const hhReset = String(nextReset.getHours()).padStart(2, '0');
      const mmReset = String(nextReset.getMinutes()).padStart(2, '0');
      timeInput.value = hhReset + ':' + mmReset;
    }
  });
}