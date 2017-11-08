document.onreadystatechange = function () {
  var product_name = document.getElementsByName('product_name');
  var ingredients = document.getElementsByName('ingredients');
  var product_description = document.getElementById('product_description');
  var category = document.getElementsByName('category');
  var product_picture = document.getElementsByName('product_picture');
  document.getElementById("btn").onclick = function(event){
    console.log('un clic est senti');
    console.log(product_name);
    console.log(product_description);
    console.log(product_description[0]);
    console.log(product_description[0].value);
    if (product_name[0].value.length > 55) {
      event.preventDefault();
      product_name[0].style.border= "2px solid orange";
    }
    if (ingredients[0].value.length > 255) {
      event.preventDefault();
      ingredients[0].style.border= "2px solid orange";
    }
    if (product_description[0].value.length > 255) {
      event.preventDefault();
      product_description[0].style.border= "5px solid orange";
    }
    if (category[0].value.length > 255) {
      event.preventDefault();
      category[0].style.border= "2px solid orange";
    }
    if (product_picture[0].value.length > 255) {
      event.preventDefault();
      product_picture[0].style.border= "2px solid orange";
    }
  };
}
