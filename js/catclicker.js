$(document).ready(function() {
var count = 0;

  $("#kitten").click(function() {
    count++;
    $("#click_number").html(count);
  });
});