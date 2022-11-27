/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let navList = document.getElementById('navbar__list');
let sections = document.querySelectorAll('section');

// build the nav
/*
 * function: buildNav
 * it used to iterate over the added section and 
 * append a child to for each section to the navbar
 * <li><a class="menu__link" href="#section__id">Section id</a></li>
 */
function buildNav() {
    sections.forEach(sec => {
        const parent = document.createElement('li');
        const ele = document.createElement('a');
        ele.setAttribute('class', 'menu__link');
        ele.setAttribute('href', `#${sec.id}`);
        const text = document.createTextNode(`${sec.dataset.nav}`);
        ele.appendChild(text);
        parent.appendChild(ele);
        navList.appendChild(parent);
    });
}

// Add class 'active' to section when near top of viewport
/*
 * function: dealWithActiveClass
 * is used to set (class='active') for the active section
 * if the boundaries in the top <= 160 and in the bottom >= 160
 * it will add the active class otherwise
 * it will remove the active class
 */
function dealWithActiveClass() {
    sections.forEach(
        sec => {
            let bound = sec.getBoundingClientRect();
            if (bound.top <= 160 && bound.bottom >= 160)
                addActiveClass(sec);
            else 
                removeActiveClass(sec);
        }
    )
}

function addActiveClass(sec) {
    const id = sec.getAttribute('id');
    document.querySelector(`#${id}`).classList.add('active')
}

function removeActiveClass(sec) {
    const id = sec.getAttribute('id');
    document.querySelector(`#${id}`).classList.remove('active')
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();

// Scroll to section on link click
navList.addEventListener('click', e => {
    e.preventDefault();
    // console.log(e.target)
    for (let sec of sections) {
        if (e.target.outerText === sec.attributes['data-nav'].nodeValue)
            sec.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
    }
})

// Set sections as active
document.addEventListener('scroll', dealWithActiveClass);
