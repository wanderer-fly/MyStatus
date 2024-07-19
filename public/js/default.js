// Only global script here...

// Disable Contextmenu
document.addEventListener('contextmenu', (event) => {
    event.preventDefault()
})

// Simulate loading completion
setTimeout(function() {
    document.getElementById('loadingMask').classList.remove('show')
}, 500)
// Avatar View
fetch('/avatar')
    .then(response => response.json())
    .then(data => {
        document.getElementById('avatarName').textContent = data.name
        document.getElementById('avatarImg').src = data.avatarImg
        document.getElementById('avatarBio').textContent = data.bio
        const linksDiv = document.getElementById('avatarLinks')
        for (const [site, url] of Object.entries(data.links)) {
            const linkElem = document.createElement('a')
            linkElem.href = url
            linkElem.textContent = site
            linkElem.target = '_blank' // New Tab
            linksDiv.appendChild(linkElem)
            linksDiv.appendChild(document.createElement('br'))
        }
    })
    .catch(error => console.error('Error fetching avatar data:', error))