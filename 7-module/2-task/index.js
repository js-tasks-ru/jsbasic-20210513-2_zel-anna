import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = document.createElement('div');
    this.elem.classList.add('modal');
    this.body = document.querySelector('body');
    this.render(); 
    this.elem.addEventListener('click', (event) => this.onClick(event));
    document.addEventListener('keydown', (event) => this.onKeydown(event));

  }
  
  render() {
    let titleName;
    let modalBody; 
    let divOverlay = document.createElement('div');
    this.elem.append(divOverlay);
    divOverlay.classList.add('modal__overlay');
     
    let divInner = document.createElement('div');
    this.elem.append(divInner);
    divInner.classList.add('modal__inner');
    divInner.innerHTML = `<div class="modal__header">
                            <button type="button" class="modal__close">
                              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
                            </button>

                            <h3 class="modal__title">Вот сюда нужно добавлять заголовок</h3>
                          </div>

                          <div class="modal__body">A сюда нужно добавлять содержимое тела модального окна</div>`;
  }

  open() {
    let body = document.querySelector('body');
    body.append(this.elem);
    body.classList.add('is-modal-open');
    //console.log(body.outerHTML);
  }
  
  
  setTitle(titleName) {
    this.elem.querySelector('.modal__title').innerHTML = titleName;
  }

  setBody(modalBody) {
    console.log(modalBody.innerHTML);
    
    this.elem.querySelector('.modal__body').innerHTML = modalBody.outerHTML;
  }

  close() {
    this.elem.remove();
    this.body.classList.remove('is-modal-open');
  }
  
  onClick(event) {
    let btnClose = event.target.closest('.modal__close');
    console.log(event);
    if (!btnClose) {
      return;
    }
    //console.log('before:', this.body);
    this.close(); 
    //console.log('after:', this.body);
  } 

  onKeydown(event) {
      if (event.code === 'Escape') {
        this.close();
      }
    }
   
}


//console.log(modal.elem);




