document.querySelector(".options .lang").onclick = function(){
   if(!document.querySelector(".options .lang ul").classList.contains("active")){
    document.querySelector(".options .lang ul").classList.add("active")
   }else{
    document.querySelector(".options .lang ul").classList.remove("active")

   }
};

document.querySelector(".options .currency").onclick = function(){
    if(!document.querySelector(".options .currency ul").classList.contains("active")){
     document.querySelector(".options .currency ul").classList.add("active")
    }else{
     document.querySelector(".options .currency ul").classList.remove("active")
 
    }
 };
 document.querySelector("header .category").onclick = function(){
   if(!document.querySelector("header .category ul").classList.contains("active")){
    document.querySelector("header .category ul").classList.add("active")
   }else{
    document.querySelector("header .category ul").classList.remove("active")

   }
};
document.querySelector(".ads .container .side-bar ul li:last-child").onclick = function(){
   if(!document.querySelector(".ads .container .side-bar ul li:nth-child(11)").classList.contains("active")){
      document.querySelector(".ads .container .side-bar ul li:nth-child(11)").classList.add("active");
      this.innerHTML = `<i class="fas fa-minus"></i> Show Less`;
   } else{
      document.querySelector(".ads .container .side-bar ul li:nth-child(11)").classList.remove("active");
      this.innerHTML = '<i class="fas fa-plus"></i> show more ';

   }
};

let adsSection = document.querySelector("#ads"),
adsContainer = document.querySelector("#ads .container .slide");
let images = [`img/ads/etn-br1.png`, `img/ads/etn-br2.png`,
`img/ads/etn-br3.png`,
`img/ads/etn-br4.png`,
`img/ads/etn-br5.png`,
`img/ads/etn-br6.png`, ];

for(let i = 0; i<images.length; i++) {
   let imgg = document.createElement("img");
   imgg.src = images[i];
   adsContainer.appendChild(imgg)
}
//

let allLis = Array.from(document.querySelectorAll("ul.categories li")),
columns = document.querySelectorAll(".special-offers .col");
allLis.forEach(li =>{
   li.addEventListener("click", removeActive);
   li.addEventListener("click", setActive);


   function removeActive() {
      allLis.forEach(li =>{
         li.classList.remove("active");
         this.classList.add("active");
      })
   };

   function setActive() {
      columns.forEach(img => img.style.display = "none");
      document.querySelectorAll(this.dataset.set).forEach(e => e.style.display = "block")

   };
})

let innerSlider = document.querySelector("#ads .container .slide"),
outerSlider = document.querySelector("#ads"),
advImg = document.querySelectorAll("#ads .container img"),
adsLength = advImg.length,

pressed = false,
startx,
x;
advImg.forEach(img => {
   img.addEventListener("dragstart", (e)=> e.preventDefault())
})
outerSlider.addEventListener("mousedown", (e) =>{
   pressed = true;
   startx = e.offsetX - innerSlider.offsetLeft;
   outerSlider.style.cursor = "grabbing";

});

outerSlider.addEventListener("mouseenter", ()=>{
   outerSlider.style.cursor = "grab"
});
// outerSlider.addEventListener("mouseleave", ()=>{
//    outerSlider.style.cursor = "default"
// });

const slideContainer = document.querySelector('.special-offers .content'),
slides = Array.from(document.querySelectorAll('.special-offers .content .col')),
slidesI = Array.from(document.querySelectorAll('.special-offers .content .col img'));
//Global variables
let currentTranslate = 0,
preTranslate = 0,
startPosition = 0,
animationId = 0,
currentIndex = 0,
isDragging = false;





slidesI.forEach((slide)=> {
   slide.addEventListener('dragstart', (e)=> e.preventDefault())
})

slides.forEach((slide, index)=>{



//touch events
slide.addEventListener('touchstart', touchStart(index));
slide.addEventListener('touchmove', touchMove);
slide.addEventListener('touchend', touchEnd);



//mouseEvent

slide.addEventListener('mousedown', touchStart(index));
slide.addEventListener('mouseup', touchEnd);
slide.addEventListener('mouseleave', touchEnd);
slide.addEventListener('mousemove', touchMove);


});

//cancel right click
window.oncontextmenu = function(e){
    e.preventDefault();
    e.stopPropagation();
    return false;
}


function touchStart(index){
    return function(event){
        isDragging = true;
        currentIndex = index ;
        startPosition = getPositionX(event);
        animationId = requestAnimationFrame(animation);
        slideContainer.classList.add('active');

        
    }
};

function touchMove(event){
    if(isDragging){
        const currentPosition = getPositionX(event)
        currentTranslate = preTranslate + currentPosition - startPosition;
    }
};

function touchEnd(){
    isDragging = false;
    cancelAnimationFrame(animationId);
    slideContainer.classList.remove('active');

    const movedby = currentTranslate - preTranslate ; 
    if(movedby < -200 && currentIndex < slides.length - 1){
        currentIndex ++
    }
    if(movedby > 200 && currentIndex > 0){
        currentIndex --
    }
    setPositionByIndex()


};

function getPositionX(event){
   return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX ;
}

function animation(){
    slidePos()
    if(isDragging) requestAnimationFrame(animation)
};
function slidePos(){
    slideContainer.style.transform = `translateX(${currentTranslate}px)`
}
function setPositionByIndex(){
    currentTranslate = currentIndex * -1/8 * window.innerWidth;
    preTranslate = currentTranslate;
    slidePos()
}