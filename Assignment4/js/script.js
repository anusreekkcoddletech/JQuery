$(document).ready(function () {
    var $products = $(".product")
    var $message = $("#noResultsMessage")
    var $totalprice = $("#totalprice")
    var totalcartprice = 0

    $message.hide()
    $totalprice.text("Total Amount: ₹0")

        $("#searchInput").on("keyup", function () {
        var value = $(this).val().toLowerCase()
        $products.each(function () {
            var productText = $(this).find("h3").text()
            if (productText.toLowerCase().indexOf(value) > -1) {
                $(this).show()
            } else {
                $(this).hide()
            }
        })
        var visibleProducts = $products.filter(":visible").length
        if (visibleProducts === 0) {
            $message.show()
        } else {
            $message.hide()
        }
    })
    $("#closeicon").click(function () {
        $("#productcart").hide()
    })
    $("#carticon").click(function () {
        $("#productcart").show()
    })
    var cart = {}
    function updateCart(productname, price) {
        if (cart[productname]) {
            cart[productname].quantity++
        } else {
            cart[productname] = { price: price, quantity: 1 }
        }
        displayCart()
        
    }
    function displayCart() {
        var $cartList = $("#cartlist")
        $cartList.empty()
        totalcartprice = 0

        for (var productname in cart) {
            var item = cart[productname]
            if (item) {
                var $cartItem = $("<li>").css({ "list-style-type": "decimal" })
                $cartItem.html("Product : " + productname + "<br>" + "Quantity : " + item.quantity + "<br>" + "Price : &#8377;" + item.price * item.quantity + "<br>" )

                totalcartprice += item.price * item.quantity
                var $incrementButton = $("<button> Add one more item</button>").css({ "width": "150px", "height": "30px", })
                var $decrementButton = $("<button>Remove one item</button>" + "<br>" + "<br>").css({ "width": "150px", "height": "30px", })

                $incrementButton.click(function (productName) {
                    return function () {
                        cart[productName].quantity++
                        displayCart()
                    }
                }(productname))

                $decrementButton.click(function (productName) {
                    return function () {
                        if (cart[productName].quantity > 1) {
                            cart[productName].quantity--
                        } else {
                            delete cart[productName]
                        }
                        displayCart()
                    }
                }(productname))

                $cartItem.append($incrementButton, $decrementButton)
                $cartList.append($cartItem)
            }
        }
        $totalprice.text("Total Price: Rs." + totalcartprice)
        
    }
    $("#cartbtn1").click(function () {
        $("#productcart").show()
        var $product = $("#product1")
        var productname = $product.find('h3').text()
        var price = parseInt($product.find('p').text().replace(/[^\d]/g, ''))

        updateCart(productname, price)
    })
    $("#cartbtn2").click(function () {
        $("#productcart").show()
        var $product = $("#product2")
        var productname = $product.find('h3').text()
        var price = parseInt($product.find('p').text().replace(/[^\d]/g, ''))

        updateCart(productname, price)
    })
    $("#cartbtn3").click(function () {
        $("#productcart").show()
        var $product = $("#product3")
        var productname = $product.find('h3').text()
        var price = parseInt($product.find('p').text().replace(/[^\d]/g, ''))

        updateCart(productname, price)
    })
    $("#cartbtn4").click(function () {
        $("#productcart").show()
        var $product = $("#product4")
        var productname = $product.find('h3').text()
        var price = parseInt($product.find('p').text().replace(/[^\d]/g, ''))

        updateCart(productname, price)
    })
    $("#cartbtn5").click(function () {
        $("#productcart").show()
        var $product = $("#product5")
        var productname = $product.find('h3').text()
        var price = parseInt($product.find('p').text().replace(/[^\d]/g, ''))

        updateCart(productname, price)
    })
    $("#cartbtn6").click(function () {
        $("#productcart").show()
        var $product = $("#product6")
        var productname = $product.find('h3').text()
        var price = parseInt($product.find('p').text().replace(/[^\d]/g, ''))

        updateCart(productname, price)
    })
    $("#cartbtn7").click(function () {
        $("#productcart").show()
        var $product = $("#product7")
        var productname = $product.find('h3').text()
        var price = parseInt($product.find('p').text().replace(/[^\d]/g, ''))

        updateCart(productname, price)
    })
    $("#cartbtn8").click(function () {
        $("#productcart").show()
        var $product = $("#product8")
        var productname = $product.find('h3').text()
        var price = parseInt($product.find('p').text().replace(/[^\d]/g, ''))

        updateCart(productname, price)
    })
})


