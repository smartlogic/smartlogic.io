---
---

$ ->
  commonFullPageOptions =
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
    menu: '.secondary-navigation'
    scrollOverflow: true

  aboutPageOptions =
    anchors: ['landing', 'four-keys', 'who-we-work-with', 'the-team']

  experiencePageOptions =
    anchors: ['landing', 'case-studies', 'areas-of-expertise', 'lets-work-together']

  smartThinkingPageOptions =
    anchors: ['landing', 'community']

  getInTouchPageOptions =
    anchors: ['landing', 'work-with-us', 'our-office', 'location']

  whatMakesUsDifferentPageOptions =
    anchors: ['landing']

  # initiate full page sliding
  $('#home').fullpage(commonFullPageOptions) if $('#home').length
  $('#about').fullpage($.extend(commonFullPageOptions, aboutPageOptions)) if $('#about').length
  $('#experience').fullpage($.extend(commonFullPageOptions, experiencePageOptions)) if $('#experience').length
  $('#smart-thinking').fullpage($.extend(commonFullPageOptions, smartThinkingPageOptions)) if $('#smart-thinking').length
  $('#get-in-touch').fullpage($.extend(commonFullPageOptions, getInTouchPageOptions)) if $('#get-in-touch').length
  $('#what-makes-us-different').fullpage($.extend(commonFullPageOptions, whatMakesUsDifferentPageOptions)) if $('#what-makes-us-different').length

  if $('.secondary-navigation').children().length
    $('.sidebar').addClass('slided-out', 1000, 'easeOutCubic')
