document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const product = this.parentElement;
      const productName = product.querySelector('.product-name').textContent;
      const productPrice = parseFloat(product.querySelector('.product-price').textContent.replace('$', ''));
      const quantity = parseInt(product.querySelector('.quantity-input').value);
  
      if (quantity > 0) {
        let cartItem = document.querySelector(`#cart-items .cart-item[data-product="${productName}"]`);
        if (cartItem) {
          // 如果商品已存在于购物车，则更新数量
          const currentQuantity = parseInt(cartItem.querySelector('.cart-quantity').textContent.split('x')[0]);
          cartItem.querySelector('.cart-quantity').textContent = `${quantity + currentQuantity}x`;
          const itemPriceElement = cartItem.querySelector('.cart-item-price');
          itemPriceElement.textContent = `$${(productPrice * (quantity + currentQuantity)).toFixed(2)}`;
        } else {
          // 否则，添加新商品到购物车
          cartItem = `<li class="cart-item" data-product="${productName}">
            <span class="cart-item-name">${productName} x ${quantity}</span>
            <span class="cart-item-price">$${(productPrice * quantity).toFixed(2)}</span>
            <span class="cart-remove">Remove</span>
          </li>`;
          document.querySelector('#cart-items').insertAdjacentHTML('beforeend', cartItem);
          // 添加事件监听器以处理移除操作
          cartItem.querySelector('.cart-remove').addEventListener('click', removeFromCart);
        }
      }
    });
  });
  
  function removeFromCart(event) {
    event.target.parentElement.remove();
  }
// 新增变量用于跟踪总金额
let totalAmount = 0;

// 计算购物车总金额的函数
function updateTotal() {
  totalAmount = 0;
  const cartItems = document.querySelectorAll('#cart-items li');
  cartItems.forEach(item => {
    const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace('$', ''));
    const quantity = parseInt(item.querySelector('.cart-quantity').textContent.split('x')[0]);
    totalAmount += price * quantity;
  });
  document.querySelector('#total-value').textContent = totalAmount.toFixed(2);
}

// 添加Checkout按钮的点击事件
document.getElementById('checkout').addEventListener('click', () => {
  if (totalAmount > 0) {
    document.querySelector('#total-value').textContent = totalAmount.toFixed(2);
  }
});

// 添加Clear Cart按钮的点击事件
document.getElementById('clear-cart').addEventListener('click', () => {
  document.getElementById('cart-items').innerHTML = ''; // 清空购物车列表
  totalAmount = 0; // 重置总金额
  document.querySelector('#total-value').textContent = totalAmount.toFixed(2); // 更新总金额显示
});

// 更新添加商品到购物车时调用updateTotal函数
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    // ... 原有的添加商品逻辑 ...
    updateTotal(); // 在添加或更新购物车后更新总金额
  });
});

// 添加移除商品时调用updateTotal函数
function removeFromCart(event) {
  // ... 原有的移除商品逻辑 ...
  updateTotal(); // 在移除商品后更新总金额
}
document.getElementById('checkout').addEventListener('click', () => {
    updateTotal(); // 直接调用以确保显示的是最新的总金额
  });