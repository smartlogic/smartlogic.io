---
---

ready = ->

  $(document).on('click touchend', '#our-team li', ( ->
    $('#our-team li').removeClass('active')
    $(this).toggleClass('active')
    return false
  ))

  $(document).on('click touchend', '#our-team li div', ( ->
    $('#our-team li').removeClass('active')
    return false
  ))

$(document).ready(ready)
