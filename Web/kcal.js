let totalKcal = 0;
let totalCalbo = 0;
let totalProtein = 0;
let totalFat = 0;

function clickItem(id) {
  let text = $(".selected-container textarea").val();
  let food = $(`#${id}`).attr("name");
  let kcal = Number($(`#${id} .kcal span:nth-child(1)`).text());
  let calbo = Number($(`#${id}`).attr("c"));
  let protein = Number($(`#${id}`).attr("p"));
  let fat = Number($(`#${id}`).attr("f"));

  $(".selected-container textarea").val(text + " " + food);
  totalKcal += kcal;
  totalCalbo += calbo;
  totalProtein += protein;
  totalFat += fat;
}

function clickCalc() {
  $("#totalKcal").text(totalKcal.toFixed(2));
  $("#totalCalbo").text(totalCalbo.toFixed(2));
  $("#totalProtein").text(totalProtein.toFixed(2));
  $("#totalFat").text(totalFat.toFixed(2));

  $(".result-container").css("display", "block");
}

function clickReset() {
  totalKcal = 0;
  totalCalbo = 0;
  totalProtein = 0;
  totalFat = 0;
  $("#totalKcal").text(totalKcal);
  $("#totalCalbo").text(totalCalbo);
  $("#totalProtein").text(totalProtein);
  $("#totalFat").text(totalFat);
  $(".selected-container textarea").val("");

  $(".result-container").css("display", "none");
}
