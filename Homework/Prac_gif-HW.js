//gifTastic.js 
//q= car 
// api = "https://api.giphy.com/v1/gifs/search?q="
// api key = &api_key=dc6zaTOxFJmzC
//&limit= 10
//rating = pg,pg13,R etc..

$(document).ready(function(){

	$("button").on("click", function(){
		var car = $(this).data("name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){
			console.log(response)
			var results = response.data;
			for(var i = 0; i < results.length; i++) {
				var carDiv = $("<div/>");
				var p = $("<p/>");
				p.text(results[i].rating);
				var carImage = $("<img/>");
				carImage.addClass("carImg")
				carImage.attr("src",results[i].images.fixed_height.url);
				carImage.attr("data-still", results[i].images.fixed_height_still.url)
				carImage.attr("data-animate", results[i].images.fixed_height.url)
				.attr("data-state","still");
				carDiv.append(p);
				carDiv.append(carImage);
				carDiv.prependTo($("#gifs"));
			}
			$(".carImg").on("click",function(){
				var state = $(this).attr("data-state");
				console.log(this);
				if(state === "still") {
					$(this).attr("src", $(this).data("animate"));
					$(this).attr("data-state","animate");
				} else {
					$(this).attr("src", $(this).data("still"));
					$(this).attr("data-state", "still");
				}
			});
		});
	});
var car = [""];

$("#theButton").on("click", function(){
	var carButton = $("#gif-input").val();
	var newButton = $("<button/>").addClass("car").attr("data-name",carButton).html(carButton).css({"margin:" "5px"});
	$("#carButtons").append(newButton);
	console.log("work");
	queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=dc6zaTOxFJmzC&limit=10";
	console.log(carButton);

	$.ajax({
	url:queryURL,
	method: "GET"
	}).done(function(response){
		var results = response.data;
		for (var i = 0; i < results.length; i++){
			var carDiv = $("<div/>");
			var p = $("<p/>");
			p.text(results[i].rating);
			var carImage = $("carImg")
			carImage.addClass("carImg")
			carImage.attr("src",results[i].images.fixed_height_still.url);
			carImage.attr("data-still",results[i].images.fixed_height_still.url);
			carImage.attr("data-animate",results[i].images.fixed_height.url);
			.attr("data-state", "still");
			carDiv.append(p);
			carDiv.append(carImage);
			carDiv.prependTo($("#gifs"));
		}
		$(".carImg").on("click", function(){
			var state = $(this).attr("data-state");
			console.log(this);
			if(state === "still") {
				$(this).attr("src",$(this).data("animate"));
				$(this).attr("data-state", "animate");
			} else {
				$(this).attr("src", $(this).data("still"));
				$(this).attr("data-state", "still");
			}
		});
	});
	$("#gif-input").val();
	return false;