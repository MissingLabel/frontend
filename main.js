function makeTemplateProcessor($){
  function showPage(page){
      $("#search-form").css("display", "none");
      $("#nutrition-facts-label").css("display", "none");
      $("#login-form").css("display", "none");
      $("#create-form").css("display", "none");
      $("#location-data").css("display", "none");
      $("#" + page).css("display", "block");
  }

  function showNutritionalData(data) {
      showPage("nutrition-facts-label");
      $("#swipe-buttons").css("display", "block");
      $("body").css("background-image", "none");
      $(".logo").css("top", "-20px");

      var commodityName = data.name;

      _.templateSettings.variable = "nutritionData";

      var nutritionTemplate = _.template(
        $("#nutrition-template").html()
      );

      var nutritionData = data

      $("#nutrition-facts-label").html(
        nutritionTemplate( nutritionData )
      );

      $("#commodity-name").html(commodityName.charAt(0).toUpperCase() + commodityName.slice(1));
      $("#plu").html(data.plu_no);

      for (var i = 0; data.lower_label.length; i++) {

        var tableDiv =  "<tr><td id='item-percentage' class='td-left-bottom'>"
                        +data.lower_label[i].per.toString()+
                        "%</td><td class='td-right-bottom'><span id='item-name'>"
                        +data.lower_label[i].name.toString()+
                        "</span>&nbsp;<div id='item-qty'>"
                        +data.lower_label[i].num.toString()+
                        "</div>&nbsp;<div id='item-unit'>"
                        +data.lower_label[i].units.toString()+
                        "</div></td></tr>"

        $("#nutrition-lower-table tbody").append(tableDiv);
    }
  }

  return {
    showNutritionalData: showNutritionalData,
    showPage: showPage
  };
}

var viewTemplating = makeTemplateProcessor(jQuery);

$(document).ready(function(){

  var currentProductData;

  $("#login-button").click(function(e){
    e.preventDefault();
    var emailInput = $("#login-input-field").val();
    var loginInput = $("#password-input").val();
    var request = $.ajax({
      dataType: "json",
      url: "https://vast-cliffs-6881.herokuapp.com/login",
      data: {email: emailInput, password: loginInput},
      type: "POST"
    })

    // var testResponse = true
    request.done(function(response){
      console.log(response.loginSecure);
      if(response.loginSecure === "True"){
      // if(response === true){
        $("#login-form").css("display", "none");
        $("#create-form").css("display", "none");
        $("#search-form").css("display", "block");
      } else {
        alert("Please try again");
      }
    });

  });

  $("#create-button").click(function(e){
    e.preventDefault();
    $("#login-form").css("display", "none");
    $("#create-form").css("display", "none");
    $("#signup-form").css("display", "block");
  });

    // ajax call
    // if session
      // hide #login-form
      // show #search-form view

  $("#create-account-button").click(function(e){
    e.preventDefault();
    var emailInput = $("#signup-input-field").val();
    var loginInput = $("#new-password-input").val();

    var request = $.ajax({
      dataType: "json",
      url: "https://vast-cliffs-6881.herokuapp.com/users",
      data: {email: emailInput, email: loginInput},
      type: "POST"
    })
    request.done( function(response){
      if(response.loginSecure === "True"){
        $("#signup-form").css("display", "none");
        $("#search-form").css("display", "block");
      } else {
        alert("Please try again");
      };
    });

  });
    // hide #login-form
    // show #signup-form

  // $("#")

  $("#search-button").click(function(e){
    e.preventDefault();
    var input = $("#input-field").val();
    console.log(input);
    var request = $.ajax({
      dataType: "json",
      url: "https://vast-cliffs-6881.herokuapp.com/items/" + input,
      type: "GET"
    })

    request.done( function(response){
      console.log(response);
      currentProductData = response;
      viewTemplating.showNutrionalData(currentProductData);
    });
  });



  $("#left-button").click(function(e){
    e.preventDefault();
    $("#nutrition-facts-label").css("display", "none");

    // var commodityName = response.name;

    _.templateSettings.variable = "locationData";

    var locationTemplate = _.template(
      $("#location-template").html()
    );

    var locationData = currentProductData;

    $("#location-data").html(
      locationTemplate( locationData )
    );

  });

  $("#right-button").click(function(e){
    e.preventDefault();
    $("#nutrition-facts-label").css("display", "none");

    _.templateSettings.variable = "nutritionData";

    var locationTemplate = _.template(
      $("#location-template").html()
    );

    var locationData = currentProductData;

    $("#nutrition-facts-label").html(
      nutritionTemplate( nutritionData )
    );

  });

});
