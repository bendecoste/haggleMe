$(function() {
  $('#haggle-input').keypress(function(evt) {
    if (evt.keyCode === 13) {
      haggle();
    }
  });
});

function haggle() {
  value = $('#haggle-input').val();
  makeXHR(value);
}

function makeXHR(val) {
  var ajax = $.ajax({
    type: 'POST',
    url: 'http://' + window.location.host + '/haggle/1/1/' + val
  });

  ajax.success(function(res) {
    console.log('response', res, res.responseText);
    var p = document.createElement('P');
    var div = document.getElementById('wrap-me');
    p.innerText = res;
    div.appendChild(p);
  });
}
