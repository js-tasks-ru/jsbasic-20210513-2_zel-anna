function highlight(table) {
  for (let row of table.children[1].children) {
    
    switch (row.children[3].getAttribute('data-available')) {
    case 'true': row.classList.add('available');
      break;
    case 'false': row.classList.add('unavailable');
      break;
    default: row.hidden = true;
      break;
    }
     
    switch (row.children[2].innerHTML) {
    case 'm': row.classList.add('male');
      break;
    case 'f': row.classList.add('female'); 
      break;
    default: break;  
    }
    
    if (+(row.children[1].innerHTML) < 18) {
      row.style.textDecoration = 'line-through';  
    }
  }

}
