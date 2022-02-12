$(document).ready(function() {

  fetch("https://api.npoint.io/f7b51fb38daba2c21786")
    .then(response => response.json())
    .then(json => data = json)
    .then(() => update("weekly", $("#weekly-link")));



  $("#daily-link").click(function() {
    update("daily", $(this));
  })
  $("#weekly-link").click(function() {
    update("weekly", $(this));
  })
  $("#monthly-link").click(function() {
    update("monthly", $(this));
  })

});

function update(interval, link) {
  $(".top-card-links a").removeClass("active")
  link.addClass("active")
  var new_interval = interval;
  intervals={"daily":"Yesterday", "weekly": "Last Week", "monthly": "Last month"}
  $(".card").find(".interval").html(intervals[interval])
  current_values=$(".card").find(".current_value");
  previous_values=$(".card").find(".previous_value");
  for (p in data){
    d=data[p];
    current_value=d["timeframes"][interval]["current"]
    previous_value=d["timeframes"][interval]["previous"]
    if (current_value==1){
      current_value+="hr"
    } else{
      current_value+="hrs"
    }
    if (previous_value==1){
      previous_value+="hr"
    } else{
      previous_value+="hrs"
    }
    current_values.eq(p).html(current_value);
    previous_values.eq(p).html(previous_value);
  }
}
