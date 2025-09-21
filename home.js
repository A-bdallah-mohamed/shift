const togglepersonal = document.getElementById("togglepersonal")
const togglebusiness = document.getElementById("togglebusiness")
const personalactive = document.getElementById("personalactive")
const businessactive = document.getElementById("businessactive")
const first = document.getElementById("first")
const scnd = document.getElementById("scnd")
const firstphone = document.getElementById("firstphone")
const scndphone = document.getElementById("scndphone")


togglepersonal.addEventListener("click", () => {
    personalactive.style.opacity = "1"
      businessactive.style.opacity = "0"
      togglepersonal.style.color= "white"
      togglebusiness.style.color= "#202e42"
scnd.classList.add("hide");
first.classList.remove("hide");
console.log("personal toggled")
firstphone.classList.remove("hide")
scndphone.classList.add("hide")
})

togglebusiness.addEventListener("click", () => {
    personalactive.style.opacity = "0"
      businessactive.style.opacity = "1"
      togglepersonal.style.color= "#202e42"
      togglebusiness.style.color= "white"
first.classList.add("hide");
scnd.classList.remove("hide");
console.log("business toggled")
firstphone.classList.add("hide")
scndphone.classList.remove("hide")
})

const swiper = new Swiper('.swiper', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 25000,
    disableOnInteraction: false,
  },
});




const carSwiper = new Swiper('.car-swiper', {
  slidesPerView: 2.5,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: '.car-swiper .car_swiper-button-next',
    prevEl: '.car-swiper .car_swiper-button-prev',
  },
  pagination: {
    el: '.car-swiper .swiper-pagination',
    clickable: true,
  },
});

