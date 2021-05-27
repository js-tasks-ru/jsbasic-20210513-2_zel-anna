function camelize(str) {
  let result; 
  let newArrays = [];
  let strArrays = str.split('-');
 
  for (strArray of strArrays) {
    if (strArray) {
      strArray = strArray[0].toUpperCase() + strArray.slice(1);
    }
    newArrays.push(strArray); 
  }
  newArrays[0] = newArrays[0].toLowerCase();

  result = newArrays.join('');
  console.log(result);
 
  return result;

}
