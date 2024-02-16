let counter =0;
         
         
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const addProductId = [];

const urunVerisi = localStorage.getItem(productId);
if (urunVerisi) {
    const urun = JSON.parse(urunVerisi);

    // Ürün detayını HTML'e ekle
    const urunDetayDiv = document.querySelector('.imgContCarousel');
    urunDetayDiv.innerHTML = `
    <div class="homeImg">
    <img src="${urun.thumbnail}" alt="Product Image">
    </div>
    <div class="thumbnail-img">
    <!-- Küçük resimler için a etiketleri ekle -->
    <a href="#" class="thumb-link"><img class="thumbimg" src="${urun.images[0]}" alt="Product Image"></a>
    <a href="#" class="thumb-link"><img class="thumbimg" src="${urun.images[1]}" alt="Product Image"></a>
    <a href="#" class="thumb-link"><img class="thumbimg" src="${urun.images[2]}" alt="Product Image"></a>
    <a href="#" class="thumb-link"><img class="thumbimg" src="${urun.images[3]}" alt="Product Image"></a>
    </div>
    `;
    document.querySelector(".imgProductText").innerHTML = `
    <p class="title">${urun.category}</p>

    <h2 class="productTitle">${urun.title}</h2>

    <p class="productDesc">${urun.description}</p>

    <div class="priceAndDiscount">
        <p class="productPrice">$ $${urun.price}</p>
        <p class="productDiscount">%  ${urun.discountPercentage}</p>
    </div>

    <p class="discounts">1098</p>

    <div class="buttonsAndAdd">
        <div class="comment-rating">
            <a href="#" class="comment-rating-up">
                +
            </a>
            <strong id="addBtns2">${counter}</strong>
            <a href="#" class="comment-rating-down">
                -
            </a>     
            </div>
            <a href="#" class="addToCard">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.0905 2.91311H16.7397C17.2062 2.91311 17.5482 3.35211 17.4353 3.80391L15.9785 9.63048C15.9025 9.93446 15.6378 10.1539 15.3251 10.1723L3.86762 10.8456C4.07245 11.3243 4.54702 11.6529 5.09162 11.6529H13.0982C14.2967 11.6529 15.2717 12.628 15.2717 13.8264C15.2717 15.0249 14.2967 16 13.0982 16C11.5964 16 10.5406 14.502 11.0544 13.0868H7.13056C7.645 14.5038 6.58692 16 5.08677 16C3.27933 16 2.26409 13.9081 3.37522 12.4891C2.75894 12.0009 2.40119 11.2825 2.34268 10.6204C1.43419 0.498541 1.47444 0.946953 1.55953 1.89506L1.56008 1.9012C1.61714 2.53699 1.6934 3.38676 1.51811 1.43385H0.716927C0.320978 1.43385 0 1.11288 0 0.716927C0 0.320978 0.320978 0 0.716927 0H2.17355C2.54465 0 2.85443 0.28322 2.88761 0.652847L3.0905 2.91311ZM4.3471 13.8264C4.3471 14.2343 4.67894 14.5661 5.08677 14.5661C5.49463 14.5661 5.82647 14.2343 5.82647 13.8264C5.82647 13.4186 5.49463 13.0868 5.08677 13.0868C4.67894 13.0868 4.3471 13.4186 4.3471 13.8264ZM13.0982 14.5661C12.6903 14.5661 12.3585 14.2343 12.3585 13.8264C12.3585 13.4186 12.6903 13.0868 13.0982 13.0868C13.506 13.0868 13.8379 13.4186 13.8379 13.8264C13.8379 14.2343 13.506 14.5661 13.0982 14.5661ZM3.67463 9.42062L14.7152 8.77181L15.8215 4.34693H3.21921L3.67463 9.42062Z" fill="white"/>
            </svg>
            ADD TO CARD
            </a>
    </div>


`; 


initializeThumbnailLinks();

const productPriceElement = document.querySelector(".productPrice");
const productDiscountElement = document.querySelector(".productDiscount");
const discountsElement = document.querySelector(".discounts");
const commentRatingUp = document.querySelector(".comment-rating-up");
const commentRatingDown = document.querySelector(".comment-rating-down");
const addToCard = document.querySelector(".addToCard");
const dialogs = document.querySelector(".dialogs")

const addBtns2 = document.querySelector("#addBtns2");
let price = urun.price; 
const counters = localStorage.getItem('productCounter');
const prices = localStorage.getItem('productPrice');

productDiscountElement.textContent = `% ${urun.discountPercentage}`;
discountsElement.textContent = "1098";

commentRatingUp.addEventListener('click', function(e) {
    e.preventDefault();
    counter++;
    price *= 2; 
    localStorage.setItem('productCounter', counter);
    localStorage.setItem('productPrice', price);
    
    productPriceElement.textContent = `$ ${price.toFixed(2)}`; 
    addBtns2.textContent = counter;
    updateDialogsContent();
});

commentRatingDown.addEventListener('click', function(e) {
    e.preventDefault();
    if (counter > 0) {
        counter--;
        price /= 2; 
        localStorage.setItem('productCounter', counter);
        localStorage.setItem('productPrice', price);
        
        productPriceElement.textContent = `$ ${price.toFixed(2)}`; 
        addBtns2.textContent = counter;
        updateDialogsContent();
    }
});


addToCard.addEventListener('click',function(e){
    e.preventDefault();
    dialogs.style.display = "block"
})

function updateDialogsContent() {
    const storedCounter = localStorage.getItem('productCounter');
    const storedPrice = localStorage.getItem('productPrice');

    dialogs.innerHTML = `
    <div class="dialogCont">
    <div class="dialog img">
        <img src="${urun.thumbnail}" alt="Product Image">
    </div>
    <div class="dialog-text">
            <p class="dialogProduct">Ürün Sayısı: <strong>${storedCounter}</strong></p>
            <p class="dialogProduct">Ürün Fiyatı: <strong>$${storedPrice}</strong></p>
    </div>
    </div>
    <a href="payment.html" class="paymentButton">Ödeme Yap</a>
    `;
}

updateDialogsContent();
function initializeThumbnailLinks() {
    const links = document.querySelectorAll('.thumbnail-img .thumb-link');

    links.forEach(link => {
    link.addEventListener('click', function (e) {
    e.preventDefault();

    const newSrc = this.querySelector('img').getAttribute('src');
    document.querySelector('.homeImg img').src = newSrc;

    links.forEach(lnk => {
        lnk.style.opacity = "0.5";
    });

    this.style.opacity = "1";

    links.forEach(lnk => {
        lnk.style.border = "none";
    });
    this.style.border = "4px solid #FF7E1B";
    this.style.borderRadius = "10px";
    });
    });
}

} else {
    document.getElementById('urunDetay').innerHTML = '<p>Ürün detayı bulunamadı.</p>';
}

    const addBtns = document.querySelector(".addBtns").innerHTML = `${counter}`


