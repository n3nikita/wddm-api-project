$(function() {
	// Nice Select
	$('select').niceSelect();
})

document.addEventListener('DOMContentLoaded', function() {
	var form = document.getElementById('representative-search'); // Get the form by its ID
  
	form.addEventListener('submit', function(event) {
	  event.preventDefault(); // Prevent the form from submitting
	});
  });
  