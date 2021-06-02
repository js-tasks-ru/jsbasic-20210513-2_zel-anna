function initCarousel() {
  let currentSlide = 1;
  let arrowRight = document.querySelector('.carousel__arrow_right');
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let elem = document.querySelector('.carousel__inner');
  
  let widthSlide = elem.closest('.carousel__inner').offsetWidth;
  //console.log('>widthSlide', widthSlide);
  
  updateArrows();
  //console.log('>widthSlide', widthSlide);
  arrowRight.onclick = function() {
    //console.log('right clicked:', currentSlide);
    elem.style.transform = `translateX(-${ widthSlide * currentSlide }px)`;
    currentSlide += 1;
    //console.log('after shift:', elem.style.transform);
    //console.log(currentSlide);
    updateArrows();
  };
  
  arrowLeft.onclick = function() {
    //console.log('left clicked:', currentSlide);
    currentSlide -= 1;
    //console.log('after shift:', elem.style.transform);
    elem.style.transform = `translateX(-${ widthSlide * (currentSlide - 1) }px)`;
    //console.log(currentSlide);
    updateArrows();
  };
  
  function updateArrows() {
    if (currentSlide  <= 1 ) {
      arrowLeft.style.display = 'none';
      arrowRight.style.display = '';
    } else if (currentSlide  >= 4) {
      arrowRight.style.display = 'none';
      arrowLeft.style.display = '';  
    } else if (currentSlide == 2 || currentSlide == 3) {
      arrowLeft.style.display = '';
      arrowRight.style.display = '';
    }
  }
  
}

initCarousel(); 