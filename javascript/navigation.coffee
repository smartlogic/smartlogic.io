---
---

ready = ->
  
  $(document).on('click touchend', '.mobile-navigation-toggle, .mobile-backdrop', ( ->
    $('.mobile-navigation-toggle').toggleClass('active')
    return false
  ))

$(document).ready(ready)
