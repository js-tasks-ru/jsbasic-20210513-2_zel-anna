import createElement from '../../assets/lib/create-element.js';
import categories from './categories.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.ribbonInner = document.createElement('nav');
    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon');
    this.render(categories);

    this.elem.addEventListener('click', (event) => this.onClick(event));
    this.ribbonInner.addEventListener( "scroll" , (event) => this.onScroll(event));
  }

  render(categories){
    this.btnLeft = document.createElement('button');
    this.elem.append(this.btnLeft);
    this.btnLeft.classList.add('ribbon__arrow');
    this.btnLeft.classList.add('ribbon__arrow_left');
    this.btnLeft.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;

    //let ribbonInner = document.createElement('nav');
    this.elem.append(this.ribbonInner);
    this.ribbonInner.classList.add('ribbon__inner');

    categories.forEach(category => {
      this.ribbonInner.innerHTML += `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>\n`;
    });

    this.btnRight = document.createElement('button');
    this.elem.append(this.btnRight);
    this.btnRight.classList.add('ribbon__arrow');
    this.btnRight.classList.add('ribbon__arrow_right'); 
    this.btnRight.classList.add('ribbon__arrow_visible');
    this.btnRight.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;

    this.btnLeft.onclick = () => {
      this.ribbonInner.scrollBy(-350, 0);
    }
    this.btnRight.onclick = () => {
      this.ribbonInner.scrollBy(350, 0);
    }
  }
    
    onClick(event) {
      if (event.target.nodeName != 'A') return;
      
      event.preventDefault();
      let activeItem = this.ribbonInner.querySelector('.ribbon__item_active');

      if (activeItem) {
        activeItem.classList.remove('ribbon__item_active');
      }
      
      event.target.classList.add('ribbon__item_active');


      
      let chosenCategory = event.target.closest('.ribbon__item');
      if (!chosenCategory) {
        return;
      }
      //console.log(chosenCategory.getAttribute('data-id'));

      let customEvent = new CustomEvent("ribbon-select", { 
        detail: chosenCategory.getAttribute('data-id'), 
        bubbles: true 
      });
      this.elem.dispatchEvent(customEvent);
  
      
      //console.log(customEvent);
    }

    onScroll (event) {
         let scrollWidth = this.ribbonInner.scrollWidth;
         let scrollLeft = this.ribbonInner.scrollLeft;
         let clientWidth = this.ribbonInner.clientWidth;
         let scrollRight = scrollWidth - scrollLeft - clientWidth;

         if (scrollLeft === 0) {
           this.btnLeft.classList.remove('ribbon__arrow_visible');
         } else {
          this.btnLeft.classList.add('ribbon__arrow_visible');
         }
         if (scrollRight < 1) {
          this.btnRight.classList.remove('ribbon__arrow_visible');
         } else {
          this.btnRight.classList.add('ribbon__arrow_visible');
         }
     }
    
}  


let ribbonMenu = new RibbonMenu(categories);
//console.log(ribbonMenu.elem); 



