//video player
const progress = document.querySelector('.progress', '.progress_volume');
  
progress.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
})
const progressValue = document.querySelector('.progress_volume');
  
progressValue.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
})


//welcome slider
let swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',

    //булеты
    //type: 'bullets',
    clickable: true,
  },
    //цифры
  //   type: 'fraction'
  // ,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});
let slides = document.querySelectorAll('.swiper-slide');
let current =  document.querySelector('.current');
let total =  document.querySelector('.total');
let count_slide = swiper.slides.length - 2;
total.innerHTML = `0${count_slide}`;
swiper.on("slideChange", () => {
  let currSlide = ++swiper.realIndex;
  current.innerHTML = `0${currSlide}`;
});

 
//Gallery
const gallery = document.querySelector('.gallery');

const image = ["galery1", "galery2", "galery3", "galery4", "galery5", 
"galery6", "galery7", "galery8", "galery9", "galery10", "galery11",
 "galery12", "galery13", "galery14", "galery15" ];

image.sort(() => Math.random() - 0.5);

function galleryShow(){
  image.forEach(function(item){
  const img = document.createElement('img');
  img.classList.add('gallery-img');
  img.classList.add('_anim-items');
  img.src = `assets/gallery/${item}.jpg`;
  img.alt = `${item}`;
  gallery.append(img);
  })
};
 galleryShow(image);

 
 const animItems = document.querySelectorAll("._anim-items");

 if (animItems.length > 0) {
     window.addEventListener("scroll", animOnScroll)
     function animOnScroll() {
         for (let index = 0; index < animItems.length; index++) {
             const animItem = animItems[index];
             const animItemHeight = animItem.offsetHeight;
 
             const animItemOffset = offset(animItem).top;
             const animStart = 9;
 
             let animItemPoint = window.innerHeight - animItemHeight / animStart;
 
             if (animItemHeight > window.innerHeight) {
                  let animItemPoint = window.innerHeight - window.innerHeight / animStart;
             }
             if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                 animItem.classList.add("_active");
             } else {
                 animItem.classList.remove("_active");
             }
         }
     }
     function offset(el) {
         const rect = el.getBoundingClientRect(),
             scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
             scrollTop = window.pageYOffset || document.documentElement.scrollTop;
         return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
     }
     setTimeout(() => {
      animOnScroll();
     }, 100);
     
 }
//Burger

const burger = document.querySelector('.burger-menu');
const navMenu = document.querySelector('.nav_menu');
const welcomeTitle = document.querySelector('.welcom_title');
if (burger) {
  
  burger.addEventListener("click", function(e){
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
    welcomeTitle.classList.toggle('hide');
  })
}

//плавная прокрутка по якорям
const menuLinks = document.querySelectorAll('.menu_link[data-goto]');
if (menuLinks.length > 0){
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });
 //прокрутка
  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){ //проверка естьь ли дата-атр и путь
       const gotoBLock = document.querySelector(menuLink.dataset.goto);
       const gotoBLockValue = gotoBLock.getBoundingClientRect().top + pageYOffset;//расчет на сколько нужно  прокрутить экран
         
       if(burger.classList.contains('active')){
        burger.classList.remove('active');
        navMenu.classList.remove('active');
        welcomeTitle.classList.remove('hide');
      }
       
       window.scrollTo({
         top: gotoBLockValue,
         behavior: "smooth"
       });
       e.preventDefault();
      }
  }
}
  
  
//explore

const explore = document.querySelector('.explore_galery');
const before = explore.querySelector('.before');
const beforeImage = before.querySelector('.before__img');
const change = explore.querySelector('.change');
const body = document.body;

let isActive = false;

document.addEventListener('DOMContentLoaded', () => {
  let width = explore.offsetWidth;
  beforeImage.style.width = `${width}px`;
});

const beforeAfterExplore = (x) => {
  let shift = Math.max(0, Math.min(x, explore.offsetWidth));  //shuft - сдвиг
  before.style.width = `${shift}px`;
  change.style.left = `${shift}px`;
};

//останавливаем все действия
const pauseEvents = (e) => {
  e.stopPropagation();
  e.preventDefault();
  return false;
};

body.addEventListener('mousedown', () => {
  isActive = true;
});
//по нажатии мышки
body.addEventListener('mouseup', () => {
  isActive = false;
});

//мышка выходит за пределы 
body.addEventListener('mouseleave', () => {
  isActive = false;
});
//запускаем бегунок
body.addEventListener('mousemove', (e) => {
  if (!isActive) {
    return;
  }

  let x = e.pageX;

  x -= explore.getBoundingClientRect().left;
  beforeAfterExplore(x);
  pauseEvents(e);
});

body.addEventListener('touchstart', () => {
  isActive = true;
});

body.addEventListener('touchend', () => {
  isActive = false;
});

body.addEventListener('touchcancel', () => {
  isActive = false;
});
body.addEventListener('touchmove', (e) => {
  if (!isActive) {
    return;
  }

  let x;
  let i;

  for (i = 0; e< e.changedTouches.length; i++) {
    x = e.changedTouches[i].pageX;
  }


  x -= explore.getBoundingClientRect().left;
  beforeAfterExplore(x);
  pauseEvents(e);
});

//mapbox

  mapboxgl.accessToken = 'pk.eyJ1IjoiZGFyeWFyYXVkIiwiYSI6ImNrdW1tZnhycTBmcXczMXAxejVhamgzazYifQ.11rkdD-0HnAcroOlZItdeg';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/daryaraud/ckumn66g2buyy18qjxxoshch9',
    center: [2.3364, 48.86091],
    zoom: 15.7,
    
  });
map.addControl(new mapboxgl.NavigationControl());
 
const marker1 = new mapboxgl.Marker({
  color: "#000000",
  }).setLngLat([2.3364, 48.86091])
  .addTo(map);
  const marker2 = new mapboxgl.Marker({
    color: "#757575",
    }).setLngLat([2.3333, 48.8602], [2.3397, 48.8607])
    .addTo(map);
const marker3 = new mapboxgl.Marker({
   color: "#757575",
  }).setLngLat([2.3397, 48.8607], [2.3330, 48.8619])
  .addTo(map);
  const marker4 = new mapboxgl.Marker({
    color: "#757575",
   }).setLngLat([2.3330, 48.8619])
   .addTo(map);
   const marker5 = new mapboxgl.Marker({
    color: "#757575",
   }).setLngLat([2.3365, 48.8625])
   .addTo(map);

    
