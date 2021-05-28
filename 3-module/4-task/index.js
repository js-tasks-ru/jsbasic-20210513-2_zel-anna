function showSalary(users, age) {
  let newArrays = [];
  let userNameSalary;

  for (let user of users) {
    if (user.age <= age) {
      userNameSalary = user.name + ', ' + user.balance;
      newArrays.push(userNameSalary);
    } 
  }
    
  return newArrays.join('\n');
}
