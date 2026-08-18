document.addEventListener("DOMContentLoaded", function () {

    let cart = [];
    let favorites = 0;

    /* ==============================
       HEADER SƏBƏT RƏQƏMİ
    ============================== */

    const cartButton = document.querySelector(
        ".header-tools .icon-button:nth-child(2)"
    );

    const cartBadge = cartButton
        ? cartButton.querySelector("span")
        : null;


    function updateCartBadge() {

        if (cartBadge) {
            cartBadge.textContent = cart.length;
        }

    }


    /* ==============================
       SƏBƏT PƏNCƏRƏSİ
    ============================== */

    function openCart() {

        let modal = document.getElementById("myCartModal");

        if (!modal) {

            modal = document.createElement("div");

            modal.id = "myCartModal";

            modal.style.cssText = `
                position:fixed;
                inset:0;
                background:rgba(0,0,0,.55);
                z-index:99999;
                display:flex;
                align-items:center;
                justify-content:center;
                padding:20px;
            `;

            modal.innerHTML = `

                <div style="
                    width:100%;
                    max-width:600px;
                    max-height:85vh;
                    overflow:auto;
                    background:white;
                    border-radius:25px;
                    padding:30px;
                    position:relative;
                    box-shadow:0 25px 80px rgba(0,0,0,.25);
                ">

                    <button
                        id="myCartClose"
                        style="
                            position:absolute;
                            right:20px;
                            top:15px;
                            border:0;
                            background:none;
                            font-size:32px;
                            cursor:pointer;
                        "
                    >
                        ×
                    </button>

                    <h2 style="
                        margin:0 0 5px;
                        font-size:28px;
                    ">
                        🛒 Səbətim
                    </h2>

                    <p id="myCartCount">
                        0 məhsul
                    </p>

                    <div id="myCartProducts"></div>

                    <div id="myCartTotal" style="
                        margin-top:20px;
                        padding-top:20px;
                        border-top:1px solid #eee;
                        font-size:22px;
                        font-weight:bold;
                    ">
                        Ümumi: 0 ₼
                    </div>

                </div>
            `;

            document.body.appendChild(modal);


            document.getElementById(
                "myCartClose"
            ).addEventListener(
                "click",
                function () {

                    modal.remove();

                }
            );

        }

        renderCart();

    }


    /* ==============================
       SƏBƏTİ GÖSTƏR
    ============================== */

    function renderCart() {

        const products =
            document.getElementById(
                "myCartProducts"
            );

        const count =
            document.getElementById(
                "myCartCount"
            );

        const totalElement =
            document.getElementById(
                "myCartTotal"
            );


        if (!products) {
            return;
        }


        products.innerHTML = "";


        if (cart.length === 0) {

            products.innerHTML = `

                <div style="
                    text-align:center;
                    padding:50px 10px;
                    font-size:18px;
                ">

                    <div style="
                        font-size:55px;
                        margin-bottom:15px;
                    ">
                        🛒
                    </div>

                    <strong>
                        Səbətiniz boşdur
                    </strong>

                    <p>
                        Məhsulu səbətə əlavə edin.
                    </p>

                </div>

            `;

            count.textContent = "0 məhsul";
            totalElement.textContent = "Ümumi: 0 ₼";

            return;
        }


        let total = 0;


        cart.forEach(function (product, index) {

            const price =
                Number(
                    String(product.price)
                        .replace(",", ".")
                        .replace(/[^\d.]/g, "")
                ) || 0;


            total += price;


            const item =
                document.createElement("div");


            item.style.cssText = `
                display:flex;
                align-items:center;
                gap:15px;
                padding:15px 0;
                border-bottom:1px solid #eee;
            `;


            item.innerHTML = `

                <div style="
                    width:70px;
                    height:70px;
                    border-radius:15px;
                    background:#f4f1ff;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:35px;
                    overflow:hidden;
                    flex-shrink:0;
                ">

                    ${
                        product.image
                        ? `<img
                            src="${product.image}"
                            style="
                                width:100%;
                                height:100%;
                                object-fit:cover;
                            "
                          >`
                        : "🛍️"
                    }

                </div>


                <div style="flex:1;">

                    <small style="color:#777;">
                        ${product.category}
                    </small>

                    <div style="
                        font-weight:bold;
                        margin:5px 0;
                    ">
                        ${product.name}
                    </div>

                    <strong>
                        ${product.price} ₼
                    </strong>

                </div>


                <button
                    data-remove="${index}"
                    style="
                        border:0;
                        background:#ffe8ed;
                        color:#e6395f;
                        width:35px;
                        height:35px;
                        border-radius:50%;
                        cursor:pointer;
                        font-size:20px;
                    "
                >
                    ×
                </button>

            `;


            products.appendChild(item);

        });


        count.textContent =
            `${cart.length} məhsul`;


        totalElement.textContent =
            `Ümumi: ${total.toFixed(0)} ₼`;


        /* SİLMƏ */

        products
            .querySelectorAll("[data-remove]")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                button.dataset.remove
                            );


                        cart.splice(index, 1);

                        updateCartBadge();

                        renderCart();

                    }
                );

            });

    }


    /* ==============================
       ƏSAS SƏBƏT FUNKSİYASI
    ============================== */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".cart-button"
                );


            if (!button) {
                return;
            }


            const product =
                button.closest(".product");


            if (!product) {
                return;
            }


            const nameElement =
                product.querySelector("h3");


            const priceElement =
                product.querySelector(
                    ".product-price strong"
                );


            const categoryElement =
                product.querySelector(
                    ".product-category"
                );


            const imageElement =
                product.querySelector(
                    ".product-image img"
                );


            const imageBox =
                product.querySelector(
                    ".product-image"
                );


            const productData = {

                name:
                    nameElement
                    ? nameElement.textContent.trim()
                    : "Məhsul",

                price:
                    priceElement
                    ? priceElement.textContent.trim()
                    : "0",

                category:
                    categoryElement
                    ? categoryElement.textContent.trim()
                    : "MƏHSUL",

                image:
                    imageElement
                    ? imageElement.src
                    : ""

            };


            cart.push(productData);


            updateCartBadge();


            /* DÜYMƏNİN YAZISINI DƏYİŞ */

            const oldText =
                button.innerHTML;


            button.innerHTML =
                "✓ Səbətə əlavə edildi";


            setTimeout(function () {

                button.innerHTML =
                    oldText;

            }, 1200);

        }
    );


    /* ==============================
       HEADER SƏBƏT
    ============================== */

    if (cartButton) {

        cartButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openCart();

            }
        );

    }


    /* ==============================
       FAVORİ
    ============================== */

    document.addEventListener(
        "click",
        function (event) {

            const heart =
                event.target.closest(
                    ".heart-button"
                );


            if (!heart) {
                return;
            }


            if (
                heart.classList.contains(
                    "liked"
                )
            ) {

                heart.classList.remove(
                    "liked"
                );

                heart.innerHTML = "♡";

                favorites--;

            } else {

                heart.classList.add(
                    "liked"
                );

                heart.innerHTML = "♥";

                favorites++;

            }

            const favoriteButton =
                document.querySelector(
                    ".header-tools .icon-button:nth-child(1)"
                );


            const badge =
                favoriteButton
                ? favoriteButton.querySelector("span")
                : null;


            if (badge) {
                badge.textContent = favorites;
            }

        }
    );


    /* ==============================
       AXTARIŞ
    ============================== */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            function () {

                const text =
                    searchInput.value
                        .trim()
                        .toLowerCase();


                const products =
                    document.querySelectorAll(
                        ".product"
                    );


                products.forEach(
                    function (product) {

                        const content =
                            product.textContent
                                .toLowerCase();


                        product.style.display =
                            !text ||
                            content.includes(text)
                            ? ""
                            : "none";

                    }
                );

            }
        );

    }


    /* ==============================
       ENTER İLƏ AXTARIŞ
    ============================== */

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    searchButton.click();

                }

            }
        );

    }


    /* ==============================
       BAŞLANĞIC
    ============================== */

    updateCartBadge();

    console.log(
        "ALVERAZ: Səbət sistemi aktivdir."
    );

});/* ==============================
   PREMIUM
============================== */

const premiumButton =
    document.querySelector(".premium-copy button");

if (premiumButton) {

    premiumButton.addEventListener(
        "click",
        function () {

            const productsSection =
                document.querySelector(".flash-section");

            if (productsSection) {

                productsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

            const oldText =
                premiumButton.innerHTML;

            premiumButton.innerHTML =
                "✓ Premium məhsullar açıldı";

            setTimeout(function () {

                premiumButton.innerHTML =
                    oldText;

            }, 1800);

        }
    );

}