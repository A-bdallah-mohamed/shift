const main_swiper = new Swiper(".mainswiper", {
  loop: true,
  pagination: {
    el: ".main_swiper-pagination",
    clickable: true,
  },
    pagination: {
    el: ".main_pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".main_prev",
    prevEl: ".main_next",
  },
});



const secondary = new Swiper(".secondary_swiper", {
  loop: true,
    autoHeight: true,
    pagination: {
    el: ".secondary_pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".secondary_next",
    prevEl: ".secondary_prev",
  },
});



const Job_swiper = new Swiper(".job_swiper", {
  loop: true,
   slidesPerView: 4,  
  spaceBetween: 20
});
