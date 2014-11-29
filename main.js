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
      $("body").css("background-image", "none");
      $(".logo").css("top", "-20px");
      var commodityName = response.commodity.charAt(0).toUpperCase() + response.commodity.slice(1);
      $("#commodity-name").html(commodityName);
      // $("#nutrition-facts-label").html(response.commodity);
      // $(document).append(response.commodity);

    });
  });
});

// $( document ).ready(function() {
//     console.log( "ready!" );
// });
