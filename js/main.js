window.onload = function(){
  var text_input = document.getElementById ('searchBox');
  text_input.focus ();
  text_input.select ();

  $('#rss_title').click(function() {
  	if ($('#rss_title').html() == 'HN RSS v show') {
  		$('#rss_title').html('HN RSS ^ hide');
  	} else {
  		$('#rss_title').html('HN RSS v show');
  	}
	$('.rss ul').slideToggle('slow');
});
}

var rss = 'https://news.ycombinator.com/rss';

$(function(){
	$.ajax({
		type: "GET",
		url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(rss),
		dataType: 'json',
		error: function(){
		    alert('Unable to load RSS feed, Incorrect path or invalid feed :(');
		},
		success: function(xml){
		    values = xml.responseData.feed.entries;
		    $.each(values, function() {
		    	$('.rss ul').append('<li><a href="' + this.link + '">' + this.title + '</a> - ' + this.content + '</li>');
		    });
		}
	});
});