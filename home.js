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



const benefits = new Swiper(".benefits_swiper", {
  loop: true,
    autoHeight: true,
    pagination: {
    el: ".benefits_pagination",
    clickable: true,
  },
});




const carswiper = new Swiper(".car_swiper", {
  loop: true,
   spaceBetween: 20,
  slidesPerView: 2.5,
  watchOverflow: false,
  breakpoints: {
    0:{
      slidesPerView:1
    },
    768: {
slidesPerView: 2.5,
    }

  },
    autoHeight: true,
    pagination: {
    el: ".car_pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".car_next",
    prevEl: ".car_prev",
  },
});
fetch("./db/Cars.json")
  .then(response => response.json())
  .then(cars => {
    const categories = cars.map(car => car.car_categorie);
    const uniqueCategories = [...new Set(categories)];
    const all = ["All", ...uniqueCategories];

    const filterlist = document.getElementById("filtercontainer");
    let categoriesFilterList = "";
    all.forEach(cat => {
      categoriesFilterList += `<div class="filter" data-car_categorie="${cat}">${cat}</div>`;
    });
    filterlist.innerHTML = categoriesFilterList;

    const filters = document.querySelectorAll(".filter");
    const carlist = document.getElementById("car_wrapper");

    function renderCars(list) {
      carlist.innerHTML = list
        .map(
          car => `
            <div class="car_slide swiper-slide justify-content-between d-flex flex-column">
              <div class="cartype p-4 d-inline-flex">
                <p>${car.car_categorie}</p>
              </div>
              <div class="carimgconatainer">
                <img src="${car.img}" alt="${car.name}">
              </div>
              <div class="d-flex w-100 align-items-center justify-content-center text-center">
                <h6 class="Carname">${car.name}</h6>
                <p class="Caryear">${car.year}</p>
              </div>
            </div>
          `
        )
        .join("");

      carswiper.update();
    }

    renderCars(cars);
    filters[0].classList.add("filter_active");

    filters.forEach(f => {
      f.addEventListener("click", () => {
        filters.forEach(filter => filter.classList.remove("filter_active"));
        f.classList.add("filter_active");

        const selectedcategory = f.dataset.car_categorie;
        const filteredcars =
          selectedcategory === "All"
            ? cars
            : cars.filter(c => c.car_categorie === selectedcategory);

        renderCars(filteredcars);
      });
    });
  });
