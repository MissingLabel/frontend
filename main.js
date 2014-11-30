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

      var commodityName = response.name;

      $("#commodity-name").html(commodityName);
      $("#calories").html(response.calories);
      $("#total-fat-percentage").html(response.fat_per);
      $("#total-fat").html(response.total_fat);
      $("#total-fat-unit").html(response.fat_units);
      $("#saturated-fat-percentage").html(response.sat_per);
      $("#saturated-fat").html(response.sat_fat);
      $("#saturated-fat-unit").html(response.sat_fat_unit);
      $("#trans-fat-percentage").html(response.trans_fat_per);
      $("#trans-fat").html(response.trans_fat);
      $("#trans-fat-unit").html(response.trans_fat_unit);
      $("#cholesterol-percentage").html(response.cholesterol_per);
      $("#cholesterol").html(response.cholesterol);
      $("#cholesterol-unit").html(response.cholesterol_units);
      $("#sodium-percentage").html(response.sodium_per);
      $("#sodium").html(response.sodium);
      $("#sodium-unit").html(response.sodium_units);
      $("#total-carbs-percentage").html(response.carb_per);
      $("#total-carbs").html(response.carb);
      $("#total-carbs-unit").html(response.carb_unit);
      $("#dietary-fiber-percentage").html(response.fiber_per);
      $("#dietary-fiber").html(response.fiber);
      $("#dietary-fiber-unit").html(response.fiber_units);
      $("#sugar-percentage").html(response.sugars_per);
      $("#sugar").html(response.sugars);
      $("#sugar-unit").html(response.sugars_unit);
      $("#added-sugar-percentage").html(response.added_sugars_per);
      $("#added-sugar").html(response.added_sugars);
      $("#added-sugar-unit").html(response.added_sugars_unit);
      $("#protein-percentage").html(response.protein_per);
      $("#protein").html(response.protein);
      $("#protein-unit").html(response.protein_units);

      for (var i = 0; response.lower_label.length; i++) {

        var tableDiv =  "<tr><td id='item-percentage' class='td-left-bottom'>"
                        +response.lower_label[i].per.toString()+
                        "%</td><td class='td-right-bottom'><span id='item-name'>"
                        +response.lower_label[i].name.toString()+
                        "</span>&nbsp;<div id='item-qty'>"
                        +response.lower_label[i].num.toString()+
                        "</div>&nbsp;<div id='item-unit'>"
                        +response.lower_label[i].units.toString()+
                        "</div></td></tr>"

        $("#nutrition-lower-table tbody").append(tableDiv);

      }

    });
  });
});
