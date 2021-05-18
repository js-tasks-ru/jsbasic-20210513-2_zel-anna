function ucFirst(str) {
  // ваш код...
  if (str === "") {
    return ("");
  } else {
    return (str[0].toUpperCase() + str.substr(1));
  }
}
