
export default class StepSlider {
  
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = document.createElement('div');
    this.elem.classList.add('slider'); 
    
    this.elem.addEventListener('click', (event) => this.onClick(event));
    //this.elem.addEventListener('slider-change', (event) => this.onChange(event));
    
    this.render();
  }

  render(){
    let divThumb = document.createElement('div');
    this.elem.append(divThumb);
    divThumb.classList.add('slider__thumb'); 
    divThumb.style.cssText = "left: 0%;";
    divThumb.innerHTML = '<span class="slider__value"></span>';

    let divProgress = document.createElement('div');
    this.elem.append(divProgress);
    divProgress.classList.add('slider__progress'); 
    divProgress.style.cssText = "width: 0%;";
    
    let divSteps = document.createElement('div');
    this.elem.append(divSteps);
    divSteps.classList.add('slider__steps'); 
    //console.log(this.steps);
    for (let i=0; i<this.steps; i++) {
      
      if ( i === this.value ) {
        divSteps.innerHTML += `<span class="slider__step-active"></span>\n`;  
      } else {
        divSteps.innerHTML += `<span></span>\n`;
      }
    } 

  }

  onClick(event) {
    
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    if (this.previousValue === value) {
      return;
    }
    this.previousValue = value;
    let valuePercents = value / segments * 100;
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let steps = this.elem.querySelector('.slider__steps');
    //thumb.innerHTML =  `<span class="slider__value">${value}</span>`;
    thumb.querySelector('.slider__value').innerText = value;  //Записали новое значение внутрь элемента с классом slider__value

    for (let child of steps.children) {
      if (child.classList) {
        child.classList.remove('slider__step-active');
      }
    }
    steps.children[value].classList.add('slider__step-active'); //Визуально выделили шаг на слайдере
    //console.log(steps);
    thumb.style.left = `${valuePercents}%`; //Поменяли положение ползунка
    progress.style.width = `${valuePercents}%`; //Расширили закрашеную область до ползунка


    let customEvent = new CustomEvent('slider-change', { 
      detail: value, 
      bubbles: true 
    })
    this.elem.dispatchEvent(customEvent);

    
    console.log(customEvent);
  }

}
 
