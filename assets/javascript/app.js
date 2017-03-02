// Initial array of topics
var topics = ["Pikachu", "Celebi", "Eevee", "Snorlax", "Ditto", "Charizard"];

 // displaytopicInfo function re-renders the HTML to display the appropriate content
function displaytopicInfo() {
$("#topics-view").empty();
  var topic = $(this).attr("data-name");
  const NoResults = "&limit=10";
  const rating = "&rating=pg";

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + NoResults + rating + "&api_key=dc6zaTOxFJmzC";

  // Creating an AJAX call for the specific topic button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
          var topicDiv = $("<div>");

    for (var i = 0; i < response.data.length; i++) {
      console.log(i);
      var image = $("<img>");
      var rating = response.data[i].rating;
      var imageUrlStill = response.data[i].images.fixed_width_still.url;
      var imageUrlMove = response.data[i].images.fixed_width.url;
      image.attr("class", "gif col-md-4");
      image.attr("src", imageUrlStill);
      image.attr("data-still", imageUrlStill);
      image.attr("data-animate", imageUrlMove);
      image.attr("data-state", "still");
      var pRating = $("<p>").text("Rating: " + rating);
      topicDiv.append(pRating);
      topicDiv.append(image);
    }


    // Putting the entire topic above the previous topics
    $("#topics-view").append(topicDiv);
  });

}

// Function for displaying topic data
function renderButtons() {

  // Deleting the topics prior to adding new topics
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each topic in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of topic to our button
    a.addClass("topic btn btn-primary");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a topic button is clicked
$("#add-topic").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var topic = $("#topic-input").val().trim();

  // Adding topic from the textbox to our array
  topics.push(topic);

  // Calling renderButtons which handles the processing of our topic array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "topic"
$(document).on("click", ".topic", displaytopicInfo);

$(document).on("click", ".gif", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


// Calling the renderButtons function to display the intial buttons
renderButtons();
