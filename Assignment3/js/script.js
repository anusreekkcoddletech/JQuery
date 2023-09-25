var count = 0
$(document).ready(function () {
    $('<button id="button1" type="button">Click here</button>').appendTo("body")

    $("#button1").click(function () {
        count++
        if (count === 1) {
            $('<p>Click again the button to see the image</p>').appendTo("body")
            $("p").show()
        }
        
        if (count == 2) {
            $('<button id="nextbutton" type="button">Next</button>').appendTo("body")
            $('<div id="maindiv"></div>').appendTo("body")

            $('<div id="imagediv1" class="imagediv"></div>').appendTo("#maindiv")
            $('<img src="images/image1.jpeg">').appendTo("#imagediv1")
            $('<div id="imagediv2" class="imagediv"></div>').appendTo("#maindiv")
            $('<img src="images/image2.jpeg">').appendTo("#imagediv2")
            $('<div id="imagediv3" class="imagediv"></div>').appendTo("#maindiv")
            $('<img src="images/image3.jpeg">').appendTo("#imagediv3")

        }
    let currentslide = 0
    function showslide(index) {
        $(".imagediv").hide()
        $(".imagediv").eq(index).show()
    }
    $("body").on("click", "#nextbutton", function () {
        currentslide++
        if (currentslide >= 3) {
            currentslide = 0
        }
        showslide(currentslide)
    })
    showslide(currentslide)
    })
})
