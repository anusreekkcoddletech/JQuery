$(document).ready(function () {
    let data = []
    let cart = {}
    let $message = $("#noResultsMessage")
    let $totalprice = $("#totalprice")
    let displayedProducts = []

    $message.hide()
    $totalprice.text("Total Amount: $ 0")

    function displayProducts(products) {
        let productList = $("#products")
        productList.empty()

        if (products.length === 0) {
            $message.show()
        } else {
            $message.hide()
        }
        displayedProducts = products

        for (let i = 0; i < products.length; i++) {
            let product = products[i]
            let listItem = "<li class='productelement'>" +
                "<img src='" + product.thumbnail + "'><br>" +
                "<b>" + product.title + "</b><br>" +
                product.description + "<br>" +
                "<b>Ratings: </b>" + product.rating + "<br>" +
                "<b>Stock: </b>" + product.stock + "<br>" +
                "<b>Actual Price: $</b>" + product.price + "<br>" +
                "<b>Discount Percentage: </b>" + product.discountPercentage + "% <br>"

            let discount = (product.discountPercentage / 100) * product.price
            let offerprice = product.price - discount
            listItem += "<b>Discount Offer: $</b>" + offerprice.toFixed(2) + "<br>" +
                "<button class='cart_btn' data-index='" + i + "'>Add to Cart</button></li>"

            productList.append(listItem)
        }
    }
    let $products = $(".productelement")
    $.ajax({
        url: 'https://dummyjson.com/products',
        type: 'get',
        dataType: 'json',
        success: function (result) {
            data = result.products
            displayProducts(data)

            $("#products").on("click", ".cart_btn", function () {
                $("#productcart").show()
                let index = $(this).data("index")
                addtoCart(displayedProducts[index])
            })
        },
    })
    $("#selectcategory").change(function () {
        filterProducts()
    })
    $("#searchInput").on("keyup", function () {
        filterProducts()
    })
    $("#sortDropdown").change(function () {
            let selectedOption = $("#sortDropdown").val()
            let itemsToSort = displayedProducts.slice()
    
            if (selectedOption === "priceLowToHigh") {
                itemsToSort.sort(function (a, b) {
                    return a.price - b.price
                })
            } else if (selectedOption === "priceHighToLow") {
                itemsToSort.sort(function (a, b) {
                    return b.price - a.price
                })
            } else if (selectedOption === "rating") {
                itemsToSort.sort(function (a, b) {
                    return b.rating - a.rating
                })
            }
    
            displayProducts(itemsToSort)
    })

    function addtoCart(product) {
        $("#productcart").show()
        const productName = product.title

        if (cart[productName]) {
            cart[productName].quantity++
        } else {
            cart[productName] = {
                product: product,
                quantity: 1,
            };
        }
        let discount = (product.discountPercentage / 100) * product.price
        cart[productName].offerPrice = product.price - discount
        updateCart()
    }

    $("#closeicon").click(function () {
        $("#productcart").hide()
    });

    $("#carticon").click(function () {
        $("#productcart").toggle()
    });

    function filterProducts() {
        let selectedCategory = $("#selectcategory").val().toLowerCase()
        let searchItem = $("#searchInput").val().toLowerCase().trim()
        let filteredData = data;

        if (selectedCategory !== "all") {
            filteredData = data.filter(function (product) {
                return product.category.toLowerCase() === selectedCategory
            })
        }
        if (searchItem !== "") {
            filteredData = filteredData.filter(function (product)
             {
                const productTitle = product.title.toLowerCase();
                const productDescription = product.description.toLowerCase();
                return productTitle.includes(searchItem) || productDescription.includes(searchItem);
            });
        }

        displayProducts(filteredData)
    }
    function updateCart() {
        $("#cart").empty()
        let totalCartPrice = 0
        for (let productName in cart) {
            let item = cart[productName]
            if (item) {
                let actualprice = item.offerPrice * item.quantity
                totalCartPrice += actualprice
                let $cartItem = $("<li>").html(
                    "Product: " + productName + "<br>Quantity: " + item.quantity +
                    "<br>Offer Price: $" + item.offerPrice.toFixed(2) +
                    "<br>Total Price: $" + actualprice.toFixed(2) +
                    "<br><button class='incrementBtn' data-productname='" + productName + "'>Increment</button>" +
                    "<button class='decrementBtn' data-productname='" + productName + "'>Decrement</button><br><br>"
                )

                $cartItem.find(".incrementBtn").click(function () {
                    let productName = $(this).data("productname")
                    cart[productName].quantity++
                    updateCart()
                })
                $cartItem.find(".decrementBtn").click(function () {
                    let productName = $(this).data("productname")
                    if (cart[productName].quantity > 1) {
                        cart[productName].quantity--
                    } else {
                        delete cart[productName]
                    }
                    updateCart()
                })
                $("#cart").append($cartItem)
            }
        }
        $totalprice.text("Total Amount: $ " + totalCartPrice.toFixed(2))
    }
})
