---
---

ready = ->
  
  $(document).on('click touchend', '.mobile-navigation-toggle', ( ->
    $(this).toggleClass('active')
  ))

$(document).ready(ready)
