const cardOn = document.querySelector(".cardOn")
cardOn.innerHTML += 
`
<div class="cardUser">
    <div class="userCard">
        <img src="assets/img/Oval.png">
        <p class="cardsName"></p>
    </div>
    <div class="cardNumber">
       <p class="cardsNumber"></p>
    </div>
</div>
`

document.addEventListener('DOMContentLoaded', function() {

    const paymentInfo = document.getElementById('paymentInfo'); 

    const storedCounter = localStorage.getItem('productCounter');
    const storedPrice = localStorage.getItem('productPrice');

    if(storedCounter && storedPrice) {
        paymentInfo.innerHTML = `
            <p>Ürün Sayısı: <strong>${storedCounter}</strong></p>
            <p>Ürün Fiyatı: <strong>$${parseFloat(storedPrice).toFixed(2)}</strong></p>
        `;
    } else {
        paymentInfo.innerHTML = "<p>Ürün bilgileri bulunamadı.</p>";
    }

    const inputNumber = document.getElementById('inputNumber');
    const cardsNumberParagraph = document.querySelector('.cardsNumber');
    const cardsName = document.querySelector(".cardsName")

    inputNumber.addEventListener('input', function() {
        cardsNumberParagraph.textContent = inputNumber.value;
    });
});
