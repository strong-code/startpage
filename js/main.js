$(document).ready(function() {

	//slide out rss toggle
	var text_input = $('#searchBox');
	var rss = 'https://news.ycombinator.com/rss';

	 $('#rss-title').click(function() {
	 	$('#rss-icon').toggleClass('glyphicon-chevron-right');
	 	$('#rss-icon').toggleClass('glyphicon-chevron-down');
		$('.rss ul').slideToggle('slow');
	});

	 //fetch RSS feeds from HN
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
})