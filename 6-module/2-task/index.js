import createElement from '../../assets/lib/create-element.js';

let product = {
  name: "Laab kai chicken salad", // название товара
  price: 10, // цена товара
  category: "salads", // категория, к которой он относится, нам это понадобится чуть позже
  image: "laab_kai_chicken_salad.png", // название картинки товара
  id: "laab-kai-chicken-salad" // уникальный идентификатор товара, нужен для добавления товара в корзину
}

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = document.createElement('div');
    this.elem.classList.add('card');
    this.render(product);

    this.elem.addEventListener('click', (event) => this.onClick(event));
    
  }
  render(product){
    let divTop = document.createElement('div');
    this.elem.append(divTop);
    divTop.classList.add('card__top'); 
    divTop.innerHTML = `<img src="/assets/images/products/${product.image}" class="card__image" alt="product"><span class="card__price">€${(product.price).toFixed(2)}</span>`;

    let divBody = document.createElement('div');
    this.elem.append(divBody);
    divBody.classList.add('card__body');
    divBody.innerHTML = `<div class="card__title">${product.name}</div><button type="button" class="card__button"><img src="/assets/images/icons/plus-icon.svg" alt="icon"></button>`;

  }

  onClick(event) {
    let button = event.target.closest('.card__button');
    console.log(event);
    if (!button) {
      return;
    }
    let customEvent = new CustomEvent("product-add", { 
      detail: this.product.id, 
      bubbles: true 
    });
    this.elem.dispatchEvent(customEvent);

    
    console.log(customEvent);
  }
  
  
  
  
}

//let productCard = new ProductCard(product);
//console.log(productCard.elem); // корневой HTML элемента карточки товара



