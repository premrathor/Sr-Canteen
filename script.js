let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
  searchForm.classList.toggle('active');
  shoppingCart.classList.remove('active');
  loginForm.classList.remove('active');
  navbar.classList.remove('active');
}

let shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () => {
  shoppingCart.classList.toggle('active');
  searchForm.classList.remove('active');
  loginForm.classList.remove('active');
  navbar.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () => {
  loginForm.classList.toggle('active');
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  loginForm.classList.remove('active');
}

window.onscroll = () => {
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  loginForm.classList.remove('active');
  navbar.classList.remove('active');
}

var swiper = new Swiper(".product-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".review-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
  },
});



if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName('fas fa-trash')
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
  }

  var quantityInputs = document.getElementsByClassName('quantity')
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }

  var addToCartButtons = document.getElementsByClassName('btn')
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
  }

  document.getElementsByClassName('btn-checkout')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
  alert('Thank you for your purchase')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}

function removeCartItem(event) {
  var buttonClicked = event.target
  let itemRow = buttonClicked.parentElement.parentElement;
  itemRow.remove();
  updateCartTotal()
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal()
}

function addToCartClicked(event) {
  var button = event.target
  var shopItem = button.parentElement
  var title = shopItem.getElementsByClassName('title')[0].innerText
  var price = shopItem.getElementsByClassName('price')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  addItemToCart(title, price, imageSrc)
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('box')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('title')
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('This item is already added to the cart')
      return
    }
  }
  var cartRowContents = `
        <div class="box">
          <button class="delete"> <i class="fas fa-trash"></i>
          </button>
          <img class="cart-item-image" src="${imageSrc}" alt="">
          <div class="content">
            <h3 class="title">${title}</h3>
            <span class="price">${price}</span>
            <div class="num" >
            <input class="quantity" type="number" value="1">
            </div>
          </div>
        </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('fas fa-trash')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('quantity')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('box')
  var total = 0
  for (var i = 0; i < (cartRows.length); i = i + 2) {
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('price')[0]

    var quantityElement = cartRow.getElementsByClassName('quantity')[0]
    var price = parseFloat(priceElement.innerText.replace('Rs', ''))
    var quantity = quantityElement.value

    total = total + (price * quantity)
    console.log(price)

  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('total')[0].innerText = 'Rs' + total
}



$(document).ready(function(){
    $('.btn').click(function(){
        var id = $(this).data('id');
        $.post("/cart/addAjax/"+id, {}, function (data) {
            $('#cart-count').html(data);
        });
        return false;
    });
});





