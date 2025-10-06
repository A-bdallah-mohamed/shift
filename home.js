const main_swiper = new Swiper(".mainswiper", {
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
    0: {
      slidesPerView: 1,
      centeredSlides: false
    },
    768: {
      slidesPerView: 2.5,
      centeredSlides: false
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
    const specificationwindow = document.getElementById("specificationswindow")

    function renderCars(list) {
      carlist.innerHTML = list
        .map(
          car => `
            <div class="car_slide swiper-slide justify-content-between d-flex flex-column position-relative">
              <div class="cartype p-4 d-inline-flex">
                <p>${car.car_categorie}</p>
              </div>
              <div class="carimgconatainer">
                <img src="${car.img}" alt="${car.name}">
              </div>
              <div class="d-inline-flex w-100 align-items-center justify-content-center text-center flex-column p-4">
                <h6 class="Carname">${car.name}</h6>
<button class="Specification type="button" data-bs-toggle="modal" data-bs-target="#specification"" >Specification</button>
              </div>

              
            </div>
          `
        )
        .join("");


      const specificationButtons = document.querySelectorAll(".Specification");




      specificationButtons.forEach(button => {
        button.addEventListener("click", () => {
          const carSlide = button.closest(".car_slide");
          const carName = carSlide.querySelector(".Carname").innerText;
          let selectedcar = cars.find(car => car.name === carName)
          console.log(
            "Specifications for:",
            selectedcar
          );
          specificationwindow.classList.remove("pe-none", "opacity-0");
          specificationwindow.innerHTML =
            `
<div class="container-fluid">
  <div class="specificationwindowcontainer">
    
    <div class="col-12 d-flex justify-content-between align-items-center">
      <p class="fs-2 fw-bold mb-0">${selectedcar.name}, ${selectedcar.year}</p>
      <p data-bs-dismiss="modal" class="mb-0">
        <i class="fa-solid fa-xmark fs-2"></i>
      </p>
    </div>

    <div class="col-12 flex-grow-1 cardata">
      <div class="row h-100">
        
        <div class="col-8">
          <div class="d-flex flex-column justify-content-between h-100">
            
            <div class="d-flex gap-3">
              <div class="cartab">${selectedcar.car_categorie}</div>
              <div class="cartab">From <span>${selectedcar.price} SAR</span> / 1 day</div>
            </div>

            <div class="img-container">
              <img src="${selectedcar.img}" class="img-fluid rounded" alt="${selectedcar.name}">
            </div>

            <div class="d-flex gap-4 fs-4 fw-bold mb-4">
              <div class="d-flex align-items-center gap-2">
                <i class="fa-solid fa-user"></i>
                <p class="mb-0">${selectedcar.capacity.people}</p>
              </div>
              <div class="d-flex align-items-center gap-2">
                <i class="fa-solid fa-car"></i>
                <p class="mb-0">${selectedcar.capacity.doors}</p>
              </div>
              <div class="d-flex align-items-center gap-2">
                <i class="fa-solid fa-suitcase-rolling"></i>
                <p class="mb-0">${selectedcar.capacity.bags}</p>
              </div>
            </div>

          </div>
        </div>

        <!-- Right Column -->
        <div class="col-4">
          <div class="d-flex flex-column justify-content-between h-100">

            <div class="d-flex flex-column">
              <h5>General</h5>
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center gap-2">
                  <i class="fa-solid fa-gas-pump"></i>
                  <p class="mb-0">Fuel</p>
                </div>
                <p class="mb-0">${selectedcar.general.fuel}</p>
              </div>
               <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center gap-2">
                  <i class="fa-solid fa-car"></i>
                  <p class="mb-0">Engine</p>
                </div>
                <p class="mb-0">${selectedcar.general.engine}</p>
              </div>
            </div>



                        <div class="d-flex flex-column">
              <h5>Safety</h5>
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center gap-2">
                  <i class="fa-solid fa-shield"></i>
                  <p class="mb-0">Airbags</p>
                </div>
                <p class="mb-0">${selectedcar.saftey.airbags}</p>
              </div>

               <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center gap-2">
                  <i class="fa-solid fa-satellite-dish"></i>
                  <p class="mb-0">Sensors</p>
                </div>
                <p class="mb-0">${selectedcar.saftey.sensors === true ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-xmark"></i>'}</p>
              </div>
            </div>



                        <div class="d-flex flex-column">
              <h5>Music</h5>
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center gap-2">
             <i class="fa-brands fa-apple"></i>
                  <p class="mb-0">Apple carplay</p>
                </div>
                <p class="mb-0">${selectedcar.music.applecarplay === true ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-xmark"></i>'}</p>
              </div>

                      <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center gap-2">
            <i class="fa-brands fa-android"></i>
                  <p class="mb-0">Android auto</p>
                </div>
                <p class="mb-0">${selectedcar.music.androidauto === true ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-xmark"></i>'}</p>
              </div>

                      <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center gap-2">
             <i class="fa-brands fa-bluetooth-b"></i>
                  <p class="mb-0">Bluetooth</p>
                </div>
                <p class="mb-0">${selectedcar.music.bluetooth === true ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-xmark"></i>'}</p>
              </div>

                      <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center gap-2">
            <i class="fa-solid fa-radio"></i>
                  <p class="mb-0">AM / FM Radio</p>
                </div>
                <p class="mb-0">${selectedcar.music.amfm === true ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-xmark"></i>'}</p>
              </div>


            </div>




          </div>
        </div>

      </div>
    </div>

    <!-- Footer -->
    <div class="col-12 mt-3">
      <button class="btn btn-secondary w-100" data-bs-dismiss="modal">Cancel</button>
    </div>

  </div>
</div>


        `;
          const cancelButtons = document.querySelectorAll(".cancelspecifications")

          cancelButtons.forEach(cancel => {
            cancel.addEventListener("click", () => {
              specificationwindow.classList.add("pe-none", "opacity-0")
            })
          })

        });


      });


      carswiper.update();
      carswiper.slideTo(0, 0);
    }

    renderCars(cars);
    filters[0].classList.add("filter_active");

    filters.forEach(f => {
      f.addEventListener("click", () => {
        filters.forEach(filter => filter.classList.remove("filter_active"));
        f.classList.add("filter_active");

        const selectedcategory = f.dataset.car_categorie;
        const filteredcars =
          selectedcategory === "All" ?
          cars :
          cars.filter(c => c.car_categorie === selectedcategory);

        renderCars(filteredcars);
      });
    });
  });


const toggledropdown = document.getElementById("businessdropdown")
const dropdown = document.getElementById("dropdown")
toggledropdown.addEventListener('click', () => {
  dropdown.classList.toggle('dropdownshow')
})