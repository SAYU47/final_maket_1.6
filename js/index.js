//Переключатели кнопок Показать всё и Скрыть
const readAllBtn = document.querySelector(".read-all-btn");
const hiddenText = document.querySelector(".hidden-paragraph");
const repairList = document.querySelector(".repair__list");
const brandsList = document.querySelector(".brand__list");
const showBrands = document.querySelector("#show-brands");
const showRepairs = document.querySelector("#show-repairs");

readAllBtn.addEventListener("click", function (evt) {
	evt.preventDefault();
	hiddenText.classList.toggle("active");
	if (hiddenText.classList.contains("active")) {
		readAllBtn.innerHTML = "Скрыть";
		readAllBtn.classList.remove("read-all-btn");
		readAllBtn.classList.add("hide-all-btn");
	} else {
		readAllBtn.innerHTML = "Читать ещё";
		readAllBtn.classList.add("read-all-btn");
		readAllBtn.classList.remove("hide-all-btn");
	}
});

showBrands.addEventListener("click", function (evt) {
	evt.preventDefault();
	brandsList.classList.toggle("active");
	if (brandsList.classList.contains("active")) {
		showBrands.innerHTML = "Скрыть";
		showBrands.classList.remove("show-all-btn");
		showBrands.classList.add("hide-all-btn");
	} else {
		showBrands.innerHTML = "Показать всё";
		showBrands.classList.add("show-all-btn");
		showBrands.classList.remove("hide-all-btn");
	}
});

showRepairs.addEventListener("click", function (evt) {
	evt.preventDefault();
	repairList.classList.toggle("active");
	if (repairList.classList.contains("active")) {
		showRepairs.innerHTML = "Скрыть";
		showRepairs.classList.remove("read-all-btn");
		showRepairs.classList.add("hide-all-btn");
	} else {
		showRepairs.innerHTML = "Показать всё";
		showRepairs.classList.add("read-all-btn");
		showRepairs.classList.remove("hide-all-btn");
	}
});

//Выезжающее боковое меню
const menuBurgerBtn = document.querySelector(".menu-burger-btn");
const sidebar = document.querySelector(".sidebar");
const sidebarWrap = document.querySelector(".sidebar-wrapper");
const searchBtn = document.querySelector(".rect");
const body = document.querySelector("body");
const menuList = document.querySelector(".menu__list");
const overlay = document.querySelector(".sidebar-hidden");

menuBurgerBtn.addEventListener("click", function (evt) {
	evt.preventDefault();
	menuBurgerBtn.classList.toggle("active"); // кнопка меню
	sidebar.classList.toggle("active"); // открыть меню
	menuList.classList.toggle("active");
	body.classList.toggle("lock");
	sidebarWrap.classList.toggle("active");
	searchBtn.classList.toggle("active");
});
overlay.addEventListener("click", function () {
	menuBurgerBtn.classList.remove("active");
	sidebar.classList.remove("active");
	sidebarWrap.classList.remove("active");
	body.classList.remove("lock");
});

const seviseNav = document.querySelectorAll(".services-nav__item");

seviseNav.forEach((el, index) => {
	el.addEventListener("click", (event) => {
		event.preventDefault();

		const spanClassList = seviseNav[index].classList;
		if (spanClassList.contains("active")) {
			spanClassList.remove("active");
		} else {
			seviseNav.forEach((el) => el.classList.remove("active"));
			spanClassList.add("active");
		}
	});
});

//sidebar
//открываем контент по кнопке в сайдбаре
const sidebarItem = document.querySelectorAll(".sidebar__item");
const content = document.querySelectorAll(".content-container");
const headerSubmit = document.querySelector(".header-submit");
sidebarItem.forEach(function (el) {
	el.addEventListener("click", function (event) {
		const path = event.currentTarget.dataset.path;
		content.forEach(function (container) {
			searchBtn.classList.remove("active");
			menuBurgerBtn.classList.remove("active");
			container.classList.remove("active");
			menuList.classList.remove("active"); //закрываем меню при клике на список
			sidebar.classList.remove("active");
			sidebarWrap.classList.remove("active");
			body.classList.remove("lock"); //разлочить body при клике на элемент меню
			headerSubmit.classList.remove("active");
		});
		const dataTarget = document.querySelector(`[data-target="${path}"]`);
		dataTarget.classList.add("active");
	});
});

//добавляем к элементам сайдбара стили при клике
sidebarItem.forEach((el, index) => {
	el.addEventListener("click", (event) => {
		event.preventDefault();

		const item = sidebarItem[index].classList;
		if (item.contains("active")) {
			item.remove("active");
		} else {
			sidebarItem.forEach((el) => el.classList.remove("active"));
			item.add("active");
		}
	});
});
//Модальные окна
const modalLinks = document.querySelectorAll(".modal-link");
const telInput = document.querySelector(".modal__container-input");
// const z = document.querySelector('.modal__container-input').autofocus
let unlock = true; //флаг, чтобы исключить двойное нажатие

//делаем проверку и добавляем в новую переменную
if (modalLinks.length > 0) {
	for (let index = 0; index < modalLinks.length; index++) {
		const modalLink = modalLinks[index];
		modalLink.addEventListener("click", function (el) {
			const modalName = modalLink.getAttribute("href").replace("#", "");
			const curentModal = document.getElementById(modalName);
			sidebarWrap.classList.remove("active");
			headerSubmit.classList.add("active");
			sidebar.classList.remove("active");
			menuBurgerBtn.classList.add("active");

			modalOpen(curentModal);
			el.preventDefault();
		});
	}
}
const modal = document.querySelector(".modal");

if (modal.classList.contains("open")) {
}

//закрываем окно по кнопке
const closeIcon = document.querySelectorAll(".close");

if (closeIcon.length > 0) {
	for (let index = 0; index < closeIcon.length; index++) {
		const el = closeIcon[index];
		el.addEventListener("click", function (e) {
			modalClose(el.closest(".modal"));
			headerSubmit.classList.remove("active");
			menuBurgerBtn.classList.remove("active");
			e.preventDefault();
		});
	}
}

//фукция для открытия окна
function modalOpen(curentModal) {
	if (curentModal && unlock) {
		//проверяем открыто или нет
		const modalActive = document.querySelector(".open");
		if (modalActive) {
			modalClose(modalActive, false);
		} else {
			body.classList.add("lock"); //залочить body
		}
		curentModal.classList.add("open");
		document.querySelector("#tel-input").focus();
		document.querySelector("#message-input").focus();
		curentModal.addEventListener("click", function (el) {
			if (!el.target.closest(".modal__container")) {
				//закрываем окно при клике на заблюренную область
				headerSubmit.classList.remove("active");

				modalClose(el.target.closest(".modal"));
			}
		});
	}
}

//функция для закрытия окна
function modalClose(modalActive, doUnlock = true) {
	if (unlock) {
		modalActive.classList.remove("open");
		menuBurgerBtn.classList.remove("active");
		body.classList.remove("lock"); //разлочить body
	}
}

//закрываем модалку по клавише esc
document.addEventListener("keydown", function (el) {
	if (el.which === 27) {
		const modalActive = document.querySelector(".open");
		modalActive.classList.remove("open");
		menuBurgerBtn.classList.remove("active");
		headerSubmit.classList.remove("active");
		modalClose(modalActive);
	}
});

//Подключение слайдера Swipper
const y = window.matchMedia("(min-width: 768px)");
const x = window.matchMedia("(min-width: 540px)");
if (!y.matches) {
	new Swiper(".nav-swiper", {
		pagination: {
			el: ".swiper-pagination",
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		scrollbar: {
			el: ".swiper-scrollbar",
		},
		freeMode: true,
	});
} else if (y.matches) {
	swiper.destroy();
}

if (!x.matches) {
	new Swiper(".brands-swiper", {
		pagination: {
			el: ".swiper-pagination",
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		scrollbar: {
			el: ".swiper-scrollbar",
		},
		slidesPerView: 1,
		spaceBetween: 34,
	});
} else if (x.matches) {
	swiper.destroy();
}

if (!x.matches) {
	new Swiper(".repairs-swiper", {
		pagination: {
			el: ".swiper-pagination",
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		scrollbar: {
			el: ".swiper-scrollbar",
		},
		slidesPerView: 1,
		spaceBetween: 105,
	});
} else if (x.matches) {
	swiper.destroy();
}

if (!x.matches) {
	new Swiper(".price-swiper", {
		pagination: {
			el: ".swiper-pagination",
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		scrollbar: {
			el: ".swiper-scrollbar",
		},
		slidesPerView: 1,
		spaceBetween: 50,
	});
} else if (x.matches) {
	swiper.destroy();
}
