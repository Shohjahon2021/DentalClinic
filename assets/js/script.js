let body = document.querySelector('body');
let wrapper = document.querySelector('div');
let wrapperClass = document.querySelector('div').className;
let arrow = document.getElementsByClassName('arrow')[0];
let arrowIcon = document.getElementsByClassName('arrow-icon')[0];
let clicks = 1;
let socialList = document.getElementsByClassName('items-list')[0];
let menuIcon = document.getElementsByClassName('menu-icon')[0];
let menuIconClicks = 1;
let menu = document.getElementsByClassName('menu')[0];

// Header

function showList() {
    if(clicks % 2 === 0) {
        arrow.style.backgroundColor = "#fff";
        arrowIcon.style.transform = "rotateX(0deg)";
        socialList.style.opacity = "0";
        
        setTimeout(function() {
            socialList.style.display = "none";
        }, 200);

        clicks++;
    } else {
        arrow.style.backgroundColor = "#f3faff";
        arrowIcon.style.transform = "rotateX(180deg)";
        socialList.style.display = "block";

        setTimeout(function() {
            socialList.style.opacity = "1";
        }, 100);

        clicks++;
    }
}

function showMenu() {
    if(menuIconClicks % 2 === 0) {
        menu.style.opacity = "0";
        
        setTimeout(function() {
            menu.style.display = "none";
        }, 50);

        menuIconClicks++;
    }
    else {
        menu.style.display = "block";
        
        setTimeout(function() {
            menu.style.opacity = "1";
        }, 50);

        menuIconClicks++;
    }
}

function checkMenuState() {
    if(menu.style.display === "block") {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "auto";
    }
}

arrow.addEventListener("click", showList);
menuIcon.addEventListener("click", showMenu);

setInterval(checkMenuState, 100);


// Slider

if (wrapperClass === "wrapper home" || "wrapper about" === wrapperClass || wrapperClass === "wrapper contact") {
    let pagination = document.querySelector('.pagination');
    let bullets = document.querySelectorAll('.bullet');

    let firstBullet = document.createElement('div');
        firstBullet.className = "bullet toAppear"

    let lastBullet = document.createElement('div');
        lastBullet.className = "bullet";

    const swiper = new Swiper('.swiper-container', {
        centeredSlides: true,
        autoplay: true,     
        loop: true,
        spaceBetween: 60,
        initialSlide: 1,
        speed: 1000,

        breakpoints: {
            320: {
                slidesPerView: 1,
                speed: 500,
            },

            500: {
                speed: 700,
            },

            640: {
                slidesPerView: 3,
                speed: 1000,
            }
        }
    });

    function makeFirstBullet() {
        let toAppear = document.querySelector('.toAppear');
            toAppear.className = "bullet";
    }

    function delFirstBullet () {
        bullets = document.querySelectorAll('.bullet');
        bullets[0].classList.add('delFirst');

        setTimeout(function () {
            let toDelete = document.querySelector('.delFirst');
                toDelete.remove();
        }, 500);
    }


    swiper.on('slideNextTransitionStart', function() {
        bullets = document.querySelectorAll('.bullet');
        
        delFirstBullet();
        pagination.appendChild(lastBullet.cloneNode(true));
        
        bullets = document.querySelectorAll('.bullet');

        for(let i = 0; i < bullets.length; i++) {
            if(bullets[i].className === "bullet active") {
                bullets[i].className = "bullet";
                bullets[i+1].className = "bullet active";
                break;
            }
        }
    });

    swiper.on('slidePrevTransitionStart', function() {
        bullets = document.querySelectorAll('.bullet');
        bullets[bullets.length - 1].remove();

        pagination.insertBefore(firstBullet.cloneNode(true), bullets[0]);
        setTimeout(makeFirstBullet, 50);
        
        bullets = document.querySelectorAll('.bullet');
        
        for(let i = 0; i < bullets.length; i++) {
            if(bullets[i].className === "bullet active") {
                bullets[i].className = "bullet";
                bullets[i-1].className = "bullet active";
                break;
            }
        }
    });
}


let wholeSection,
    pages,
    pagination,
    pageBtns,
    activePageBtn,
    btnPrev,
    btnNext;

if (wrapperClass === "wrapper doctor" || "wrapper blog" === wrapperClass) { 
    if(wrapperClass === "wrapper doctor") {
        wholeSection = document.querySelector(".doctors");
    } else {
        wholeSection = document.querySelector(".articles");
    }

    pages = wholeSection.getElementsByClassName('items-container');
    pagination = wholeSection.querySelector('.pagination');
    pageBtns = wrapper.getElementsByClassName('page-btn');
    activePageBtn = pageBtns[0];
    btnPrev = wrapper.querySelector(".btn-prev"); 
    btnPrev.disabled = true;
    btnNext = wrapper.querySelector(".btn-next");   

    pageBtns[pageBtns.length - 1].style.marginRight = "0";
}

function changeLikeState(area) {
    let likeBtn = area;
    let likeBlankImg = area.querySelector('.like-icon.blank');
    let likeFillImg = area.querySelector('.like-icon.filled');
    let valueWrapper = area.closest(".like").querySelector('.like-value');
    let valueCurrent = area.closest(".like").querySelector('.like-value_current');
    let value = Number(area.closest(".like").querySelector('.like-value_current').textContent);
    let newValue = document.createElement("div");
        newValue.classList.add("value-next");

    function changeValue() {
        likeBtn.disabled = true;
        valueWrapper.appendChild(newValue);

        setTimeout(() => {
            valueCurrent.textContent = value;
            valueWrapper.removeChild(newValue);
            likeBtn.disabled = false;
        }, 200);
    }

    if(likeBlankImg.style.opacity === "1") {
        likeBlankImg.style.opacity = "0";
        likeFillImg.style.opacity = "1";
        newValue.textContent = ++value;
        changeValue();
    } else {
        likeBlankImg.style.opacity = "1";
        likeFillImg.style.opacity = "0";
        newValue.textContent = --value;
        changeValue();
    }
}

function divideItems(maxItems) {
    for(let i = 0; i < pages.length; i++) {
        let items = pages[i].getElementsByClassName('item');
        let firstItem = false;

        if(items.length === maxItems) break;

        if(items.length > maxItems && !pages[i+1]) {
            let newContainer = document.createElement('div');
                newContainer.className = "items-container";
                newContainer.style.display = "none";

            wholeSection.insertBefore(newContainer, pagination);
            pages = wholeSection.getElementsByClassName('items-container');
        }

        if(pages[i+1] && pages[i+1].getElementsByClassName('item')[0]) {
            firstItem = pages[i+1].getElementsByClassName('item')[0];
        } 
         
        while(items.length !== maxItems && pages[i+1]) {
            if(wrapperClass === "wrapper blog") {
                if(firstItem) {
                    if(maxItems === 6) {
                        pages[i+1].insertBefore(items[items.length-3], firstItem);
                        pages[i+1].insertBefore(items[items.length-2], firstItem);
                        pages[i+1].insertBefore(items[items.length-1], firstItem);
                    } else {
                        pages[i+1].insertBefore(items[items.length-6], firstItem);
                        pages[i+1].insertBefore(items[items.length-5], firstItem);
                        pages[i+1].insertBefore(items[items.length-4], firstItem);
                        pages[i+1].insertBefore(items[items.length-3], firstItem);
                        pages[i+1].insertBefore(items[items.length-2], firstItem);
                        pages[i+1].insertBefore(items[items.length-1], firstItem);
                    }
                } else {
                    pages[i+1].appendChild(items[items.length-3]);
                    pages[i+1].appendChild(items[items.length-2]);
                    pages[i+1].appendChild(items[items.length-1]);
                }
            } 

            if(wrapperClass === "wrapper doctor") {
                if(firstItem) {
                    if(maxItems === 6) {
                        pages[i+1].insertBefore(items[items.length-2], firstItem);
                        pages[i+1].insertBefore(items[items.length-1], firstItem);
                    } else if(maxItems === 4) {
                        pages[i+1].insertBefore(items[items.length-4], firstItem);
                        pages[i+1].insertBefore(items[items.length-3], firstItem);
                        pages[i+1].insertBefore(items[items.length-2], firstItem);
                        pages[i+1].insertBefore(items[items.length-1], firstItem);
                    } else {
                        pages[i+1].insertBefore(items[items.length-6], firstItem);
                        pages[i+1].insertBefore(items[items.length-5], firstItem);
                        pages[i+1].insertBefore(items[items.length-4], firstItem);
                        pages[i+1].insertBefore(items[items.length-3], firstItem);
                        pages[i+1].insertBefore(items[items.length-2], firstItem);
                        pages[i+1].insertBefore(items[items.length-1], firstItem);
                    }
                } else {
                    pages[i+1].appendChild(items[items.length-2]);
                    pages[i+1].appendChild(items[items.length-1]);
                }
            }
        }

        if(pageBtns.length !== pages.length) addBtns();
    }
}

function addBtns() {
    let numToStart = Number(pageBtns[pageBtns.length - 1].innerHTML) + 1;

    for(let i = numToStart; i <= pages.length; i++) {
        let newBtn = document.createElement("button");
            newBtn.className = "page-btn";
            newBtn.setAttribute("onclick", "changePage(this)");
            newBtn.innerHTML = i;

        pagination.insertBefore(newBtn, btnNext);
        pageBtns = wholeSection.getElementsByClassName('page-btn');
    }

    for(let i = 0; i < pageBtns.length; i++) {
        pageBtns[i].style.margin = "0 3% 0 0";
    }

    pageBtns[pageBtns.length - 1].style.margin = "0";
}

function checkActiveBtn() {
    if(activePageBtn === pageBtns[0]) {
        btnPrev.disabled = true;
        btnPrev.className = "btn-prev disabled";
        btnNext.className = "btn-next";
        btnNext.disabled = false;
    } else if (activePageBtn === pageBtns[pageBtns.length-1]) {
        btnNext.disabled = true;
        btnNext.className = "btn-next disabled";
        btnPrev.className = "btn-prev";
        btnPrev.disabled = false;
    } else {
        btnPrev.disabled = false;
        btnPrev.className = "btn-prev";
        btnNext.className = "btn-next";
        btnNext.disabled = false;
    }
}

function changePage(elem) {
    for(let i = 0; i < pageBtns.length; i++) {
        pageBtns[i].className = "page-btn";
    }

    elem.className = "page-btn active";
    activePageBtn = elem;

    for(let i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }

    for(let i = 0; i < pageBtns.length; i++) {
        if(pageBtns[i].classList[1] === "active") {
            pages[i].style.display = "flex";
        }
    }

    checkActiveBtn();
}

function flipPage(direction) {
    if(direction === "back") {
        for(let i = 0; i < pageBtns.length; i++) {
            if(pageBtns[i].classList[1] === "active") {
                pageBtns[i].className = "page-btn";
                pages[i].style.display = "none";

                pages[i-1].style.display = "flex";
                pageBtns[i-1].className = "page-btn active";
                activePageBtn = pageBtns[i-1];
                break;
            }
        }
        checkActiveBtn();
    } else {
        for(let i = 0; i < pageBtns.length; i++) {
            if(pageBtns[i].classList[1] === "active") {
                pageBtns[i].className = "page-btn";
                pages[i].style.display = "none";

                pages[i+1].style.display = "flex";
                pageBtns[i+1].className = "page-btn active";
                activePageBtn = pageBtns[i+1];
                break;
            }
        }
        checkActiveBtn();
    }
}

if(wrapperClass === "wrapper blog") {
    let text = document.querySelector('.mainArticle').querySelector('.text').innerHTML;
    let textToReduce = text.split(" ");
    let texToRemain;

    for(let i = 0; i < textToReduce.length; i++) {
        if(textToReduce[i] === "") textToReduce.splice(i, 1);
    }

    if(body.offsetWidth <= 920) {texToRemain = Math.floor(textToReduce.length / 2);}
    if(body.offsetWidth <= 700) {texToRemain = Math.floor(textToReduce.length / 4);}
    if(body.offsetWidth <= 550) {texToRemain = Math.floor(textToReduce.length / 6);}
    if(body.offsetWidth <= 400) {texToRemain = Math.floor(textToReduce.length / 10);}

    for(let i = textToReduce.length - 4; i >= texToRemain; i--) {
        textToReduce.splice(i, 1);
    }

    document.querySelector('.mainArticle').querySelector('.text').innerHTML = textToReduce.join(" ");

    if(body.offsetWidth <= 700 && 400 < body.offsetWidth) divideItems(6);
    if(body.offsetWidth <= 400) divideItems(3);
}

if(wrapperClass === "wrapper doctor") {
    if(body.offsetWidth <= 920 && 700 < body.offsetWidth) divideItems(6);
    if(body.offsetWidth <= 700) divideItems(4);
}