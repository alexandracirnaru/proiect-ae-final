$(document).ready(function(){
    showCategories()
    //showProducts()
})

function showCategories() {
    $.get( "/categories", function( data ) {
        var html = ''
        data.forEach(function(category) {
            html = html + '<li><a href="#" onClick="showProducts('+category.id+')">'+category.name+'</a></li>'
        })
        $('#categories').html(html)
    });
}

//todo: implement showProducts method
function showProducts(categoryId) {
    if(categoryId) {
        var url = '/categories/'+ categoryId +'/food';
    } else {
        var url = '/food'   
    }
    $.get(url, function(data) {
        var html = '';
        data.forEach(
            function(food) {
                html = html + '<div class="food">'
                  +  '<h2>'+food.name+'</h2>'
                  +  '<p>'+food.description+'</p>'
                  +  '<p>Pret: '+food.price+'</p>'
                  +  '<p>Categorie: '+food.category_id+'</p>'
                  +  '<p>'+food.image+'</p>'
                  + '</div>';
                 
                
                
                
            }
        )
        $('#content').html(html);
    })
}


$(document).ready(function(){
   showSlides();
    //showProducts()
})
var slideIndex = 0;


function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

$(document).ready(function(){
   myFunction();
    //showProducts()
})

function myFunction() {
  // Get the checkbox
        var checkBox = document.getElementById("myCheck");
  // Get the output text
         var isMenuOfTheDay = document.getElementById("isMenuOfTheDay");

  // If the checkbox is checked, display the output text
            
  if(isMenuOfTheDay==true)
  {
      checkBox.checked=true;
  }
  else
  {
      checkBox.checked=false;
  }
}