//GLIDER.JS INITIALIZER

 var slider =  new Glider(document.querySelector('.glider'), {
      slidesToShow: 1,
      slidesToScroll: 1,
      scrollLock: true,
      scrollLockDelay: 100,
      draggable: true,
      dragVelocity: 1.5,
      duration: 3,
      arrows: {
        prev: '.glider-prev',
        next: '.glider-next'
      }
    });

    //GLIDER.JS AUTOPLAY

    slideAutoPlay(slider, '#home .col-b');

    function slideAutoPlay(glider, selector, delay = 5000, repeat = true) {
        let autoplay = null;
        const slidesCount = glider.track.childElementCount;
        let nextIndex = 1;
        let pause = true;
    
        function slide() {
            autoplay = setInterval(() => {
                if (nextIndex >= slidesCount) {
                    if (!repeat) {
                        clearInterval(autoplay);
                    } else {
                        nextIndex = 0;
                    }
                }
                glider.scrollItem(nextIndex++);
            }, delay);
        }
    
        slide();
    
        var element = document.querySelector(selector);
        element.addEventListener('mouseover', (event) => {
            if (pause) {
                clearInterval(autoplay);
                pause = false;
            }
        }, 300);
    
        element.addEventListener('mouseout', (event) => {
            if (!pause) {
                slide();
                pause = true;
            }
        }, 300);
    }

//TO CHECK WHICH SECTION YOU ARE IN
window.addEventListener('scroll', onScroll)

onScroll()

function onScroll() {
   showNavOnScroll()
   showBackToTopButtonOnScroll()

   activateMenuAtCurrentSection(home)
   activateMenuAtCurrentSection(services)
   activateMenuAtCurrentSection(about)
   activateMenuAtCurrentSection(contact)
}

function activateMenuAtCurrentSection(section) {
   const targetLine = scrollY + innerHeight / 2

   //verificar se a seção passou da linha
   const sectionTop = section.offsetTop
   const sectionHeight = section.offsetHeight
   const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop

   //verificar se a base está abaixo da linha alvo
   const sectionEndsAt = sectionTop + sectionHeight
   const sectionEndPassedTargetLine = sectionEndsAt <= targetLine

   //limites da seção
   const sectionBoundaries =
      sectionTopReachOrPassedTargetLine &&
      !sectionEndPassedTargetLine

   const sectionId = section.getAttribute(`id`)
   const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`)

   menuElement.classList.remove('active')
   if (sectionBoundaries) {
      menuElement.classList.add('active')
   }
}

function showNavOnScroll() {
   const navigation = document.querySelector('#navigation')

   if (scrollY > 0) {
      navigation.classList.add('scroll')
   } else {
      navigation.classList.remove('scroll')
   }
}

function showBackToTopButtonOnScroll() {
   if (scrollY > 1400) {
      backToTopButton.classList.add('show')
   } else {
      backToTopButton.classList.remove('show')
   }
}

function openMenu() {
   document.body.classList.add('menu-expanded')
}

function closeMenu() {
   document.body.classList.remove('menu-expanded')
}

//SCROLL REVEAL API

ScrollReveal({
   origin: 'left',
   distance: '120px',
   duration: 1400
}).reveal(`
   #homeToScroll,
   #homeToScroll .stat`)

ScrollReveal({
   origin: 'top',
   distance: '100px',
   duration: 1000
}).reveal(` 
   #services,
   #services header,
   #services .card,
   #about,
   #about header,
   #about .content,
   #about .content img`)

//#DEPOSITIONS ARROW PREV AND NXT

let arrow = document.getElementsByClassName('arrow')

let bar = document.querySelectorAll("#depositions .bar")

let barArray = Array.from(bar)

let elemStyle = window.getComputedStyle(bar[2], null).getPropertyValue("display")

if (elemStyle == 'none'){
   barArray.pop()
}

let arrows = [arrow[0],arrow[1]]

let i = 1
function prev(){
   if(i <= 1) i = barArray.length + 1
   i--;
   return setCard(0)  
}

function next(){
   if(i >= barArray.length) i = 0
   i++;
   return setCard(1)
}

function setCard(num){
   return arrows[num].setAttribute('for', `sec${i}`)
}