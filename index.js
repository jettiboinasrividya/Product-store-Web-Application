const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const category = document.getElementById("category");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupDesc = document.getElementById("popup-desc");
const popupPrice = document.getElementById("popup-price");
const closeBtn = document.querySelector(".close");
let allProducts = [];
fetch("https://dummyjson.com/products/")
    .then(response => response.json())
    .then(data => {
        allProducts = data.products;
        displayProducts(allProducts);
    })
    .catch(() => {
        productsContainer.innerHTML = "<h2 style='color:white'>Failed to Load Products</h2>";
    });
function displayProducts(products){
    productsContainer.innerHTML="";
    if(products.length===0){
        productsContainer.innerHTML="<h2 style='color:white'>No Products Found</h2>";
        return;
    }
    products.forEach(product=>{
        const card=document.createElement("div");
        card.classList.add("card");
        card.innerHTML=`
            <img src="${product.thumbnail}" alt="${product.title}">
            <div class="card-content">
                <h3>${product.title}</h3>
                <p>${product.description.substring(0,60)}...</p>
                <div class="price">$${product.price}</div>
            </div>
        `;
        card.addEventListener("click",()=>{
            popupImg.src=product.thumbnail;
            popupTitle.textContent=product.title;
            popupDesc.textContent=product.description;
            popupPrice.textContent="$"+product.price;
            popup.style.display="flex";
        });
        productsContainer.appendChild(card);
    });
}
searchInput.addEventListener("input",()=>{
    const text=searchInput.value.toLowerCase().trim();
    const filtered=allProducts.filter(product=>
        product.title.toLowerCase().includes(text)
    );
    displayProducts(filtered);
});
closeBtn.onclick=()=>{
    popup.style.display="none";
};
window.onclick=(e)=>{
    if(e.target===popup){
        popup.style.display="none";
    }
};
category.addEventListener("change", () => {

    if(category.value === "all"){

        fetch("https://dummyjson.com/products")
        .then(res => res.json())
        .then(data => {
            allProducts = data.products;
            displayProducts(allProducts);
        });

    }else{

        fetch(`https://dummyjson.com/products/category/${category.value}`)
        .then(res => res.json())
        .then(data => {
            allProducts = data.products;
            displayProducts(allProducts);
        });

    }

});