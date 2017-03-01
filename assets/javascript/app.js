// Initial array of topics
var topics = ["Pikachu", "Celebi", "Eevee", "Snorlax", "Ditto", "Charizard"];

 // displaytopicInfo function re-renders the HTML to display the appropriate content
function displaytopicInfo() {

  var topic = $(this).attr("data-name");

  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC";

  // Creating an AJAX call for the specific topic button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    // Creating a div to hold the topic
    var topicDiv = $("<div class='topic'>");

    // Storing the rating data
    var rating = response.data[0].rating;

    // Creating an element to have the rating displayed
    var pOne = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    topicDiv.append(pOne);

// still image
    var imageUrlStill = response.data[0].images.fixed_width_still.url;
    var imageStil = $("<img>");
    imageStil.attr("src", imageUrlStill);
    topicDiv.append(imageStil);

    // moving image
    var imageUrlMove = response.data[0].images.fixed_width.url;
    var imageMove = $("<img>");
    imageMove.attr("src", imageUrlMove);

    // Appending the plot
    topicDiv.append(imageMove);


    // Putting the entire topic above the previous topics
    $("#topics-view").prepend(topicDiv);
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
    a.addClass("topic");
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

// Calling the renderButtons function to display the intial buttons
renderButtons();
