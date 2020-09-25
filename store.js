if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // REMOVE ITEM FROM CART
    let removeButtons = document.getElementsByClassName('btn-remove')
    for (let i = 0; i < removeButtons.length; i++) {
        let btn = removeButtons[i];
        btn.addEventListener('click', removeCartItems)
    }

    let qtyInputs = document.getElementsByClassName('cart-qty')
    for (let i = 0; i < qtyInputs.length; i++) {
        let input = qtyInputs[i];
        input.addEventListener('change', qtyChanged);
    }

    // ADD ITEM TO CART
    let addToCartButtons = document.getElementsByClassName('btn-add')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let btn = addToCartButtons[i];
        btn.addEventListener('click', addItemToCartClicked);
    }

    document.getElementsByClassName('btn-checkout')[0].addEventListener('click', purchasedClick);
}


function purchasedClick() {
    alert('Thank you for purchasing Guitar!');
    let cartItems = document.getElementsByClassName('cart-place');
    while (cartItems.hasChildeNodes()) {
        cartItems.removeChild(cartItems, firstChild);
    }
    updateCartTotal
}

function removeCartItems(event) {
    let btnClicked = event.target;
    btnClicked.parentElement.remove();
    updateCartTotal();
}

function qtyChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function addItemToCartClicked(event) {
    let btn = event.target;
    let item = btn.parentElement;
    let title = item.getElementsByClassName('item-name')[0].innerText;
    let price = item.getElementsByClassName('item-price')[0].innerText;
    let image = item.getElementsByClassName('item-img')[0].src
    addItemToCart(title, price, image);
    updateCartTotal();
}

function addItemToCart(title, price, image) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('item-cart');
    let cartItems = document.getElementsByClassName('cart-place')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-item-name')[0];
    console.log(cartItemsNames);
    let cartRowContents = `
        <img src="${image}" width="40px" style="border-radius: 4%;">
            <div class="detail-cart">
                <p>${title}</p>
                <p>${price}</p>
                <input class="cart-qty" type="text" style="width: 30px; text-align: center;" value="1">
            </div>
    <button id="myBtn" class="btn-remove" type="submit">Remove</button>
    </div>`
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItems)
    cartRow.getElementsByClassName('cart-qty')[0].addEventListener('change', qtyChanged)

}


function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-place')[0];
    let cartRows = cartItemContainer.getElementsByClassName('item-cart');
    let totalPrice = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let qtyElement = cartRow.getElementsByClassName('cart-qty')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let qty = qtyElement.value;
        totalPrice = totalPrice + (price * qty);
    }
    document.getElementsByClassName('total-price')[0].innerText = '$' + totalPrice + '.00';
}