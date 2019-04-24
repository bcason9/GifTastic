//topics array
var animals = ["Cat", "Dog", "Hamster", "Gecko", "Giraffe", "Orangutan", "Koala", "Alligator"];


//renders initial array into buttons
function renderButtons() {
    $("#buttons-div").empty();

    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");

        a.addClass("btn-rendered btn btn-secondary");
        
        a.attr("data-name", animals[i]);

        a.text(animals[i]);

        $("#buttons-div").append(a);
    }

}


//adds new buttons by adding to initial array
$("#add-button").on("click", function(event){
    event.preventDefault();
    var newButton = $("#button-input").val().trim();

    animals.push(newButton);

    renderButtons();
})

//calls function when page opens
renderButtons();


//ajax assigns images and bottom function adds animate click function
$(document).on("click", ".btn-rendered", function() {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=rO4T9QoToCgmui2EdDTI4oPGeKw2iE71";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        var results = response.data;
        console.log(results)
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='col-md-3'>");

            var rating = results[i].rating;

            var gif = $("<p>").text("Rating: " + rating);

            //attributes include data states for animation
            var animalGif = $("<img>");
            animalGif.attr("src", results[i].images.fixed_height_still.url);
            animalGif.attr("data-still", results[i].images.fixed_height_still.url);
            animalGif.attr("data-animate", results[i].images.fixed_height.url);
            animalGif.attr("data-state", "still");

            gifDiv.prepend(animalGif);
            gifDiv.prepend(gif);
            

            $("#gif-view").prepend(gifDiv);

            //adds clickable animation
            $(animalGif).on("click", function () {
                var state = $(this).attr("data-state")

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        }

        
    });

});