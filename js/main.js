$(document).ready(function() {
	$('.link-tile').on('mouseover', function(e) {
		if ($(e.currentTarget).hasClass("sub-menu")) {
			$('#submenu').css("display", "block");
		}
	});

	$('.link-tile').on('mouseover', function(e) {
		if (!$(e.currentTarget).hasClass("sub-menu")) {
			$('#submenu').css("display", "none");
		}
	});
})