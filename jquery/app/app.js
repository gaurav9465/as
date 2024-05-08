/*$(function() {
  setTimeout(hideSplash, 2000);
});

function hideSplash() {
  $.mobile.changePage("#login", "fade");
}*/

$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})



