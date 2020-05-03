const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
navToggle.addEventListener('click', () =>{
    document.body.classList.toggle('nav-open');
});
navLinks.forEach(link  =>{
    link.addEventListener('click',()=>{
        document.body.classList.remove('nav-open');
    })
})
var scroll = window.requestAnimationFrame || function(callback){window.setTimeout(callback,1000/60)};
var elementsToShow = document.querySelectorAll('.show-on-scroll');
function Loop(){
    elementsToShow.forEach(function(element){
        if(isElementInViewport(element)){
            element.classList.add("is-visible");
        }
        else{
            element.classList.remove('is-visible');
        }
    });
    scroll(Loop);
}
Loop();
// Helper function from: http://stackoverflow.com/a/7557433/274826
function isElementInViewport(el) {
    // special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
      (rect.top <= 0
        && rect.bottom >= 0)
      ||
      (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight))
      ||
      (rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
  }