window.haggleMe = window.haggleMe || {};

/* window.haggleMe.haggle = (function() { */
$(function() {
  $('#haggle-submit').click(function(evt) {
    var value = $('#haggle-enter').val();
    value = parseInt(value, 10);

    if (!value) {
      // do something with the ui
      return;
    }

    sendValue(value);
  });
});

function sendValue(val) {

  var x = $.ajax({
    type: 'POST',
    url: 'http://' + window.location.host + '/haggle/1/1/' + val
  });

  console.log('x', x);
}
