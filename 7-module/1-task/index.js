import createElement from '../../assets/lib/create-element.js';
import categories from './categories.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon');
    this.render(categories);

    this.elem.addEventListener('click', (event) => this.onClick(event));

  }

  render(categories){
    let btn_left = document.createElement('button');
    this.elem.append(btn_left);
    btn_left.classList.add('ribbon__arrow');
    btn_left.classList.add('ribbon__arrow_left'); 
    
    btn_left.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;

    let ribbonInner = document.createElement('nav');
    this.elem.append(ribbonInner);
    ribbonInner.classList.add('ribbon__inner');

    categories.forEach(category => {
      ribbonInner.innerHTML += `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>\n`;
    });

    let btn_right = document.createElement('button');
    this.elem.append(btn_right);
    btn_right.classList.add('ribbon__arrow');
    btn_right.classList.add('ribbon__arrow_right'); 
    btn_right.classList.add('ribbon__arrow_visible');
    btn_right.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;
    
    ribbonInner.onscroll = function(){
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;   
      //console.log('scrollWidth:', scrollWidth, 'scrollLeft:', scrollLeft,'clientWidth:', clientWidth,'scrollRight:', scrollRight );
      
      if (scrollLeft === 0) {
        btn_left.classList.remove('ribbon__arrow_visible');
      } else {
        btn_left.classList.add('ribbon__arrow_visible');
      }
      if (scrollRight < 1) {
        btn_right.classList.remove('ribbon__arrow_visible');
      } else {
        btn_right.classList.add('ribbon__arrow_visible');
      }
    } 

    btn_left.onclick = function() {
      ribbonInner.scrollBy(-350, 0);
    }
    btn_right.onclick = function() {
      ribbonInner.scrollBy(350, 0);
    }
    
    
    ribbonInner.onclick = function(event) {
      if (event.target.nodeName != 'A') return;
      
      event.preventDefault();
      let activeItem = ribbonInner.querySelector('.ribbon__item_active');

      if (activeItem) {
        activeItem.classList.remove('ribbon__item_active');
      }
      
      event.target.classList.add('ribbon__item_active');
      
    }; 


  }
    
    onClick(event) {
      
      let chosenCategory = event.target.closest('.ribbon__item');
      if (!chosenCategory) {
        return;
      }
      console.log(chosenCategory.getAttribute('data-id'));

      let customEvent = new CustomEvent("ribbon-select", { 
        detail: chosenCategory.getAttribute('data-id'), 
        bubbles: true 
      });
      this.elem.dispatchEvent(customEvent);
  
      
      console.log(customEvent);
    }
    
    
    
}  


let ribbonMenu = new RibbonMenu(categories);
console.log(ribbonMenu.elem); 



