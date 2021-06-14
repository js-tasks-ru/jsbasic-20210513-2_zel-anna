
export default class StepSlider {
  
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = document.createElement('div');
    this.elem.classList.add('slider'); 
    
    this.elem.addEventListener('click', (event) => this.onClick(event));
    this.elem.addEventListener('pointerdown', (event) => this.onPointerDown(event));
    this.elem.addEventListener('pointermove', (event) => this.onPointerMove(event));
    this.elem.addEventListener('pointerup', (event) => this.onPointerUp(event));

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
  move(event){
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    this.leftRelative = left / this.elem.offsetWidth;
    if (this.leftRelative < 0) {
      this.leftRelative = 0;
    }

    if (this.leftRelative > 1) {
      this.leftRelative = 1;
    } 
    
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');
    this.segments = this.steps - 1;
    this.approximateValue = this.leftRelative * this.segments;
    this.value = Math.round(this.approximateValue);
    this.thumb.querySelector('.slider__value').innerText = this.value;  //Записали новое значение внутрь элемента с классом slider__value

  }

  onClick(event) {
    this.move(event);
    
    let valuePercents = this.value / this.segments * 100;

    let sliderSteps = this.elem.querySelector('.slider__steps');
    
    for (let sliderStep of sliderSteps.children) {
      if (sliderStep.classList) {
        sliderStep.classList.remove('slider__step-active');
      }
    }
    sliderSteps.children[this.value].classList.add('slider__step-active'); //Визуально выделили шаг на слайдере
    this.thumb.style.left = `${valuePercents}%`; //Поменяли положение ползунка
    this.progress.style.width = `${valuePercents}%`; //Расширили закрашеную область до ползунка

    this.emitCustomEvent();
  }

  onPointerDown(event) {
    this.isDragging = true;
  }

  onPointerMove(event) {
    if (!this.isDragging) {
      return;
    }
    this.elem.classList.add('slider_dragging');
    this.move(event);
    
    let leftPercents = this.leftRelative * 100;
    
    this.thumb.ondragstart = () => false;

    this.thumb.style.left = `${leftPercents}%`; //Поменяли положение ползунка
    this.progress.style.width = `${leftPercents}%`;  //Расширили закрашеную область до ползунка
  }

  onPointerUp(event){
    this.isDragging = false;
    this.emitCustomEvent();
  }

  emitCustomEvent(){
    if (this.previousValue === this.value) {
      return;
    }
    this.previousValue = this.value;
    let customEvent = new CustomEvent('slider-change', {
      detail: this.value, 
      bubbles: true 
    });
    this.elem.dispatchEvent(customEvent);
  }

}

