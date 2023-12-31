import { createElement } from "./helpers.js";

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("show");
		} else {
			entry.target.classList.remove("show");
		}
	});
});

document.addEventListener("DOMContentLoaded", function () {
	const token = localStorage.getItem("token");
	const showLoggedInDiv = document.querySelector(".auth-nav-logged-in");
	const hideLoggedOutDiv = document.querySelector(".auth-nav-logged-out");

	if (token) {
		showLoggedInDiv.style.display = "block";
		hideLoggedOutDiv.style.display = "none";
	} else {
		showLoggedInDiv.style.display = "none";
		hideLoggedOutDiv.style.display = "block";
	}
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((element) => observer.observe(element));

const toggleElement = document.querySelector("#nav-bars");
const mainNav = document.querySelector(".main-nav");

toggleElement.addEventListener("click", () => {
	mainNav.style.display = mainNav.style.display === "block" ? "none" : "block";
});

const scrollDownBtn = document.querySelector(".scroll-btn");
scrollDownBtn.addEventListener("click", () => {
	window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
});

const regDropDown = document.querySelector("#reg-dropdown");

const userDropDownMenu = document.querySelector("#user-dropdown");
const dropDownMenu = document.querySelector(".dropdown-menu");
userDropDownMenu.addEventListener("click", () => {
	dropDownMenu.style.display =
		dropDownMenu.style.display === "flex" ? "none" : "flex";
});

document.addEventListener("DOMContentLoaded", () => {
	let profile = localStorage.getItem("role");

	let profileOptions;

	if (profile === "company") {
		profileOptions = [
			"Profile",
			"My Company",
			"My Ads",
			"Edit Profile",
			"Logout",
		];
	} else {
		profileOptions = [
			"Profile",
			"Ads",
			"Applications",
			"Edit Profile",
			"Logout",
		];
	}

	profileOptions.forEach((option) => {
		const li = createElement("li", "", [], "", dropDownMenu);
		const anchor = createElement(
			"a",
			option,
			[],
			option === "Logout" ? "logout-btn" : "",
			li
		);
		anchor.href = "#";
	});

	const logoutBtn = document.querySelector("#logout-btn");
	logoutBtn.addEventListener("click", () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		window.location.href = "http://127.0.0.1:5000/login";
	});
});
