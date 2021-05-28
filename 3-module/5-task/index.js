function getMinMax(str) {
  let result = {};
  let numbers = [];
  let min;
  let max;

  numbers = str.replace(/[^\d\-\.]/g, ',').split(",").filter(a => a.length).map(a => +a);
  
  min = Math.min(...numbers);
  max = Math.max(...numbers);
  result.min = min;
  result.max = max;
  
  return result;
}
