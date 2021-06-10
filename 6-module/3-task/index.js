import createElement from '../../assets/lib/create-element.js';
import slides from './slides.js';

/*let slides = [
  {
    name: 'Penang shrimp', // Название товара со слайда
    price: 16, // Цена товара со слайда
    image: 'penang_shrimp.png', // Название файла картинки со слайда
    id: 'penang-shrimp' // Уникальный идентификатор товара со слайда
  },
  {
    name: 'Chicken cashew',
    price: 14,
    image: 'chicken_cashew.png',
    id: 'chicken-cashew'
  },
];*/

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');
    this.render(slides);
    setTimeout(() => this.initCarousel());
    this.elem.addEventListener('click', (event) => this.onClick(event));
  }

  render(slides){
    let divArrowRight = document.createElement('div');
    this.elem.append(divArrowRight);
    divArrowRight.classList.add('carousel__arrow');
    divArrowRight.classList.add('carousel__arrow_right'); 
    divArrowRight.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;

    let divArrowLeft = document.createElement('div');
    this.elem.append(divArrowLeft);
    divArrowLeft.classList.add('carousel__arrow'); 
    divArrowLeft.classList.add('carousel__arrow_left');
    divArrowLeft.innerHTML = `<img src="/assets/images/icons/angle-left-icon.svg" alt="icon">`;

    let divInner = document.createElement('div');
    this.elem.append(divInner);
    divInner.classList.add('carousel__inner'); 

    slides.forEach(slide => {
      let divSlide = document.createElement('div');
      divInner.append(divSlide);
      divSlide.classList.add('carousel__slide'); 
      divSlide.dataset.id = `${slide.id}`;
      divSlide.innerHTML = `<img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
        <span class="carousel__price">€${(slide.price).toFixed(2)}</span>
        <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>`;
      

    });
    

  }
  onClick(event) {
    let button = event.target.closest('.carousel__button');
    console.log(event);
    if (!button) {
      return;
    }
    let divSlide = event.target.closest('.carousel__slide');
    console.log(divSlide.getAttribute('data-id'));

    let customEvent = new CustomEvent("product-add", { 
      detail: divSlide.getAttribute('data-id'), 
      bubbles: true 
    });
    this.elem.dispatchEvent(customEvent);

    
    console.log(customEvent);
  } 

  /////// Вставляем функцию
  initCarousel() {
    let currentSlide = 1;
    let slidesNumber = this.slides.length;
    let arrowRight = document.querySelector('.carousel__arrow_right');
    let arrowLeft = document.querySelector('.carousel__arrow_left');
    let element = document.querySelector('.carousel__inner');
    if (!element) {
      console.log('Нет элемента');
      return;
    }
    
    let widthSlide = element.closest('.carousel__inner').offsetWidth;
    //console.log('>widthSlide', widthSlide);
    
    updateArrows();
    //console.log('>widthSlide', widthSlide);
    arrowRight.onclick = function() {
      //console.log('right clicked:', currentSlide);
      element.style.transform = `translateX(-${ widthSlide * currentSlide }px)`;
      currentSlide += 1;
      //console.log('after shift:', elem.style.transform);
      //console.log(currentSlide);
      updateArrows();
    };
    
    arrowLeft.onclick = function() {
      //console.log('left clicked:', currentSlide);
      currentSlide -= 1;
      //console.log('after shift:', elem.style.transform);
      element.style.transform = `translateX(-${ widthSlide * (currentSlide - 1) }px)`;
      //console.log(currentSlide);
      updateArrows();
    };
    
    
    function updateArrows() {
      if (currentSlide  <= 1 ) {
        arrowLeft.style.display = 'none';
        arrowRight.style.display = '';
      } else if (currentSlide  >= slidesNumber) {
        arrowRight.style.display = 'none';
        arrowLeft.style.display = '';  
      } else if (currentSlide >= 2 && currentSlide < (slidesNumber - 1)) {
        arrowLeft.style.display = '';
        arrowRight.style.display = '';
      }
    }
    
  }

  ///////


}

let carousel = new Carousel(slides);
console.log(carousel.elem); // Корневой HTML элемента карусели

