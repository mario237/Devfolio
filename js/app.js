const headerElement = document.getElementById('homeSection');
const topNavbar = document.getElementById('topNav');
const allSections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('nav ul li a');


function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;
  
    while(el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }
  
    return (
      top < (window.pageYOffset + window.innerHeight) &&
      (top + height) > window.pageYOffset
    );
}


function scrollToSection(event){
    event.preventDefault();
    var currentId = event.target.attributes.href.value;
    var section = document.querySelector(currentId);
    var sectionPos = section.offsetTop - 90;


    window.scroll({
      top: sectionPos,
      behavior: "smooth",
    });
}

function toggleActiveState(){
  var scrollPosition = document.documentElement.scrollTop;

  if(!elementInViewport(headerElement)){
    topNavbar.style.background = 'rgba(0, 0, 0, 0.9)';
    $('.hvr-reveal').css('color', '#000'); 
  }
  else{
    removeAllActiveClasses();
    var selectedLink = `nav ul li a[href="#homeSection"]`;
    document.querySelector(selectedLink).classList.add("active");
  }

  allSections.forEach(section => {
    if ( scrollPosition >= section.offsetTop - section.offsetHeight * 0.25 &&
        scrollPosition < section.offsetTop + section.offsetHeight - section.offsetHeight * 0.25 ) {
        var currId = section.attributes.id.value;
        removeAllActiveClasses();
        addActiveClass(currId);
    }
})
}

function removeAllActiveClasses() {
  document.querySelectorAll('a').forEach(link => {
      link.classList.remove('active');

  })
}

function addActiveClass(id) {
  var selectedLink = `nav ul li a[href="#${id}"]`;
  document.querySelector(selectedLink).classList.add("active");

}

window.addEventListener('scroll' , toggleActiveState);

var navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
link.addEventListener("click",e=> scrollToSection(e))
}); 


