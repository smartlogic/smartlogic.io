---
---

ready = ->
  
  $(document).on('click touchend', '.mobile-navigation-toggle, .mobile-backdrop', ( ->
    $('.mobile-navigation-toggle, .navigation-menu, .mobile-backdrop').toggleClass('active')
    return false
  ))

$(document).ready(ready)
