---
---

ready = ->

  $(document).on('click touchend', '#our-team li.has-bio', ( ->
    $('#our-team li').removeClass('active')
    $(this).toggleClass('active')
    return false
  ))

  $(document).on('click touchend', '#our-team li.has-bio div', ( ->
    $('#our-team li').removeClass('active')
    return false
  ))

$(document).ready(ready)

window.document.onkeydown = (e) ->
  e = event unless e
  $('#our-team li').removeClass('active') if e.keyCode is 27
  return

