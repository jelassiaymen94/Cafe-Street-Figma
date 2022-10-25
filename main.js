// add a add to cart event listener to the button with the id of "add-to-cart"
const cart = document.querySelectorAll("#add-to-cart");
const cartCount = document.querySelector(".cart-count");
const cartCountElement = document.createElement("p");
let count = 0;
// add a click event listener to the buttons with the id of "add-to-cart"
cart.forEach((button) => {
	button.addEventListener("click", (e) => {
		// append cartCountElement to ".hero__search"
		document.querySelector(".hero__search").appendChild(cartCountElement);
		// on every click, toggle "clicked" class
		button.classList.toggle("clicked");
		// if the button has the class of "clicked", change the src to img/clicked.png
		if (button.classList.contains("clicked")) {
			button.src = "img/clicked.png";
			count++;
			cartCountElement.innerHTML = +count;
		} else {
			button.src = "img/icon_cart-card.svg";
			count--;
			cartCountElement.innerHTML = +count;
		}
	});
});

// get all h3 elements inside of the "popular__content__card__title" class
const popularContentCardTitle = document.querySelectorAll(
	".popular__content__card__title h3"
);
const popularContentCardPrice = document.querySelectorAll(
	".popular__content__card__title p"
);
const specialCardTitle = document.querySelectorAll(".special__card__title h3");
const specialCardPrice = document.querySelectorAll(".special__card__title p");
// loop through the popularContentCardTitle array and get the text content of each element and push it into the popularContentCardTitleArray
const popularContentCardTitleArray = [];
popularContentCardTitle.forEach((title) => {
	popularContentCardTitleArray.push(title.textContent);
});
specialCardTitle.forEach((title) => {
	popularContentCardTitleArray.push(title.textContent);
});

const popularContentCardPriceArray = [];

popularContentCardPrice.forEach((price) => {
	popularContentCardPriceArray.push(price.textContent);
});

const specialCardPriceArray = [];

specialCardPrice.forEach((price) => {
	specialCardPriceArray.push(price.textContent);
});

// associate the popularContentCardTitleArray with the popularContentCardPriceArray into an object
const popularContentCardObject = {};

popularContentCardTitleArray.forEach((title, index) => {
	popularContentCardObject[title] = popularContentCardPriceArray[index];
});

specialCardTitle.forEach((title, index) => {
	popularContentCardObject[title.textContent] = specialCardPriceArray[index];
});

// append each object key and value to local storage
for (const [key, value] of Object.entries(popularContentCardObject)) {
	localStorage.setItem(key, value);
}
