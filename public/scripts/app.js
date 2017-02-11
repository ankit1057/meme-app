console.log('app.js works');

angular.module('memeApp')
//global data
.controller('HomeController', HomeController)
//deals with user
.controller('AuthController', AuthController)
//deals with memes
.controller('MemeController', MemeController)
.controller('RandomMemeController', RandomMemeController);


function HomeController($scope, $http){
  var self = this;

  $scope.$on('userLoggedIn', function(event, data) {
    self.currentUser = data;
  })

  $scope.$on('userLoggedOut', function(event, data) {
    self.currentUser = null;
  })
}

function AuthController($http, $state, $scope, $rootScope){
  console.log('Hit AuthController function in app.js');

  var self = this;


  function signup(newUserInfo){
    //test
    console.log('hit signup function in AuthController in app.js');
    console.log(newUserInfo);

    $http.post('/users', newUserInfo)
    .then(function(response){
      console.log(response);
      $state.go('login');
    });

  }

  function login(userInfo) {
    console.log('Hit Login Function');
    console.log(userInfo);
    $http.post('/sessions/login', userInfo)
      .then(function(response) {
        console.log(response);

        $scope.$emit('userLoggedIn', response.data.data);
        $rootScope.$emit('fetchData', response.data.data);
        $state.go('user');
      });
  }

  function logout() {
    console.log('Hit Logout Function');
    $http.delete('/sessions')
      .then(function(response) {
        $scope.$emit('userLoggedOut');
        $state.go('index');
      });
  }

  self.logout = logout;
  self.signup = signup;
  self.login = login;
}

function MemeController(){

}

function RandomMemeController($http, $state) {
  console.log('hit RandomMemeController in app.js');

  var self = this;

  self.randomMemesData = [];


  randomMemes();

  function randomMemes (){
    $http.get('/memes')
    .then(function(response){
      console.log(response);
      self.randomMemesData = response;
    });
  }
  // var getRandomMeme = function(randomMemesData.data.randomMemes._id){
  //   console.log(randomMemesData.data.randomMemes._id);
  //   var randomMemes = Math.floor((Math.random() * 73) + 1);
  //   document.getElementById(meme_id)
  //   .setAttribute("src", memeData[randomMemes].randomMemes)
  // }

  // this object will contain all of your properties and methods/functions
  // var game = {

    // an array of ten tiles
    memeData: ['randomMemesData'],

    // USE THIS TO SHUFFLE YOUR ARRAYS
    //a = array
    shuffle: function(a) {
      for(var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
        return a;
    },

    start: function(){
      console.log("EVERY DAY I'M SHUFFELING");
      // shuffle the tiles array
      meme.shuffle(meme.randomMemesData);


  self.randomMemes = randomMemes;

}
