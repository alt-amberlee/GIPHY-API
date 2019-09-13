(document).ready(function() {

    var moods = [];

    function displayMood() {

        var mood = $(this).data("search");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +

            mood + "&api_key=F6P6Kh1JNT4QZKXP2vkE9VSFOwQhx60X&limit=10";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>");

                    var rating = results[i].rating;

                    var defaultAnimatedSrc = results[i].images.fixed_height.url;

                    var staticSrc = results[i].images.fixed_height_still.url;

                    var p = $("<p>").text("Rating: " + rating);

                    var moodImage = $("<img>");

                    moodImage.attr("src", staticSrc);

                    moodImage.addClass("moodGiphy");

                    moodImage.attr("data-state", "still");

                    moodImage.attr("data-still", staticSrc);

                    moodImage.attr("data-animate", defaultAnimatedSrc);

                    gifDiv.prepend(p);

                    gifDiv.prepend(moodImage);

                    $("#gifs-appear-here").prepend(gifDiv);

                }
            });
    };

    function renderButtons() {

        $("#buttons-display").empty();

        for (var i = 0; i < moods.length; i++) {

            var newMood = $("<button>")
                .addClass("mood")
                .attr("data-mood", moods[i])
                .text(moods[i]);

            $("#buttons-display").append(newMood);
        }
    }

    $("#mood-button").on("click", function(event) {

        event.preventDefault();

        var newMood = $("#mood-input").val().trim();

        moods.push(newMood);

        $("#mood-input").val('');

        renderButtons();

    });

    renderButtons();


    $(document).on("click", "#mood-btn", displayMood);

    $(document).on("click", "#moodGiphy", pausePlayGifs);


    function pausePlayGifs() {

        var state = $(this).attr("data-state");

        if (state === "still") {

            $(this).attr("src", $(this).attr("data-animate"));

            $(this).attr("data-state", "animate");

        } else {

            $(this).attr("src", $(this).attr("data-still"));

            $(this).attr("data-state", "still");

        }
    }
});