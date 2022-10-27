// add a add to cart event listener to the button with the id of "add-to-cart"
const cart = document.querySelectorAll("#add-to-cart");
const cartCount = document.querySelector(".cart-count");
const cartCountElement = document.createElement("p");
const cartList = document.querySelector(".modal-content");
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
		// find the second "p" inside const h3 using regex and remove <p> and </p> and remove the "K" from the price
		const regexPrice = /<p>(.*?)<\/p>/g;
		const cardPrice = cardHtml
			.match(regexPrice)[1]
			.replace(/<\/?p>/g, "")
			.replace("K", "")
			.replace(" ", "");
		console.log(cardPrice);
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
			//
			cartCountElement.innerHTML = cartArray.length;
		} else {
			button.src = "img/icon_cart-card.svg";
			// find the object by title and remove it from the cartArray
			const index = cartArray.findIndex((item) => item.title === cardTitle);
			cartArray.splice(index, 1);
			// store the cartArray in localStorage
			localStorage.setItem("cart", JSON.stringify(cartArray));
			// decrease the count by 1
			count--;
			if (count < 0) {
				count = 0;
			}
			cartCountElement.innerHTML = cartArray.length;
			if (cartArray.length === 0) {
				cartCountElement.remove();
			}
		}
	});
});
// if localStorage has a cart, set the cartArray to the localStorage cart
if (localStorage.getItem("cart")) {
	cartArray = JSON.parse(localStorage.getItem("cart"));
	cartCountElement.innerHTML = cartArray.length;
	document.querySelector(".hero__search").appendChild(cartCountElement);
}

// if the cartArray has an item, change the src of the button to "img/clicked.png"
cartArray.forEach((item) => {
	const button = document.querySelector(`[data-name="${item.title}"]`);
	button.classList.add("clicked");
	button.src = "img/clicked.png";
});

//* MODAL / POPUP *//

// Get the modal
const modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
cartCount.onclick = function () {
	if (localStorage.getItem("cart").length > 2) {
		console.log(localStorage.getItem("cart").length);
		modal.style.display = "block";
	} else {
		alert("Your cart is empty");
	}
	// insert the cartArray into the modal and add a remove button
	cartArray.forEach((item) => {
		const cartItem = document.createElement("div");
		cartItem.classList.add("cart-item");
		// add the title, image and price to the cartItem in a table format with a remove button and a quantity input

		cartItem.innerHTML = `
		<table>
			<tr>
				<td><img src="${item.img}" alt="${item.title}"></td>
				<td><h3>${item.title}</h3></td>
				<td><p>${item.price}K</p></td>
				<td><input type="number" value="1" min="0" /></td>
				<td><img class= "remove" src="img/shopping-cart.png" alt=""/></td>
			</tr>
		</table>
		`;
		cartList.appendChild(cartItem);
	});
};

// on remove button click, remove the item from the cartArray and localStorage
cartList.addEventListener("click", (e) => {
	if (e.target.classList.contains("remove")) {
		const item = e.target.closest(".cart-item");
		// hide modal if cartArray is empty
		if (cartArray.length === 1) {
			modal.style.display = "none";
		}
		const title = item.querySelector("h3").innerHTML;
		const index = cartArray.findIndex((item) => item.title === title);
		cartArray.splice(index, 1);
		localStorage.setItem("cart", JSON.stringify(cartArray));
		item.remove();
		// change the src of the button to "img/icon_cart-card.svg"
		const button = document.querySelector(`[data-name="${title}"]`);
		button.classList.remove("clicked");
		button.src = "img/icon_cart-card.svg";
		cartCountElement.innerHTML = cartArray.length;
		if (cartArray.length === 0) {
			cartCountElement.remove();
		}
	}
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
	// remove the cartArray from the modal
	cartList.innerHTML = "";
};

// When the user clicks anywhere outside of the modal, close it
document.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
		cartList.innerHTML = "";
	}
};
