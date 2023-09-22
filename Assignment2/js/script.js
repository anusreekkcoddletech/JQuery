$(document).ready(function () {
    let currentslide = 0
    function showslide(index) {
        const slidersections = $(".slider section")
        const bullets = $(".bullet")
        
        slidersections.hide()
        slidersections.eq(index).show()

        bullets.removeClass("active")
        var bullet = bullets.eq(index)
        bullet.addClass("active")
    }
    function nextslide() {
        currentslide++
        if (currentslide >= 5) {
            currentslide = 0
        }
        showslide(currentslide)
    }
    setInterval(nextslide, 3000)
    showslide(currentslide)

    $(".bullet").click(function () {
        currentslide = $(this).index()
        showslide(currentslide)
    })
})
