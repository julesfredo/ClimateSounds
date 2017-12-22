angular.module('myapp',[])
.controller('weatherCtrl', function($scope, $http) {

	var SuccessCallback = function(response, data) {
		$scope.lon = parseFloat(response.data.lon);
		$scope.lat = parseFloat(response.data.lat);

	var errorCallback = function(error) {
			console.log("there was an error", error)
	};

	//OpenWeatherMap API Query Setup
		var apiKey = '67d4ac0e95120bc42f358dbe5cce49e8';
		var openWeatherUrlCoord = 
		'http://api.openweathermap.org/data/2.5/weather?lat='
		 + $scope.lat + '&lon=' + $scope.lon + 
		 '&appid=' + apiKey;

	//OpenWeather API SuccessCallback
		 var weatherCallback = function(response, data) {
			$scope.description = response.data.weather[0].description;
			 $scope.temp = 1.8*(response.data.main.temp-273) + 32;
			 $scope.tempF = ($scope.temp).toFixed(01);
			 $scope.tempC = ((response.data.main.temp)-273.15).toFixed(01);
			 $scope.wind = (response.data.wind.speed).toFixed(01) + " mph";
			 $scope.location = response.data.name;
		}
		console.log(response.status, openWeatherUrlCoord);
	//OpenWeatherMap API Query
		$http.get(openWeatherUrlCoord).then(weatherCallback, errorCallback);//End openWeather API promise
		};
	var errorCallback = function(error) {
			console.log("there was an error", error)
	};

	//API Query for coordinates
	$http.get('http://ip-api.com/json/').then(SuccessCallback, errorCallback);

	//Runs upon entering a city
	$scope.newLocation = function(){
		var apiKey = '67d4ac0e95120bc42f358dbe5cce49e8';
		var openWeatherUrlCity = 'http://api.openweathermap.org/data/2.5/weather?q='
		 + $scope.locale + '&appid=' + apiKey;
		var itunesUrl = 'https://itunes.apple.com/us/rss/topsongs/genre=' + 1192 + '/json';
		var cityWeatherCallback = function(response, data) {
			$scope.description = response.data.weather[0].description;
			$scope.temp = 1.8*(response.data.main.temp-273) + 32;
			$scope.tempF = ($scope.temp).toFixed(01);
			$scope.tempC = ((response.data.main.temp)-273.15).toFixed(01);
			$scope.wind = (response.data.wind.speed).toFixed(01) + " mph";
			$scope.location = response.data.name;

		};
			
			$http.get(openWeatherUrlCity).then(cityWeatherCallback, errorCallback);
			$http.get(itunesUrl).then(function(response, data) {
			
				var music =[{
					title: response.data.feed.entry[0].title.label,
					m4a: response.data.feed.entry[0].link[01].attributes.href
				},
				{
					title: response.data.feed.entry[1].title.label,
					m4a: response.data.feed.entry[1].link[01].attributes.href
				},
				{
					title: response.data.feed.entry[2].title.label,
					m4a: response.data.feed.entry[2].link[01].attributes.href
				},
				{
					title: response.data.feed.entry[3].title.label,
					m4a: response.data.feed.entry[3].link[01].attributes.href
				},
				{
					title: response.data.feed.entry[4].title.label,
					m4a: response.data.feed.entry[4].link[01].attributes.href
				},
				{
					title: response.data.feed.entry[5].title.label,
					m4a: response.data.feed.entry[5].link[01].attributes.href
				},
				{
					title: response.data.feed.entry[6].title.label,
					m4a: response.data.feed.entry[6].link[01].attributes.href
				},
				{
					title: response.data.feed.entry[7].title.label,
					m4a: response.data.feed.entry[7].link[01].attributes.href
				}
				];
				$scope.tracks = music;
				var audio = document.getElementById('audio').ended;
				for(i=0; i < ($scope.tracks).length; i++) {
					$scope.song = $scope.tracks[i].m4a;
					console.log($scope.tracks[i]);
				};
				console.log(response.status);
			}, errorCallback);
			$scope.locale = "";
		}


	// 		//playing the audio based on the CurrentTime
});