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
  console.log('value', val);
  $.ajax({
    url: window.location.host + '/haggle/:1/:1/:' + val
  });

  $(window).ajaxStart(function() {
    console.log('sent a request...');
  });

  $(window).ajaxStop(function() {
    console.log('request answered');
  });
}
