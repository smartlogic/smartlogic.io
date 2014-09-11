---
---

$ ->
  $('.lets-work-together select').change ->
    $('form .expanded-form').removeClass('expanded-form')

  if $('#nav-description').length
    $('#sidebar').addClass('showing-nav-description')
