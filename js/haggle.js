$(function() {
  $('#haggle-input').keypress(function(evt) {
    if (evt.keyCode === 13) {
      haggle();
    }
  });
});

var time = 35;

setInterval(function() {
  if (time <= 30 && time >= 0) {
    document.getElementsByClassName('count')[0].innerText = time;
  }

  --time;
}, 1000);

function haggle() {
  value = $('#haggle-input').val();
  makeXHR(value);
}

function makeXHR(val) {
  console.log('val', val);
  var ajax = $.ajax({
    type: 'POST',
    url: 'http://' + window.location.host + '/haggle/1/1/' + val
  });

  ajax.success(function(res) {
    console.log('response', res, res.responseText);
    document.getElementById('message').innerText = res;
  });
}
