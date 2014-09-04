---
---

$ ->
  # TODO: revisit this later
  $('.sidebar a').click ->
    $('.primary-navigation').toggleClass('active', 1000, 'easeOutCubic')
    $('.primary-navigation > *').delay(250).toggleClass('active', 750, 'easeOutCubic')

  $('.lets-work-together select').change ->
    $('form .expanded-form').removeClass('expanded-form')

  # content section slider

  sliderSpeed = 1000

  $('.slider-control').click ->
    if $('.current-slide').next('.slide').length
      $('.current-slide').addClass('previous-slide', sliderSpeed, 'easeOutCubic').removeClass('current-slide').next('.slide').addClass('current-slide', sliderSpeed, 'easeOutCubic')
    else
      $('.current-slide').addClass('previous-slide', sliderSpeed, 'easeOutCubic').removeClass('current-slide')
      $('.slide:first-child').addClass('current-slide', sliderSpeed, 'easeOutCubic')

    $('.slide').removeClass('previous-slide')

  if $('.slide').length is 1
    $('.slider-control').hide()
