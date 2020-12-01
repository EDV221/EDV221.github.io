window.addEventListener('load', () => {
	registerSW();

  let cors_url = 'https://cors-anywhere.herokuapp.com/';
  let url = 'https://planning.univ-rennes1.fr/jsp/custom/modules/plannings/9EYlGR3a.shu';


  fetch(cors_url + url).then(function(response){
      return response.text();
  }).then(function(text){
    //console.log("It Works!");
    document.querySelector('#calendar').innerHTML = text;
    //console.log(text);
  });
});


function registerSW() {
 if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register('/travauxTW/section-javascript/tp-js-4/js/sw.js', { scope: '/travauxTW/section-javascript/tp-js-4/' }).then((reg) => {
       // registration worked
       console.log('Registration succeeded. Scope is ' + reg.scope);
   }).catch((error) => {
       // registration failed
       console.log('Registration failed with ' + error);
   });
 }
}
