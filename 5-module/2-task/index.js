function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  let div = document.querySelector('div');
  
  button.onclick = function() {
    return ((div.hidden) ? div.hidden = false : div.hidden = true);
  };
  
}
