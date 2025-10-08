// ====== MAIN SWIPER INITIALIZATION ======
const mainSwiper = new Swiper(".mainswiper", {
  loop: true,
  pagination: {
    el: ".main_pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".main_prev",
    prevEl: ".main_next",
  },
});

// ====== SECONDARY SWIPER ======
const secondarySwiper = new Swiper(".secondary_swiper", {
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

// ====== BENEFITS SWIPER ======
const benefitsSwiper = new Swiper(".benefits_swiper", {
  loop: true,
  autoHeight: true,
  pagination: {
    el: ".benefits_pagination",
    clickable: true,
  },
});

// ====== CARS SECTION ======
fetch("./db/Cars.json")
  .then(res => res.json())
  .then(cars => {
    
    const allCategories = ["All", ...new Set(cars.map(car => car.car_categorie))];
    const filterContainer = document.getElementById("filtercontainer");
    const carWrapper = document.getElementById("car_wrapper");
    const specificationWindow = document.getElementById("specificationswindow");
    let carSwiper;

    
    filterContainer.innerHTML = allCategories
      .map(cat => `<div class="filter" data-car_categorie="${cat}">${cat}</div>`)
      .join("");

    const filters = document.querySelectorAll(".filter");
    filters[0]?.classList.add("filter_active");

     
    function renderCars(list) {
      carWrapper.innerHTML = list
        .map(car => `
          <div class="car_slide swiper-slide d-flex flex-column justify-content-between position-relative">
            <div class="cartype p-3 d-inline-flex">
              <p>${car.car_categorie}</p>
            </div>
            <div class="carimgconatainer">
              <img src="${car.img}" alt="${car.name}">
            </div>
            <div class="d-inline-flex w-100 align-items-center justify-content-center flex-column p-3">
              <h6 class="Carname">${car.name}</h6>
              <button class="Specification" type="button" data-bs-toggle="modal" data-bs-target="#specification">
                Specification
              </button>
            </div>
          </div>
        `)
        .join("");

      attachSpecificationListeners(list);
      carSwiper?.update();
      carSwiper?.slideTo(0, 0);
    }

     
    function attachSpecificationListeners(list) {
      document.querySelectorAll(".Specification").forEach(btn => {
        btn.addEventListener("click", () => {
          const carName = btn.closest(".car_slide").querySelector(".Carname").innerText;
          const car = list.find(c => c.name === carName);
          openSpecification(car);
        });
      });
    }

    function openSpecification(car) {
      specificationWindow.classList.remove("pe-none", "opacity-0");
      specificationWindow.innerHTML = `
          <div class="specificationwindowcontainer">
            <div class="col-12 d-flex d-none d-md-flex justify-content-md-between align-items-center">
              <p class="fs-4 fw-bold mb-0 ">${car.name}, ${car.year}</p>
              <p data-bs-dismiss="modal" class="mb-0 close"><i class="bi bi-x-lg"></i></p>
            </div>

            <div class="col-12 cardata">
              <div class="row h-md-100">
                <div class="col-md-8 col-12">
<div class="d-flex flex-column justify-content-md-between justify-content-start h-md-100">
                    <div class="d-flex gap-3 mt-md-4 mt-0 justify-content-md-start justify-content-between">
                      <div class="cartab ">${car.car_categorie}</div>
                      <div class="cartab ">From <span>${car.price} SAR</span> / 1 day</div>
                    </div>
                    <div class="img-container">
                      <img src="${car.img}" class="img-fluid rounded" alt="${car.name}">
                    </div>
                    <div class="d-flex d-md-none fs-2 fw-bold center">${car.name}</div>
                                        <div class="d-flex d-md-none fs-6 center pb-3 text-muted">${car.year}</div>

                    <div class="d-flex gap-4 fs-4 fw-bold mb-2 justify-content-center justify-content-md-start">
                      <div class="d-flex align-items-center gap-3 fs-5">
                        <i class="fa-solid fa-user"></i>
                        <p class="mb-0">${car.capacity.people}</p>
                      </div>
                      <div class="d-flex align-items-center gap-3 ms-2 fs-5">
                        <i class="fa-solid fa-car"></i>
                        <p class="mb-0">${car.capacity.doors}</p>
                      </div>
                      <div class="d-flex align-items-center gap-3 ms-2 fs-5">
                        <i class="fa-solid fa-suitcase-rolling"></i>
                        <p class="mb-0">${car.capacity.bags}</p>
                      </div>
                    </div>
                  </div>
                </div>
<div class="gryaline my-2 d-flex d-md-none"></div>
                <div class="col-12 col-md-4 py-4 py-md-0">
                  <div class="d-flex flex-column justify-content-between h-100 py-0 py-xxl-5 gap-4">
                    ${createSpecificationSections(car)}
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12">
              <button class="w-100 cancelspecifications" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
      `;


    }

    
    function createSpecificationSections(car) {
      return `
        ${section("General", [
          { icon: "fa-gas-pump", label: "Fuel", value: car.general.fuel },
          { icon: "fa-car", label: "Engine", value: car.general.engine }
        ])}

        ${section("Safety", [
          { icon: "fa-shield", label: "Airbags", value: car.saftey.airbags },
          { icon: "fa-satellite-dish", label: "Sensors", value: car.saftey.sensors ? checkIcon() : xIcon() }
        ])}

        ${section("Music", [
          { icon: "fa-brands fa-apple", label: "Apple CarPlay", value: car.music.applecarplay ? checkIcon() : xIcon() },
          { icon: "fa-brands fa-android", label: "Android Auto", value: car.music.androidauto ? checkIcon() : xIcon() },
          { icon: "fa-brands fa-bluetooth-b", label: "Bluetooth", value: car.music.bluetooth ? checkIcon() : xIcon() },
          { icon: "fa-solid fa-radio", label: "AM / FM Radio", value: car.music.amfm ? checkIcon() : xIcon() }
        ])}
      `;
    }

    function section(title, items) {
      return `
        <div class="d-flex flex-column gap-2">
          <p class="fw-bold">${title}</p>
          <div class="d-flex flex-column gap-3">
            ${items
              .map(
                item => `
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center gap-3">
                    <i class="fa-solid ${item.icon}"></i>
                    <p >${item.label}</p>
                  </div>
                  <p>${item.value}</p>
                </div>
              `
              )
              .join("")}
          </div>
        </div>
      `;
    }

    const checkIcon = () => `<i class="fa-solid fa-check"></i>`;
    const xIcon = () => `<i class="fa-solid fa-xmark"></i>`;

           
function initCarSwiper() {
  if (carSwiper) carSwiper.destroy(true, true);

  carSwiper = new Swiper(".car_swiper", {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 2.6,
    watchOverflow: false,
    loopAdditionalSlides: 1,
    autoHeight: true, 
    on: {
      slideChangeTransitionStart() {
        carSwiper.updateAutoHeight(300);
      },
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        centeredSlides: true,
      },
      768: {
        slidesPerView: 2.6,
        centeredSlides: true,
      },
      1024: {
        slidesPerView: 2.6,
        centeredSlides: false,
      },
    },
    pagination: {
      el: ".car_pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".car_next",
      prevEl: ".car_prev",
    },
  });
}

    
    filters.forEach(filter => {
      filter.addEventListener("click", () => {
        filters.forEach(f => f.classList.remove("filter_active"));
        filter.classList.add("filter_active");

        const category = filter.dataset.car_categorie;
        const filteredCars = category === "All" ? cars : cars.filter(c => c.car_categorie === category);

        renderCars(filteredCars);
      });
    });

    
    renderCars(cars);
    initCarSwiper();
  });

document.getElementById("businessdropdown")?.addEventListener("click", () => {
  document.getElementById("dropdown")?.classList.toggle("dropdownshow");
});
