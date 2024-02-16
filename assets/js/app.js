  let currentPage = 1;
    const limitPerPage = 20; // Sayfa başına gösterilecek ürün sayısı
    let totalProducts = []; // API'den çekilen tüm ürünler bu dizide saklanacak

    // Ürünleri API'den çekme
    function fetchProducts() {
      fetch(`https://dummyjson.com/products?skip=${(currentPage - 1) * limitPerPage}&limit=${limitPerPage}`)
        .then(res => res.json())
        .then(data => {
          totalProducts = data.products;
          displayProducts(totalProducts);
        });
    }

    // Seçili sayfadaki ürünleri göster
    function displayProducts(products) {
      const productList = document.querySelector('#product-list');
      productList.innerHTML = ''; // Listeyi temizle

      for (const product of products) {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.setAttribute('data-product-id', product.id);

        productElement.innerHTML = `
    <div class="product-info">
      <img src="${product.thumbnail}" alt="${product.title}">
      <div>
        <h2 class="prodTitle">${product.title}</h2>
        <p class="prodText">${product.description}</p>
        <p class="prodText">Price: $${product.price} - Discount: ${product.discountPercentage}%</p>
        <p class="prodText">Rating: ${product.rating} - Stock: ${product.stock}</p>
        <p class="prodText">Brand: ${product.brand} - Category: ${product.category}</p>
      </div>
    </div>
  `;
        productElement.addEventListener('click', () => {
          localStorage.setItem(`${product.id}`, JSON.stringify(product))
          window.location.href = `products.html?id=${product.id}`
        });
        productList.appendChild(productElement);
      }
    }


    // Sayfa değiştirme fonksiyonları
    function nextPage() {
      currentPage++;
      fetchProducts();
    }

    function previousPage() {
      currentPage--;
      fetchProducts();
    }
    fetchProducts();

    // Sayfalama tuşlarını etkinleştirdim
    document.getElementById('nextPage').addEventListener('click', nextPage);
    document.getElementById('previousPage').addEventListener('click', previousPage);

    // İlk sayfayı göstermek için ürünleri çektim

