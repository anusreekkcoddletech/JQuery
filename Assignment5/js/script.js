$(document).ready(function () {
    let data = []
    let cart = {}
    let $message = $("#noResultsMessage")
    let $totalprice = $("#totalprice")
    let filteredData = []

    $message.hide()
    $totalprice.text("Total Amount: $ 0")

    function displayProducts(products) {
        let productList = $("#products")
        productList.empty()
    
        if (products.length === 0) {
            productList.append("<p>No products found in this category.</p>")
        } else 
        {
            for (let i = 0; i < products.length; i++) {
                let product = products[i]
                let listItem ="<li class='productelement'>" +
                    "<img src='" + product.thumbnail + "'><br>" +
                    "<b>" + product.title + "</b><br>" +
                    product.description + "<br>" +
                    "<b>Ratings: </b>" + product.rating + "<br>" +
                    "<b>Stock: </b>" + product.stock + "<br>" +
                    "<b>Actual Price: $</b>" + product.price + "<br>" +
                    "<b>Discount Percentage: </b>" + product.discountPercentage + "% <br>"
    
                let discount = (product.discountPercentage / 100) * product.price
                let offerprice = product.price - discount
                listItem += "<b>Discount Offer: $</b>" + offerprice + "<br>" +
                    "<button class='cart_btn' data-index='" + i + "'>Add to Cart</button></li>"
    
                productList.append(listItem)
            }
        }
    }
    let $products = $(".productelement")
    $.ajax({
        url: 'https://dummyjson.com/products',
        type: 'get',
        dataType: 'json',
        success: function (result) {
            console.log(result)
            data = result.products
            displayProducts(data)

            $("#products").on("click", ".cart_btn", function () {
                $("#productcart").show()
                let index = $(this).data("index")
                addtoCart(data[index])
            })
        },
    })

    $("#selectcategory").change(function selectCategory() {
        let selectedCategory = $(this).val().toLowerCase()
    
        console.log("Selected category:", selectedCategory)
    
        if (selectedCategory === "all") {
            filteredData = []
            displayProducts(data)
        } else {
            filteredData = data.filter(function (item) {
                let productCategory = item.category.toLowerCase()
                return productCategory === selectedCategory
            })
            console.log("Filtered data:", filteredData)
            displayProducts(filteredData)
        }
    });
    
    function addtoCart(product) {
        $("#productcart").show()
        const productName = product.title

        if (cart[productName]) {
            cart[productName].quantity++
        } else {
            cart[productName] = {
                product: product,
                quantity: 1,
            }
        }
        let discount = (product.discountPercentage / 100) * product.price
        cart[productName].offerPrice = product.price - discount

        updateCart()
    }
    $("#closeicon").click(function () {
        $("#productcart").hide()
    })
    $("#carticon").click(function () {
        $("#productcart").toggle()
    })
    $("#searchInput").on("keyup", function () {
        let searchitem = $(this).val().toLowerCase().trim()
        $products = $(".productelement")

        $products.each(function () {
            $message.hide()
            let productText = $(this).text().toLowerCase()

            if (productText.includes(searchitem)) {
                $(this).show()
            } else {
                $(this).hide()
                $message.show()
            }
        })
    });
    function updateCart() {
        $("#cart").empty()
        let totalCartPrice = 0
        for (let productName in cart) {
            let item = cart[productName]
            if (item) {
                let actualprice = (item.offerPrice * item.quantity)
                totalCartPrice += actualprice
                let $cartItem = $("<li>").html(
                    "Product: " + productName + "<br>Quantity: " + item.quantity +
                    "<br>Offer Price: $" + item.offerPrice +
                    "<br>Total Price: $" + actualprice +
                    "<br><button class='incrementBtn' data-productname='" + productName + "'>Increment</button>" +
                    "<button class='decrementBtn' data-productname='" + productName + "'>Decrement</button><br><br>"
                )
                $cartItem.find('.incrementBtn').click(function () {
                    let productName = $(this).data("productname")
                    cart[productName].quantity++
                    updateCart()
                })
                $cartItem.find('.decrementBtn').click(function () {
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
        $totalprice.text("Total Amount: $" + totalCartPrice.toFixed(2))
    }
    $("#sortDropdown").change(function  sortdropdown() {
        let selectedOption = $(this).val()
        if (selectedOption === "priceLowToHigh") {
            data.sort(function (a, b) {
                return a.price - b.price
            })
        } else if (selectedOption === "priceHighToLow") {
            data.sort(function (a, b) {
                return b.price - a.price
            })
        } else if (selectedOption === "rating") {
            data.sort(function (a, b) {
                return b.rating - a.rating
            })
        }
        displayProducts(data)
    })
})
