import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

let filters = {
  noNuts: true, // true/false
  vegeterianOnly: false, // true/false
  maxSpiciness: 3, // числа от 0 до 4
  category: 'soups' // уникальный идентификатор категории товара
};

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    
    this.elem = document.createElement('div');
    this.elem.classList.add('products-grid');
    this.render(products);

  }
  render(products){
    this.elem.innerHTML = '';
    let divGridInner = document.createElement('div');
    this.elem.append(divGridInner);
    divGridInner.classList.add('products-grid__inner');

    products.forEach(product => {
      let productInstance = new ProductCard(product);
      let divProduct = productInstance.elem;
      //let divProduct = document.createElement('div');
      divGridInner.append(divProduct);
      
      /* divProduct.classList.add('card');
      
      let divTop = document.createElement('div');
      divProduct.append(divTop);
      divTop.classList.add('card__top'); 
      divTop.innerHTML = `<img src="/assets/images/products/${product.image}" class="card__image" alt="product"><span class="card__price">€${(product.price).toFixed(2)}</span>`;

      let divBody = document.createElement('div');
      divProduct.append(divBody);
      divBody.classList.add('card__body');
      divBody.innerHTML = `<div class="card__title">${product.name}</div><button type="button" class="card__button"><img src="/assets/images/icons/plus-icon.svg" alt="icon"></button>`;
     */
    });

  }
  updateFilter(filters) {
    //console.log('Called');
     if (!this.filters) {
       this.filters = filters;
     } else {
       this.filters = {...this.filters, ...filters};
     }
    let newProducts = this.products.filter(product => {
      let isOkForNoNuts = (this.filters.noNuts && ((product.nuts === false) || (product.hasOwnProperty('nuts') === false))) || !this.filters.noNuts;
      let isOkForVegeterianOnly = (this.filters.vegeterianOnly && product.vegeterian === true) ||
        !this.filters.vegeterianOnly;
      let isOkForMaxSpiciness = (this.filters.maxSpiciness && product.spiciness <= this.filters.maxSpiciness) || !this.filters.maxSpiciness;
      let isOkForCategory = (this.filters.category && (product.category === this.filters.category)) || !this.filters.category;
      return isOkForNoNuts && isOkForVegeterianOnly && isOkForMaxSpiciness && isOkForCategory;
      //return isOkForMaxSpiciness;
    });
    //console.log(newProducts);
    return this.render(newProducts);
    //console.log(newProducts);
  }
}
