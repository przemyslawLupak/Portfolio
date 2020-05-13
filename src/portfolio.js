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
const canvas = document.getElementById("nav");
const ctx = canvas.getContext("2d"); // CTX MEANS CONTEXT
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particleArray;

// get mouse mouse position ///////////////////////////////
let mouse = {
	x: null,
	y: null,
  radius: ((canvas.height/80) * (canvas.width/80))
}
window.addEventListener('mousemove', 
	function(event){
		mouse.x = event.x;
		mouse.y = event.y;
});

// create Particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.speedX = this.directionX;
        this.speedY = this.directionY;
    }
    // create method to draw individual particle
    draw() {
        ctx.beginPath();
              //center coord  ,radius , startingangle, ending angle, drowing direction
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2, false);
            //filling a cricle
        ctx.fillStyle = this.color;
	    ctx.fill();
    }

    // check particle position, check mouse position, move the paticle, draw the particle
    update() {
        // check if particle is still within canvas
        if (this.x > canvas.width || this.x < 0){
			this.directionX = -this.directionX;
            this.speedX = this.directionX;
	    } if (this.y + this.size > canvas.height || this.y - this.size < 0){
		    this.directionY = -this.directionY;
            this.speedY = this.directionY;
	    }
        
        // move particle
        this.x += this.directionX;
        this.y += this.directionY;
        // call draw method
        this.draw();
    }
}

// check if particles are close enough to draw line between them
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++){
            let distance = ((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x))
            +   ((particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y));
            if  (distance < (canvas.width/7) * (canvas.height/7))
            {   
                opacityValue = 1-(distance/10000);
                ctx.strokeStyle='rgb(64, 239, 169,' + opacityValue +')';
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();

            }    
    }
    }
}

// create particle array 
function init(){
    particleArray = [];
    let numberOfParticles = (canvas.height*canvas.width)/3000;
    for (let i=0; i<numberOfParticles; i++){
        let size = (Math.random()*3)+0.5;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        
        let color = '#40EFA9';
        particleArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// create animation loop
function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,innerWidth,innerHeight);
	
	for (let i = 0; i < particleArray.length; i++){
		particleArray[i].update();
	}
    connect();
}
init();
animate();
window.addEventListener('resize',
	function(){
		canvas.width = innerWidth;
		canvas.height = innerHeight;
        mouse.radius = ((canvas.height/80) * (canvas.width/80));
		init();
	}
)