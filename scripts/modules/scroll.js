const windowHeight = window.innerHeight
const menu = document.querySelector('.menu')
const toggle = document.querySelector('.toggle')
const dataitem = document.querySelectorAll('.menu > li')
const navLi = document.querySelectorAll("nav ul.navigation li")
const ct = document.querySelector(".container")

toggle.onclick = () => {
    menu.classList.toggle('active')
    if (!menu.classList.contains('active')) {
        let node = document.createElement("span")
        let textnode = document.createTextNode("press me")

        node.appendChild(textnode)
        toggle.innerHTML = 'solutions'
        toggle.appendChild(node)
    }
}

dataitem.forEach(e => {
    e.addEventListener("click", evt => {
        let item = evt.target.dataset.item

        if (!item) {
            item = evt.target.parentElement.dataset.item
        }

        toggle.innerHTML = item
    })
})

navLi.forEach((item, i) => {
    item.addEventListener('click', () => {
        ct.scrollTo({
            top: i * windowHeight,
            behavior: 'smooth'
        })
    })
})
