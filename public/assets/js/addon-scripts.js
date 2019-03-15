var alphaOnly = /^[a-zA-Z ]+$/i; // Alphabet only
var alphaOnlyD = /^[a-zA-Z -]+$/i; // Alphabet + dash only
var alphaNumOnly = /^[a-zA-Z0-9 ]+$/i; // Alphanumerics Only
var alphaNumOnlyPlus = /^[a-zA-Z0-9 .,-/]+$/i; // Alphanumerics + dash + comma + periods Only
var floatOnly = /^[0-9.]+$/i; // Float pero not working sa decimal point
var numOnly = /^[0-9]+$/i; // Numbers only
var emailOnly = /^[a-zA-Z0-9 @_.]+$/i; // Numbers only

function restrictCharacters(myfield, e, restrictionType) {
  if (!e) var e = window.event
  if (e.keyCode) code = e.keyCode;
  else if (e.which) code = e.which;
  var character = String.fromCharCode(code);
  // if they pressed esc... remove focus from field...
  if (code == 27) {
    this.blur();
    return false;
  }
  // ignore if they are press other keys
  // strange because code: 39 is the down key AND ' key...
  // and DEL also equals .
  if (!e.ctrlKey && code != 9 && code != 8 && (code != 39 || (code == 39 && character == "'"))) {
    if (character.match(restrictionType)) {
      return true;
    } else {
      return false;
    }
  }
};

$(document).ready(function () {
	$('.addButton').attr('disabled', true)
	$('.addDisable').keyup(function () {
		if ($(this).val()) {
		if ($(this).val() !== "") {
		$('.addButton').attr('disabled', false)
		if ($(this).val() == " ") {
		$('.addButton').attr('disabled', true)
		$('.addDisable').val("")
		if ($(this).val()) {
			var replacing = $(this).val().trim()
			$('.addDisable').val(replacing)
			$('.addButton').attr('disabled', false)
		}
		}
		} 
		else $('.addButton').attr('disabled', true)
		} 
		else $('.addButton').attr('disabled', true)
	})
	})