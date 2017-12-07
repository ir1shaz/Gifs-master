//create array of sports 
//make buttons for the sports 
//make form and button to create new sport listing 
//fucntion to add new sport to array 
//api call for the new sport 
//api call for the existing array, clear the old ones, 
//put ajax results in a variable 
//now loop through the results to create the div, ratings and images 
//set the source and data attributes 
//create an onclick for pausing and playing the gifs
//append rating an image 
//


$(document).ready(function() {

    //Creating the array to store values for the buttons to be created 
    var topics = ["Soccer", "Baseball", "Basketball", "Football", "Hockey", "Tennis", "Volleyball", "Softball"];


    //_______________________________________________________________________________________________________

    // Creating and inserting buttons with a loop function 
    function makeButtons() {
        $("#sportsButtons").empty();
        //Looping through array to create buttons
        for (var i = 0; i < topics.length; i++) {
            var inBtn = $("<button>");
            inBtn.attr("data-name", topics[i]);
            inBtn.text(topics[i]);
        //Inserting the newly created buttons
           $("#sportsButtons").append(inBtn);
        }
    };

    //_______________________________________________________________________________________________________

    //On-click function to create new sport/button 
    $("#add-sports").on("click", function(event) {

        //Preventing the form 
        event.preventDefault();

        //adding user's input into the array and then creating the button
        var added = $("#sports-input").val().trim();
        topics.push(added);
        console.log(topics);
        makeButtons();

        //API Function to call on the new buttons
        fetch();

        //Clearing the form after the user submits their new sport 
        $("#sports-form").find("input:text").val("");
    });


	//_______________________________________________________________________________________________________

    //Calling function to create first buttons
    makeButtons();

    //________________________________________________________________________________________________________

    //Create the function with  api call inside 
    function fetch() {
        $("button").on("click", function() {
            //clearing previously marked gifs.. **note to self**research do I need to do this? 
            $("#gifs-here").empty();
            var sports = $(this).attr("data-name");
            console.log(this);

    //creating the API call with the link, limit to 10 items
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                        sports + "&api_key=dc6zaTOxFJmzC&limit=10";

                        $.ajax({
                                url: queryURL,
                                method: "GET"
                            })

                            .done(function(response) 
                            {
                                //log the URL 
                                console.log(queryURL)
                                //log the response 
                                console.log(response);

    // storing the data from the AJAX request in the results variable
                var results = response.data;

    //_________________________________________________________________________________________________________


    // Looping through each result item to create div, rating and image 
      for (var i = 0; i < results.length; i++) {
            var sportsDiv = $("<div>");
            var rated = $("<p>").text("Rating: " + results[i].rating);
            var sportsImage = $("<img>");

            // Setting the source and 3 data attr for each of the images
            sportsImage.attr("src", results[i].images.fixed_height_still.url);
            sportsImage.attr("data-animate", results[i].images.fixed_height.url);
            sportsImage.attr("data-still", results[i].images.fixed_height_still.url);
            sportsImage.attr("data-state", "still");

            // user click to flip from animated to not or from still to animated  
            sportsImage.on("click", function() {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                };
            });

            //append the ratings and image now
            sportsDiv.append(rated);
            sportsDiv.append(sportsImage);

            //prepending gifs into the divs 
            $("#gifs-here").prepend(sportsDiv);

                    }
                });

        });
    };

    //___________________________________________________________________________________________
    //alright now run it... 
    fetch();

});