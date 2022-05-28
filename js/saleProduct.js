
let adv = Array.from(document.querySelectorAll(".sale-product .content")),
advLength = adv.length,
currentAdv = 1;


let rightContent = document.querySelector(".sale-product .right"),
 LeftContent = document.querySelector(".sale-product .left");

rightContent.onclick = function() {
    if(currentAdv != advLength) {
        currentAdv++;
        clearInterval(auto);
    }else {
        return false
    }
    checker();
};

LeftContent.onclick = function() {
    if(currentAdv != 1) {
        currentAdv--;
        clearInterval(auto);
    }else {
        return false
    }
    checker();
};


checker();
function checker(){
    removeAllActive();
    adv[currentAdv - 1].classList.add("next");

   
};
function removeAllActive(){
    adv.forEach(img => img.classList.remove("next"));
}

 let auto =   setInterval(function(){
        if(advLength == currentAdv ){
            currentAdv = 1;
        }else{
            currentAdv ++;   
        }
        checker();
},4000);





    