$(document).ready(function(){
    var topics = ['cadillac', 'audi', 'jaguar', 'lamborghini', 'ferrari', 'rolls royce', 'mustang', 'dodge-challenger'];

    // ========================================================

  //  create topics array buttons
    function buttonExpress(){
        $('#buttonsView').empty();
        
        for ( var i=0; i < topics.length; i++) {
            //create all buttons
            var a = $('<button>');
            a.addClass('expression');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttonsView').append(a);
        }
    }    
    buttonExpress();
   

//on button click
  $(document).on('click', '.expression', function() {

    var car = $(this).html(); 
    console.log(car);
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=dc6zaTOxFJmzC&limit=10";
        // console.log(queryURL);
        $.ajax({url: queryURL, method: 'GET'})
        .done(function(response) {
            // grabs the data
            var results = response.data;
            // console.log(results);
            //empties the div before adding more gifs
            $('#expressView').empty();
                //loops through the data
                for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                        // console.log(imageView);  
                    var expressImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    expressImage.attr('data-state', 'still');
                    $('#expressView').prepend(expressImage);
                    expressImage.on('click', playGif);
                    
                    // pulling the rating
                        var rating = results[j].rating;
                            // console.log(rating);
                        var displayRated= $('<p>').text("Rating: " + rating);
                        $('#expressView').prepend(displayRated);
            
                } //for loop
        }); // done response

        function playGif() { 
                    var state = $(this).attr('data-state');
                    console.log(state);
                 if ( state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                     $(this).attr('data-state', 'animate');
                 } else {
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } //on click express
                
    }) // document on click

       


//adding new button
$(document).on('click', '#addExpress', function(){
    if ($('#express-input').val().trim() == ''){
      alert('please add car');
   }
   else {
    var car = $('#express-input').val().trim();
    topics.push(car);
    $('#express-input').val('');
    buttonExpress();
    return false;

    }

});



});  //document ready