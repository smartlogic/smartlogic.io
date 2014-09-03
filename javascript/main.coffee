---
---

$ ->
  $('.lets-work-together select').change ->
    $('form .expanded-form').removeClass('expanded-form')

  if $('.secondary-navigation').children().length
    $('.sidebar').addClass('slided-out', 1000, 'easeOutCubic')

  if $('.nav-description').length
    $('.sidebar').addClass('showing-nav-description')
