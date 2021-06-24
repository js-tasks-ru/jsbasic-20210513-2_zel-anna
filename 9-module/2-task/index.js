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
    
        let carousel = new Carousel(slides);
        let carouselHolder = document.querySelector('[data-carousel-holder]');
        carouselHolder.append(carousel.elem); 

        this.ribbonMenu = new RibbonMenu(categories);
        let ribbonHolder = document.querySelector('[data-ribbon-holder]');
        ribbonHolder.append(this.ribbonMenu.elem);  

        this.stepSlider = new StepSlider({
          steps: 5,
          value: 3
        });

        let sliderHolder = document.querySelector('[data-slider-holder]');
        sliderHolder.append(this.stepSlider.elem); 
 
        this.cartIcon = new CartIcon();
        let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
        cartIconHolder.append(this.cartIcon.elem); 

        this.cart = new Cart(this.cartIcon);
        
        let response = await fetch('/9-module/2-task/products.json');

        if (response.ok) { 
          let json =  await response.json();
          this.productsGrid = new ProductsGrid(json);
          let productsGridHolder = document.querySelector('[data-products-grid-holder]');
          productsGridHolder.append(this.productsGrid.elem); 
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
        
        this.productsGrid.updateFilter({
          noNuts: document.getElementById('nuts-checkbox').checked,
          vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
          maxSpiciness: this.stepSlider.value,
          category: this.ribbonMenu.value
        });

        document.body.addEventListener("product-add", (event) => this.handleProductAdd(event));
        this.stepSlider.elem.addEventListener("slider-change", (event) => this.handleSliderChange(event));
        this.ribbonMenu.elem.addEventListener("ribbon-select", (event) => this.handleRibbonSelect(event));
        let nutsCheckbox = document.getElementById('nuts-checkbox');
        nutsCheckbox.addEventListener("change", (event) => this.handleChange(event));
        let vegeterianCheckbox = document.getElementById('vegeterian-checkbox');
        vegeterianCheckbox.addEventListener("change", (event) => this.handleChange(event));
  }

  handleProductAdd(event) {
      console.log(event);
      let productId = event.detail;
//      console.log('>>>', productId, '<<<');
      let product = this.productsGrid.products.find(x => x.id === `${productId}`);
      this.cart.addProduct(product);  
  }

  handleSliderChange(event) {
    let value = event.target.children[0].children[0].innerHTML;
    //console.log ('catched slider-change');
    this.productsGrid.updateFilter({
      maxSpiciness: value
    });
  }

  handleRibbonSelect(event) {
    //console.log ('catched ribbon-select');
    console.log(event.detail);
    let categoryId = event.detail;
    this.productsGrid.updateFilter({
      category: categoryId 
    });
  }
  
  handleChange(event) {
    console.log ('catched changed');
    //console.log (event.target);
    let checked = event.target.value;
    if (event.target.id === 'nuts-checkbox') {
      this.productsGrid.updateFilter({
        noNuts: checked 
      });
    } else if (event.target.id === 'vegeterian-checkbox') {
        this.productsGrid.updateFilter({
          vegeterianOnly: checked 
        });
    }
  }

  
}
