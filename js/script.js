
function loadData() {

    var $body = $('body');
    var $wikiHeaderElem = $('#wikipedia-header');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!

	$greeting.text("¿Así que quieres vivir en " + placeInput + " (" + cityInput + ")?");    

	//Google Maps API
	var placeInput = $( "#street" ).val();
	var cityInput = $( "#city" ).val();
	var locationInput = placeInput + ", " + cityInput;
	var mapsApiKey = "AIzaSyC5zVUHFP72MyUrymfL8sFD3EOvUfsY1y4";
	var bgurl = "https://maps.googleapis.com/maps/api/streetview?size=1920x1080&location=" + locationInput + "&fov=90&heading=235&pitch=10&key=" + mapsApiKey;
		
	$(".bgimg").attr("src", bgurl);
	
	//NYTimes API
	var nyTimesAPI = "b38e3797d776a875e74ff55f890a9a8c:9:72977214";
	var nyTimesURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=" + cityInput + "&glocations=" + cityInput + "&api-key=" + nyTimesAPI ;

	$.getJSON( nyTimesURL , function (data) {
		$nytHeaderElem.text("New York Times articles about " + cityInput);
		articles = data.response.docs;

		for (var i=0; i < articles.length; i++) {
			var article = articles[i];
			$nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
		};
	}).error(function(e){
		$nytHeaderElem.text("Ooops! Nothing to see here!");	
	});

	//Wikipedia API	
	var wikiURL = 'http://es.wikipedia.org/w/api.php?action=opensearch&search=' + cityInput + '&format=json&callback=wikiCallback';
	
	var wikiRequestTimeout = setTimeout(function(){
		$wikiElem.text("Failed trying to reach Wikipedia!");
	}, 8000);
	$.ajax({
		  url: wikiURL,
		  dataType: 'jsonp',
		  success: function (x) {
			$wikiHeaderElem.text("Wikipedia Articles about " + cityInput);
			var wikiArticles = x[1];
			for (var i=0; i < wikiArticles.length; i++) {
				var wikiArticlesStr = wikiArticles[i];
				$wikiElem.append('<li class="article">' + '<a href="http://es.wikipedia.org/wiki/' + wikiArticlesStr + '">' + wikiArticlesStr + '</a></li>');
				
			};
			
			cleartimeout(wikiRequestTimeout);
			}
		});
	
	
	return false;
};

$('#form-container').submit(loadData);

// loadData();
