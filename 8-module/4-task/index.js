import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) { 
    let cartItem = this.cartItems.find(item => item.product.id === product.id);
    if (!cartItem) {
      cartItem = { product: product, count: 1 };
      this.cartItems.push(cartItem);
    } else {
      cartItem.count += 1;
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let index;
    let cartItem = this.cartItems.find((item, i) => {
      index = i;
      return item.product.id === productId;
    });
    cartItem.count += amount;
    if (cartItem.count === 0) {
      this.cartItems.splice(index,1);   
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return !(this.cartItems.length);
  }

  getTotalCount() {
    return this.cartItems.reduce((acc, cartItem) => {
      acc += cartItem.count;
      return acc;
    }, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((acc, cartItem) => {
      acc += cartItem.count * cartItem.product.price;
      return acc;
    }, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.open();
    this.modal.setTitle('Your order');
    let modalBody = document.createElement('div');
  
    let divProducts = '';
    this.cartItems.forEach(
        cartItem => divProducts += this.renderProduct(cartItem.product, cartItem.count).outerHTML
    );
    modalBody.innerHTML = `<div>${divProducts}${this.renderOrderForm().outerHTML}</div>`
    this.modal.setBody(modalBody);
    this.modalBody = modalBody;

    let divCardProduct = document.body.querySelector('.cart-product');
    divCardProduct.addEventListener('click', (event) => this.onClick(event));
    this.form = document.querySelector('.cart-form');
    this.form.addEventListener('submit', (event) => this.onSubmit(event));
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if(document.body.classList.contains('is-modal-open')) {

      let productCount = document.body.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`);

      let productPrice = document.body.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`);

      let infoPrice = document.body.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;

      productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;

      let totalCount = this.cartItems.reduce(
        (acc, item) => {
          acc += item.product.price * item.count;
          return acc;
        }, 0);
      infoPrice.innerHTML = `€${totalCount.toFixed(2)}`;
      if (!this.cartItems.length) {
        this.modal.close();
        return;
      }
    }
  }

  onSubmit(event) {
    event.preventDefault(); 
    document.querySelector('[type="submit"]').classList.add('is-loading');

    let response =  fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(this.form)
    });

    if (response) {
      this.modal.setTitle('Success!');
      this.cartItems.length = 0; 
      this.modalBody.innerHTML = `<div class="modal__body-inner">
                                    <p>
                                      Order successful! Your order is being cooked :) <br>
                                      We’ll notify you about delivery time shortly.<br>
                                      <img src="/assets/images/delivery.gif">
                                    </p>
                                  </div>`;
    }
    this.modal.setBody(this.modalBody);
  }

  

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
  onClick(event) {
    if (event.target.closest('.cart-counter__button_minus')) {
      this.updateProductCount(event.target.closest('.cart-product').dataset.productId, -1);
    } else if (event.target.closest('.cart-counter__button_plus')) {
      this.updateProductCount(event.target.closest('.cart-product').dataset.productId, 1);
    } 
  }
}

