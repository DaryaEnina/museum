let prevBtn = document.querySelector(".swiper-button-prev");
let nextBtn = document.querySelector(".swiper-button-next");
let sliderImage = document.querySelector(".swiper-slide-image");
const currentNumber = document.querySelector(".current");
const bullets = document.querySelectorAll(".swiper-pagination-bullet");

const sliderImages = ["1", "2", "3", "4", "5"];

sliderImages.sort(() => Math.random() - 0.5);

prevBtn.addEventListener("click", () => {
  let index = +sliderImage.dataset.index;
  if (index < sliderImages.length + 1) {
    index = +sliderImage.dataset.index - 1;
    sliderImage.src = `assets/slider/${index}.jpg`;
    sliderImage.dataset.index = index;
    currentNumber.innerHTML = `0${index}`;
    bullets.forEach((item) => {
      if (item.dataset.indexx === sliderImage.dataset.index) {
        item.classList.add("swiper-pagination-bullet-active");
      } else {
        item.classList.remove("swiper-pagination-bullet-active");
      }
    });
  }
  if (index < 1) {
    index = sliderImages.length;
    sliderImage.src = `assets/slider/${index}.jpg`;
    sliderImage.dataset.index = index;
    currentNumber.innerHTML = `0${index}`;
    bullets.forEach((item) => {
      if (item.dataset.indexx === sliderImage.dataset.index) {
        item.classList.add("swiper-pagination-bullet-active");
      } else {
        item.classList.remove("swiper-pagination-bullet-active");
      }
    });
  }
});
nextBtn.addEventListener("click", () => {
  let index = +sliderImage.dataset.index + 1;
  if (index < sliderImages.length + 1) {
    sliderImage.src = `assets/slider/${index}.jpg`;
    sliderImage.dataset.index = index;
    currentNumber.innerHTML = `0${index}`;
    bullets.forEach((item) => {
      if (item.dataset.indexx === sliderImage.dataset.index) {
        item.classList.add("swiper-pagination-bullet-active");
      } else {
        item.classList.remove("swiper-pagination-bullet-active");
      }
    });
  } else {
    index = 1;
    sliderImage.src = `assets/slider/${index}.jpg`;
    sliderImage.dataset.index = index;
    currentNumber.innerHTML = `0${index}`;
    bullets.forEach((item) => {
      if (item.dataset.indexx === sliderImage.dataset.index) {
        item.classList.add("swiper-pagination-bullet-active");
      } else {
        item.classList.remove("swiper-pagination-bullet-active");
      }
    });
  }
});
//Gallery
const gallery = document.querySelector(".gallery");

const image = [
  "galery1",
  "galery2",
  "galery3",
  "galery4",
  "galery5",
  "galery6",
  "galery7",
  "galery8",
  "galery9",
  "galery10",
  "galery11",
  "galery12",
  "galery13",
  "galery14",
  "galery15",
];

image.sort(() => Math.random() - 0.5);

function galleryShow() {
  image.forEach(function (item) {
    const img = document.createElement("img");
    img.classList.add("gallery-img");
    img.classList.add("_anim-items");
    img.src = `assets/gallery/${item}.jpg`;
    img.alt = `${item}`;
    gallery.append(img);
  });
}
galleryShow(image);

const animItems = document.querySelectorAll("._anim-items");

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
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
      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
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
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  setTimeout(() => {
    animOnScroll();
  }, 100);
}
//Burger

const burger = document.querySelector(".burger-menu");
const navMenu = document.querySelector(".nav_menu");
const welcomeTitle = document.querySelector(".welcom_title");
if (burger) {
  burger.addEventListener("click", function (e) {
    burger.classList.toggle("active");
    navMenu.classList.toggle("active");
    welcomeTitle.classList.toggle("hide");
  });
}

//плавная прокрутка по якорям
const menuLinks = document.querySelectorAll(".menu_link[data-goto]");
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });
  //прокрутка
  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      //проверка естьь ли дата-атр и путь
      const gotoBLock = document.querySelector(menuLink.dataset.goto);
      const gotoBLockValue =
        gotoBLock.getBoundingClientRect().top + pageYOffset; //расчет на сколько нужно  прокрутить экран

      if (burger.classList.contains("active")) {
        burger.classList.remove("active");
        navMenu.classList.remove("active");
        welcomeTitle.classList.remove("hide");
      }

      window.scrollTo({
        top: gotoBLockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}

//explore

const explore = document.querySelector(".explore_galery");
const before = explore.querySelector(".before");
const beforeImage = before.querySelector(".before__img");
const change = explore.querySelector(".change");
const body = document.body;

let isActive = false;

document.addEventListener("DOMContentLoaded", () => {
  let width = explore.offsetWidth;
  beforeImage.style.width = `${width}px`;
});

const beforeAfterExplore = (x) => {
  let shift = Math.max(0, Math.min(x, explore.offsetWidth)); //shuft - сдвиг
  before.style.width = `${shift}px`;
  change.style.left = `${shift}px`;
};

//останавливаем все действия
const pauseEvents = (e) => {
  e.stopPropagation();
  return false;
};

body.addEventListener("mousedown", () => {
  isActive = true;
});
//по нажатии мышки
body.addEventListener("mouseup", () => {
  isActive = false;
});

//мышка выходит за пределы
body.addEventListener("mouseleave", () => {
  isActive = false;
});
//запускаем бегунок
body.addEventListener("mousemove", (e) => {
  if (!isActive) {
    return;
  }

  let x = e.pageX;

  x -= explore.getBoundingClientRect().left;
  beforeAfterExplore(x);
  pauseEvents(e);
});

body.addEventListener("touchstart", () => {
  isActive = true;
});

body.addEventListener("touchend", () => {
  isActive = false;
});

body.addEventListener("touchcancel", () => {
  isActive = false;
});
body.addEventListener("touchmove", (e) => {
  if (!isActive) {
    return;
  }

  let x;
  let i;

  for (i = 0; e < e.changedTouches.length; i++) {
    x = e.changedTouches[i].pageX;
  }

  x -= explore.getBoundingClientRect().left;
  beforeAfterExplore(x);
  pauseEvents(e);
});

/*Tickets*/
const ticketsButtons = document.querySelector(".tickets_amount_buttons");
const basicPlusTicket = document.getElementById("plusTicket");
const basicMinusTicket = document.getElementById("minusTicket");
const inputBasicTicket = document.querySelector(".number.basic-ticket");
const seniorPlusTicket = document.getElementById("plusTicketS");
const seniorMinusTicket = document.getElementById("minusTicketS");
const inputSeniorTicket = document.querySelector(".number.senior-ticket");
const totalCountTicket = document.getElementById("totalCountTicket");

let valueBasicTicket = Number(inputBasicTicket.value);
let valueSeniorTicket = Number(inputSeniorTicket.value);

ticketsButtons.addEventListener("click", (e) => {
  if (e.target == basicPlusTicket) {
    valueBasicTicket = valueBasicTicket + 1;
    inputBasicTicket.value = valueBasicTicket;
  }
  if (e.target == basicMinusTicket) {
    if (valueBasicTicket < 1) {
      return;
    }
    valueBasicTicket = valueBasicTicket - 1;
    inputBasicTicket.value = valueBasicTicket;
  }
  if (e.target == seniorPlusTicket) {
    valueSeniorTicket = valueSeniorTicket + 1;
    inputSeniorTicket.value = valueSeniorTicket;
  }
  if (e.target == seniorMinusTicket) {
    if (valueSeniorTicket < 1) {
      return;
    }
    valueSeniorTicket = valueSeniorTicket - 1;
    inputSeniorTicket.value = valueSeniorTicket;
  }
  totalTicket();
});
const totalTicket = () => {
  let countBasic = valueBasicTicket * 20;
  let countSenior = valueSeniorTicket * 10;
  let total = countBasic + countSenior;
  totalCountTicket.innerHTML = `${total}`;
};

/*popap*/

const basicPlus = document.getElementById("plus");
const basicMinus = document.getElementById("minus");
const inputBasic = document.querySelector(".number.basic");
const seniorPlus = document.getElementById("splus");
const seniorMinus = document.getElementById("sminus");
const inputSenior = document.querySelector(".number.senior");
const totalBasic = document.getElementById("totalBasic");
const totalSenior = document.getElementById("totalSenior");
const totalCount = document.getElementById("totalCount");

let valueBasic = Number(inputBasic.value);

basicPlus.addEventListener("click", () => {
  valueBasic = valueBasic + 1;
  inputBasic.value = `${valueBasic}`;
  totalBasicNumber();
});

basicMinus.addEventListener("click", () => {
  valueBasic = valueBasic - 1;
  totalBasicNumber();
});

const totalBasicNumber = () => {
  let countBasic = valueBasic * 20;
  if (countBasic < 0) {
    valueBasic = 0;
  } else {
    totalBasic.innerHTML = `${countBasic}`;
  }
  totalCountNumber();
};

let valueSenior = Number(inputSenior.value);

seniorPlus.addEventListener("click", () => {
  valueSenior = valueSenior + 1;
  inputSenior.value = `${valueSenior}`;
  totalSeniorNumber();
});

seniorMinus.addEventListener("click", () => {
  if (valueSenior == 0) {
    return;
  }
  valueSenior = valueSenior - 1;
  inputSenior.value = `${valueSenior}`;

  totalSeniorNumber();
});

const totalSeniorNumber = () => {
  let countSenior = valueSenior * 10;

  if (countSenior < 0) {
    valueSenior = 0;
  } else {
    totalSenior.innerHTML = `${countSenior}`;
  }
  totalCountNumber();
};

const totalCountNumber = () => {
  let totalBasicValue = Number(totalBasic.textContent);
  let totalSeniorValue = Number(totalSenior.textContent);
  let total = totalBasicValue + totalSeniorValue;
  totalCount.innerHTML = total;
};

document.querySelector(".tickets_amount_btn").addEventListener("click", () => {
  valueBasic = valueBasicTicket;
  inputBasic.value = `${valueBasicTicket}`;
  totalBasicNumber();
  valueSenior = valueSeniorTicket;
  inputSenior.value = `${valueSeniorTicket}`;
  totalSeniorNumber();
});

//mapbox

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGFyeWFyYXVkIiwiYSI6ImNrdW1tZnhycTBmcXczMXAxejVhamgzazYifQ.11rkdD-0HnAcroOlZItdeg";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/daryaraud/ckumn66g2buyy18qjxxoshch9",
  center: [2.3364, 48.86091],
  zoom: 15.7,
});
map.addControl(new mapboxgl.NavigationControl());

const marker1 = new mapboxgl.Marker({
  color: "#000000",
})
  .setLngLat([2.3364, 48.86091])
  .addTo(map);
const marker2 = new mapboxgl.Marker({
  color: "#757575",
})
  .setLngLat([2.3333, 48.8602], [2.3397, 48.8607])
  .addTo(map);
const marker3 = new mapboxgl.Marker({
  color: "#757575",
})
  .setLngLat([2.3397, 48.8607], [2.333, 48.8619])
  .addTo(map);
const marker4 = new mapboxgl.Marker({
  color: "#757575",
})
  .setLngLat([2.333, 48.8619])
  .addTo(map);
const marker5 = new mapboxgl.Marker({
  color: "#757575",
})
  .setLngLat([2.3365, 48.8625])
  .addTo(map);
