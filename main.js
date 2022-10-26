// add a add to cart event listener to the button with the id of "add-to-cart"
const cart = document.querySelectorAll("#add-to-cart");
const cartCount = document.querySelector(".cart-count");
const cartCountElement = document.createElement("p");
let cartArray = [];
let count = 0;

// add a click event listener to the buttons with the id of "add-to-cart"
cart.forEach((button) => {
	button.addEventListener("click", (e) => {
		// append cartCountElement to ".hero__search"
		document.querySelector(".hero__search").appendChild(cartCountElement);
		// on every click, toggle "clicked" class
		button.classList.toggle("clicked");
		// if the button has the class of "clicked", change the src to img/clicked.png
		const cardHtml = e.target.closest("[data-link]").innerHTML;
		// find "h3" inside const h3 using regex
		const regexTxt = /<h3>(.*?)<\/h3>/;
		const cardTitle = cardHtml.match(regexTxt)[1];
		// find "img" inside const h3 using regex
		const regexImg = /<img src="(.*?)"/;
		const cardImg = cardHtml.match(regexImg)[1];
		// find "p" inside const h3 using regex
		const regexPrice = /<p>(.*?)<\/p>/;
		const cardPrice = cardHtml.match(regexPrice)[1];
		// create a new object with the title, image and price
		const cardObject = {
			title: cardTitle,
			img: cardImg,
			price: cardPrice,
		};
		if (button.classList.contains("clicked")) {
			button.src = "img/clicked.png";
			// push the object to the cartArray
			cartArray.push(cardObject);
			// store the cartArray in localStorage
			localStorage.setItem("cart", JSON.stringify(cartArray));
			// increase the count by 1
			count++;
			cartCountElement.innerHTML = +count;
		} else {
			button.src = "img/icon_cart-card.svg";
			// find the object by title and remove it from the cartArray
			const index = cartArray.findIndex((item) => item.title === cardTitle);
			cartArray.splice(index, 1);
			// store the cartArray in localStorage
			localStorage.setItem("cart", JSON.stringify(cartArray));
			// decrease the count by 1
			count--;
			cartCountElement.innerHTML = +count;
		}
	});
});
/* // get all h3 elements inside of the "popular__content__card__title" class
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
} */

//* MODAL / POPUP *//

// Get the modal
const modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
cartCount.onclick = function () {
	modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};
