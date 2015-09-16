
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!

	var placeInput = $( "#street" ).val();
	var cityInput = $( "#city" ).val();
	var locationInput = placeInput + ", " + cityInput;
	var mapsApiKey = "AIzaSyC5zVUHFP72MyUrymfL8sFD3EOvUfsY1y4";
	var bgurl = "https://maps.googleapis.com/maps/api/streetview?size=1920x1080&location=" + locationInput + "&fov=90&heading=235&pitch=10&key=" + mapsApiKey;
	
	$(".bgimg").attr("src", bgurl);
	$greeting.text("¿Así que quieres vivir en " + placeInput + " (" + cityInput + ")?");
	
	var nyTimesAPI = "b38e3797d776a875e74ff55f890a9a8c:9:72977214";
	var nyTimesURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=" + cityInput + "&glocations=" + cityInput + "&api-key=" + nyTimesAPI ;

	$.getJSON( nyTimesURL , function (data) {
		console.log(data);
	});
	
	return false;
};

$('#form-container').submit(loadData);

// loadData();
