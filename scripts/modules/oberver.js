const menu = document.querySelector('.menu')
const sections = document.querySelectorAll("section")
const navLi = document.querySelectorAll("nav ul.navigation li")
const ctNav = document.querySelector("ul.contentnav")

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLi.forEach(li => {
                li.classList.remove("selected");
                if (li.classList.contains(e.target.id)) {
                    li.classList.add("selected");
                }
            })
            // toggle menu if visible
            e.target.id === 'solutions' ? menu.classList.add('active') : menu.classList.remove('active')
            e.target.id === 'company' ? ctNav.classList.add('active') : ctNav.classList.remove('active')
        }
    })
}, {
    threshold: 0.5
})

sections.forEach((section) => {
    sectionObserver.observe(section)
});
