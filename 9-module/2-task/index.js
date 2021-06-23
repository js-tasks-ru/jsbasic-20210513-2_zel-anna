import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    // ... ваш код
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        let carousel = new Carousel(slides);
        let carouselHolder = document.querySelector('[data-carousel-holder]');
        carouselHolder.append(carousel.elem); 

        let ribbonMenu = new RibbonMenu(categories);
        let ribbonHolder = document.querySelector('[data-ribbon-holder]');
        ribbonHolder.append(ribbonMenu.elem);  

        let stepSlider = new StepSlider({
          steps: 5,
          value: 3
        });
        let sliderHolder = document.querySelector('[data-slider-holder]');
        sliderHolder.append(stepSlider.elem); 
 
        let cartIcon = new CartIcon();
        let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
        cartIconHolder.append(cartIcon.elem); 

        let cart = new Cart(cartIcon);
        
        let response = await fetch('/9-module/2-task/products.json');

        if (response.ok) { 
          let json =  await response.json();
          console.log (json);

          let productsGrid = new ProductsGrid(json);
          let productsGridHolder = document.querySelector('[data-products-grid-holder]');
          productsGridHolder.append(productsGrid.elem); 


        } else {
            alert("Ошибка HTTP: " + response.status);
        }




        resolve('done');
      }, 0)
    });
 
  }
}
