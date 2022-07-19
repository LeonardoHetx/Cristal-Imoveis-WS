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
   distance: '80px',
   duration: 700
}).reveal(`
   #homeToScroll , 
   #homeToScroll img, 
   #homeToScroll .stat`)


ScrollReveal({
   origin: 'top',
   distance: '80px',
   duration: 700
}).reveal(` 
   #services,
   #services header,
   #services .card,
   #about,
   #about header,
   #about .content,
   #about .content img`)

//#HOME .STATS COUNTER

function toCount(x, b, a, c) {
   let n1 = 0
   let count = setInterval(() => {
      var numbersHome = document.getElementsByClassName('count')[a].innerText = `+${n1 += b}`
      if (n1 === x) {
         clearInterval(count)
      }
      textAppear(a)
   }, c)
}

//puts visibility in texts
function textAppear(a) {
   document.getElementsByClassName('count')[a].classList.remove('appear')
}

// toCount(number in text, how often, number position in class list, time to count)
toCount(3500, 100, 0, 20)
toCount(15, 1, 1, 70)


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