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
		// on every click, switch back and forth between the classes of "add-to-cart" and "added-to-cart"
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

// create a <p> element next to the cart icon

// append the <p> element to the cart icon
