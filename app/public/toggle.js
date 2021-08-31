$('.description').hide()

$('.toggle-show').on('click', ()=>{
  $('.description').show("slide", { direction: "right" }, 500)
})

$('.toggle-hide').on('click', ()=>{
  $('.description').hide("slide", { direction: "right" }, 500)
})