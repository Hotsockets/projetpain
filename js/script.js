var content = document.querySelector('#hamburger-content');
var sidebarBody = document.querySelector('#hamburger-sidebar-body');
var button = document.querySelector('#hamburger-button');
var overlay = document.querySelector('#hamburger-overlay');
var activatedClass = 'hamburger-activated';

sidebarBody.innerHTML = content.innerHTML;

button.addEventListener('click', function(e) {
	e.preventDefault();

	this.parentNode.classList.add(activatedClass);
});

button.addEventListener('keydown', function(e) {
	if (this.parentNode.classList.contains(activatedClass))
	{
		if (e.repeat === false && e.which === 27)
			this.parentNode.classList.remove(activatedClass);
	}
});

overlay.addEventListener('click', function(e) {
	e.preventDefault();

	this.parentNode.classList.remove(activatedClass);
});


  <!--LIGHTBOX -->
var modal = document.getElementById('myModal');

document
  .querySelectorAll('.lighboxImage')
  .forEach(function(el){
    el.onclick = function(){
        modal
          .style
          .display = "block";

        document
          .getElementById("img01")
          .src = this.src;

        document.getElementById("caption").innerHTML = this.alt;
    }
  });

// When the user clicks on <span> (x), close the modal
 document
  .getElementsByClassName("modal")[0]
  .onclick = function() {
		if (document.getElementsByClassName)
    modal.style.display = "none";
}


$(document).scroll(function(){ // écoute quand on scroll

	 // Valeur en Px de la position actuelle du navigateur
	if($(window).scrollTop() > 225){
		$('.nav').fadeIn(1000);
		$('.nav').removeClass('hide');
	}
	if ($(window).toggleClass('.hamburger-content')){
			$('.nav').addClass('hide');
	}
	 else {
		$('.nav').fadeOut(1000);
		$('.nav').addClass('hide');
	}

});
