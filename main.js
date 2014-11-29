$(document).ready(function(){
  $("#search-button").click(function(e){
    e.preventDefault();
    var input = $("#input-field").val();
    console.log(input);
    var request = $.ajax({
      datatype: "json",
      url: "https://vast-cliffs-6881.herokuapp.com/items/" + input,
      type: "GET"
    })
    request.done( function(response){
      console.log(response);
      $("#search-form").css("display", "none");
      $("#nutrition-facts-label").css("display", "block");
      // $("#nutrition-facts-label").html(response.commodity);
      // $(document).append(response.commodity);

    });
  });
});

// $( document ).ready(function() {
//     console.log( "ready!" );
// });
