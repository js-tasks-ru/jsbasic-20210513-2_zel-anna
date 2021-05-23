function sumSalary(salaries) {
  // ваш код...
  let sum = 0;
  for (let key in salaries) {
    //Проверяем, что это число и не NaN, Infinity,-Infinity
    if ((typeof salaries[key] === 'number') && isFinite(salaries[key])) {
      sum = sum + salaries[key];
    }
  }
  return (sum);
}
