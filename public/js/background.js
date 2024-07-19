const backgroundSrc = ""

const imageElements = document.querySelectorAll('#wallpaper-imgs img')

const imageArray = Array.from(imageElements)

imageElements.forEach(img => {
    img.addEventListener('click', function() {
        document.body.style.backgroundImage = `url(${img.src})`
    })
    console.log(img.src)
})

// Log each image's src attribute
// imageArray.forEach(img => {
//     console.log(img.src)
// })