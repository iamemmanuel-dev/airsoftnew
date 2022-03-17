import data, { galleryData } from './assets/Data/data.js'
const portfolio_row = document.querySelector('.portfolio_row')

const goToSlide = count => {
  document
    .querySelectorAll('.imgSlide')
    .forEach(
      (slides, i) =>
        (slides.style.transform = `translateX(${100 * (i - count)}%)`)
    )
}

const activateDots = count => {
  document
    .querySelectorAll('.dots')
    .forEach(dot => dot.classList.remove('dot-active'))

  document
    .querySelector(`.dots[data-slide='${count}']`)
    .classList.add('dot-active')
}

window.addEventListener('load', () => {
  /* NAVBAR LOGIC */
  const overlay = document.querySelector('.overlay')
  document.querySelector('.bars').addEventListener('click', () => {
    console.log('clicked')
    overlay.classList.add('openOverlay')
  })

  document
    .querySelector('.overlayBtn')
    .addEventListener('click', () => overlay.classList.remove('openOverlay'))

  /* SLIDER LOGIC */
  const imgSlides = document.querySelectorAll('.imgSlide')
  let count = 0
  let max_count = imgSlides.length - 1

  const dotsContainer = document.querySelector('.dotsContainer')
  imgSlides.forEach((_, i) => {
    const html = `<div class='dots' data-slide=${i}></div>`
    dotsContainer.insertAdjacentHTML('beforeend', html)
  })

  document.querySelectorAll('.dots').forEach(dot => {
    dot.addEventListener('click', e => {
      clearInterval(interval)
      const { slide } = e.target.dataset
      goToSlide(slide)
      activateDots(slide)
    })
  })

  activateDots(0)

  const interval = setInterval(() => {
    goToSlide(count)
    activateDots(count)
    count++
    if (count > max_count) count = 0
  }, 3000)

  /* DISPLAY ABOUT LOGIC */
  document
    .querySelector('.about_btnContainer')
    .addEventListener('click', ({ target }) => {
      const id = target.dataset.id
      if (target.classList.contains('aboutBtn')) {
        document
          .querySelectorAll('.aboutBtn')
          .forEach(btn => btn.classList.remove('activeBtn'))

        document
          .querySelectorAll('.aboutArticle')
          .forEach(article => article.classList.remove('activeArticle'))

        document.querySelector('.aboutContent_btn').textContent = id

        target.classList.add('activeBtn')
        document.getElementById(id).classList.add('activeArticle')
      }
    })

  /* PORTFOLIO DISPLAY LOGIC LOGIC */

  portfolio_row.innerHTML = data
    .map((items, index) => {
      const { img, title, content } = items
      return `
         <article>
          <div class="portfolio_col1">
            <img src='${img}' alt=${title}/>
          </div>
          <div class="portfolio_col2">
            <h3 class='tertiaryHeading'>${title}</h3>
            <p>${content}</p>
            <a href='#gallerySection' class='projectsLink' data-id=${index}>see projects &DownArrow;</a>
          </div>
         </article>`
    })
    .join('')

  /* AIRSOFT PROJECTS DISPLAY LOGIC  */
  const galleryRow = document.querySelector('.galleryBox_row')
  const galleryBtns = document.querySelectorAll('.galleryBtn')
  const gallerySubject = document.querySelector('.gallerySubject')
  const Data = galleryData.filter(({ title }) => title === '3d art')

  // Set default gallery subject
  gallerySubject.textContent = Data[0].subject

  //set default galleries
  const displayGalleryColumns = data =>
    data
      .map(
        items => `<div class="galleryImgContainer">
        <img src="${items}" alt=${Data.title} />
      </div>`
      )
      .join('')

  galleryRow.innerHTML = displayGalleryColumns(Data[0].data)

  galleryBtns.forEach(btn => {
    const { id } = btn.dataset
    btn.addEventListener('click', e => {
      galleryBtns.forEach(btn => btn.classList.remove('activeGalleryBtn'))
      e.target.classList.add('activeGalleryBtn')

      const Data = galleryData.filter(({ title }) => title === id)
      gallerySubject.textContent = Data[0].subject
      galleryRow.innerHTML = displayGalleryColumns(Data[0].data)
    })
  })

  /* SECTIONS INTO VIEW LOGIC */

  const sections = document.querySelectorAll('section')

  const observer = new IntersectionObserver(
    (entries, observer) => {
      const [entry] = entries
      if (!entry.isIntersecting) return
      entry.target.classList.remove('hidden')
      observer.unobserve(entry.target)
    },
    { root: null, threshold: 0.05 }
  )

  sections.forEach(section => {
    section.classList.add('hidden')
    observer.observe(section)
  })

  //SECTIONS NAVIGATION LOGIC
  document.querySelectorAll('.navigLink').forEach(link => {
    const href = link.getAttribute('href')
    const id = href.replace('#', '')
    link.addEventListener('click', e => {
      e.preventDefault()
      if (overlay.classList.contains('openOverlay'))
        overlay.classList.remove('openOverlay')
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
    })
  })

  // TESTIMONIALS SECTION
  const testimonialCards = document.querySelectorAll('.testimonialCard')
  const goToTestimonial = testimonialCount =>
    testimonialCards.forEach(
      (slides, i) =>
        (slides.style.transform = `translateX(${
          100 * (i - testimonialCount)
        }%)`)
    )

  let testimonialCount = 0
  const testimonialMaxCount = testimonialCards.length - 1

  setInterval(() => {
    goToTestimonial(testimonialCount)
    testimonialCount++
    if (testimonialCount > testimonialMaxCount) testimonialCount = 0
  }, 3000)

  /*GET FOOTER YEAR */
  document.querySelector('.getYear').textContent = new Date().getFullYear()
})
