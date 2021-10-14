import '../scss/style.scss';
import '../index.html';

var a = document.getElementById('a');
var b = document.getElementById('b');
var c = document.getElementById('c');

document.querySelector('form.ob-sv').addEventListener('submit', function (e) {
    
    e.preventDefault();

    console.log(a.value, b.value, c.value);       
});
  