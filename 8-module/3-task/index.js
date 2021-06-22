export default class Cart {
  cartItems = []; // [product: {...}, count: N]
   
  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
     let cartItem = this.cartItems.find(item => item.product.id === product.id);
    if (!cartItem){
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

