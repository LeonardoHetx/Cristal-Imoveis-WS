//GLIDER.JS INITIALIZER

window.addEventListener('DOMContentLoaded', function () {
   var slider = new Glider(document.querySelector('.glider'), {
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

})

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

//SCROLL REVEAL

ScrollReveal({
   origin: 'left',
   distance: '120px',
   duration: 1400
}).reveal(`
   #homeToScroll,
   #homeToScroll header,
   #homeToScroll .content,
   #contact .map`)

ScrollReveal({
   origin: 'top',
   distance: '100px',
   duration: 1000
}).reveal(`
   #properties,
   #services,
   #services header,
   #services .card,
   #about,
   #about header,
   #about .content,
   #about .content img,
   #contact header,
   #contact .content`)

//MODAL WINDOW

function modalClick(img) {
   var modalW = document.getElementById("modalWindow")
   var modalI = document.getElementById("modalImg")
   var modalB = document.getElementById("btnClose")

   navigation.style.display = "none"
   openMenu()


   modalW.style.display = 'block'
   modalI.src = img
   modalB.onclick = function () {
      modalW.style.display = 'none'

      navigation.style.display = "initial"
      closeMenu()
   }
}