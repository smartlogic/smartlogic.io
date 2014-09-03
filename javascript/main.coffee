---
---

$ ->
  # TODO: revisit this later
  $('.sidebar a').click ->
    $('.primary-navigation').toggleClass('active', 1000, 'easeOutCubic')
    $('.primary-navigation > *').delay(250).toggleClass('active', 750, 'easeOutCubic')

  # initiate full page sliding
  $('.sliding-page').fullpage
    verticalCentered: true
    resize : true
    scrollingSpeed: 700
    easing: 'easeInQuart'
    loopTop: false
    loopBottom: true
    loopHorizontal: true
    sectionSelector: '.section'
    slideSelector: '.slide'
    css3: true
    autoScrolling: true
    paddingTop: '50px'
    paddingBottom: '0'
    menu: true
    scrollOverflow: true
