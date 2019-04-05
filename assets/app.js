var animals = ["Cat", "Dog", "Hamster", "Gecko"];

function renderButtons() {
    $("#buttons-div").empty();

    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        


        a.addClass("btn-rendered");
        
        a.attr("data-name", animals[i]);

        a.text(animals[i]);

        $("#buttons-div").append(a);
    }

}

$("#add-button").on("click", function(event){
    event.preventDefault();
    var newButton = $("#button-input").val().trim();

    animals.push(newButton);

    renderButtons();
})

renderButtons();

$(document).on("click", ".btn-rendered", function() {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=dc6zaTOxFJmzC&limit=10";

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

            var animalGif = $("<img>");
            animalGif.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(animalGif)
            gifDiv.prepend(gif);
            

            $("#gif-view").prepend(gifDiv);
        }
    });
});