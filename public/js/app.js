jQuery(document).ready(function ($) {
	$('#recipe-ingredient-container').on('click', 'button', function (e) {
		var closest = $(this).closest('.input-group');

		closest.after(closest.clone());
	});
});