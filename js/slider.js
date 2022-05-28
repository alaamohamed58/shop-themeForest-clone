//global
let slide = Array.from(document.querySelectorAll(".slider .slide")),
sliderLength = slide.length,
cIndex = 1,
right = document.querySelector(".slider i.right"),
left = document.querySelector(".slider i.left"),
bullets =document.querySelector(".slider ul");

for(let i = 0; i < sliderLength; i++){
    let lis = document.createElement("li");
    lis.setAttribute("data-index", i + 1);
    bullets.appendChild(lis);
};
checker();
function checker(){
    removeAllActive();
    slide[cIndex - 1].classList.add("active");
    bullets.querySelectorAll("li")[cIndex - 1].classList.add("active");

    if(cIndex == 1){
        left.classList.add("active");
    }else{
        left.classList.remove("active");

    }
    if(cIndex == sliderLength){
            right.classList.add("active");
    }else{
        right.classList.remove("active");
    } 
};
function removeAllActive(){
    slide.forEach(img => img.classList.remove("active"));
    bullets.querySelectorAll("li").forEach(li => li.classList.remove("active"))
}

right.onclick = function(){
    if(this.classList.contains("active")){
        return false;
    }else{
        cIndex ++;
        checker();
    }
    clearInterval(ato);
};
left.onclick = function(){
    if(this.classList.contains("active")){
        return false;
    }else{
        cIndex --;
        checker();
    }   
};
let lis =  bullets.querySelectorAll("li");
for(let i = 0; i < lis.length; i++){
    lis[i].onclick = function(){
        cIndex = parseInt(this.getAttribute("data-index"));
        checker();
    }
};
 let ato =   setInterval(function(){
        if(sliderLength == cIndex ){
            cIndex = 1;
        }else{
            cIndex ++;   
        }
        checker();
},4000);




//



    