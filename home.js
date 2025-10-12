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

const benefitsSwiper = new Swiper(".benefits_swiper", {
  loop: true,
  autoHeight: true,
  pagination: {
    el: ".benefits_pagination",
    clickable: true,
  },
});

fetch("./db/Cars.json")
  .then(res => res.json())
  .then(cars => {
    const lang = document.documentElement.lang || 'en';
    const allLabel = lang === 'ar' ? 'الكل' : 'All';

    const allCategories = [allLabel, ...new Set(cars.map(car => car.car_categorie[lang]))];
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
              <p>${car.car_categorie[lang]}</p>
            </div>
            <div class="carimgconatainer">
              <img src="${car.img}" alt="${car.name[lang]}">
            </div>
            <div class="d-inline-flex w-100 align-items-center justify-content-center flex-column p-3">
              <h6 class="Carname">${car.name[lang]}</h6>
              <button class="Specification" type="button" data-bs-toggle="modal" data-bs-target="#specification">
                ${lang === "en" ? 'specifications' : 'المواصفات'}
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
      const car = list.find(c => c.name[lang] === carName);
      if (car) openSpecification(car);
    });
  });
}


    function openSpecification(car) {
      specificationWindow.classList.remove("pe-none", "opacity-0");
      specificationWindow.innerHTML = `
          <div class="specificationwindowcontainer">
            <div class="col-12 d-flex d-none d-md-flex justify-content-md-between align-items-center">
              <p class="fs-4 fw-bold mb-0 ">${car.name[lang]}, ${car.year}</p>
              <p data-bs-dismiss="modal" class="mb-0 close"><i class="bi bi-x-lg"></i></p>
            </div>

            <div class="col-12 cardata">
              <div class="row h-md-100">
                <div class="col-md-8 col-12">
<div class="d-flex flex-column justify-content-md-between justify-content-start h-md-100">
                    <div class="d-flex gap-3 mt-md-4 mt-0 justify-content-md-start justify-content-between">
                      <div class="cartab center fs-4 ">${car.car_categorie[lang]}</div>
                      <div class="cartab center fs-6">
                      
                                      ${lang === "en" ? `From <span> &nbsp;${car.price} SAR &nbsp; </span> / 1 day` : `من <span> &nbsp;${car.price} ريال &nbsp; </span> / اليوم`}


                                      </div>
                    </div>
                    <div class="img-container">
                      <img src="${car.img}" class="img-fluid rounded" alt="${car.name[lang]}">
                    </div>
                    <div class="d-flex d-md-none fs-2 fw-bold center">${car.name[lang]}</div>
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
                <div class="col-12 col-md-4 pt-2 pt-md-5 pb-3 py-md-0 pe-5">
                  <div class="d-flex flex-column justify-content-between h-100 py-0 pb-xxl-5 pt-xxl-2 gap-4">
                
                
                
                  <div class="d-flex flex-column gap-2">
                  <p>
                                                        ${lang === "en" ? 'General' : 'عامة'}</p>
</p>



                  <div class="d-flex align-items-center justify-content-between">

                 <div class="d-flex align-items-center gap-4">
                  <i class="fa-solid fa-gas-pump"></i>
                  <p>
                    ${lang === "en" ? 'Fuel' : 'الوقود'}</p>
                  </div>

                  <p>${car.general.fuel[lang]}</p>
                  </div>




                        <div class="d-flex align-items-center justify-content-between">

                 <div class="d-flex align-items-center gap-4">
                  <i class="fa-solid fa-car"></i>
                  <p>
                                      ${lang === "en" ? 'FuEngineel' : 'المحرك'}</p>

                  </p>
                  </div>

                  <p>${car.general.engine[lang]}</p>
                  </div>




                  </div>






                            
                  <div class="d-flex flex-column gap-2">
                  <p>
                                      ${lang === "en" ? 'Safety' : 'الامان'}</p>
</p>



                  <div class="d-flex align-items-center justify-content-between">

                 <div class="d-flex align-items-center gap-4">
                  <i class="fa-solid fa-shield"></i>
                  <p>
                                                        ${lang === "en" ? 'Airbags' : 'اكياس هوائيه'}</p>
</p>
                  </div>

                  <p>${car.safety.airbags[lang]}</p>
                  </div>




                        <div class="d-flex align-items-center justify-content-between">

                 <div class="d-flex align-items-center gap-4">
<i class="fa-solid fa-satellite-dish"></i>
                  <p>
                                                                          ${lang === "en" ? 'Sensors' : 'اجهزة استشعار'}</p>

                                                                          </p>
                  </div>

                  <p>${car.safety.sensors ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-xmark"></i>'}</p>
                  </div>




                  </div>




                            
                  <div class="d-flex flex-column gap-2">
                  <p> ${lang === "en" ? 'Music' : 'موسيقي'}</p>



                  <div class="d-flex align-items-center justify-content-between">

                 <div class="d-flex align-items-center gap-4">
                 <i class="fa-brands fa-apple"></i>
                  <p>Apple carplay</p>
                  </div>

                  <p>${car.music.applecarplay ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-xmark"></i>'}</p>
                  </div>




                        <div class="d-flex align-items-center justify-content-between">

                 <div class="d-flex align-items-center gap-4">
                  <i class="fa-brands fa-android"></i>
                  <p>Android auto</p>
                  </div>

                  <p>${car.music.androidauto ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-xmark"></i>'}</p>
                  </div>




                        <div class="d-flex align-items-center justify-content-between">

                 <div class="d-flex align-items-center gap-4">
              <i class="fa-brands fa-bluetooth"></i>
                  <p>${lang === "en" ? 'Bluetooth' : 'بلوتوث'}</p>
                  </div>

                  <p>${car.music.bluetooth ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-xmark"></i>'}</p>
                  </div>



                        <div class="d-flex align-items-center justify-content-between">

                 <div class="d-flex align-items-center gap-4">
<i class="fa-solid fa-radio"></i>                  <p>${lang === "en" ? 'AM / FM Radio' : 'الراديو'}</p>
                  </div>

                  <p>${car.music.amfm ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-xmark"></i>'}</p>
                  </div>



                  </div>






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
        slidesPerView: 1.3,
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
    const filteredCars =
      category === allLabel
        ? cars
        : cars.filter(c => c.car_categorie[lang] === category);

    renderCars(filteredCars);
  });
});

    
    renderCars(cars);
    initCarSwiper();
  });

document.getElementById("businessdropdown")?.addEventListener("click", () => {
  document.getElementById("dropdown")?.classList.toggle("dropdownshow");
});
