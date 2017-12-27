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
	$scope.audio = new Audio();
	$scope.newLocation = function(){
		var apiKey = '67d4ac0e95120bc42f358dbe5cce49e8';
		var openWeatherUrlCity = 'http://api.openweathermap.org/data/2.5/weather?q='
		 + $scope.locale + '&appid=' + apiKey;
		 
		var cityWeatherCallback = function(response, data) {
			$scope.description = response.data.weather[0].description;
			$scope.temp = 1.8*(response.data.main.temp-273) + 32;
			$scope.tempF = ($scope.temp).toFixed(01);
			$scope.tempC = ((response.data.main.temp)-273.15).toFixed(01);
			$scope.wind = (response.data.wind.speed).toFixed(01) + " mph";
			$scope.location = response.data.name;

		};
		switch($scope.description) {
			case 'scattered clouds':
				genre = 1111;
				break;
			case 'few clouds':
				genre = 1112;
				break;
			case 'mist':
				genre = 1113;
				break;
			case 'haze':
				genre = 1114;
				break;
			case 'overcast clouds':
				genre = 1010;
				break;
			case 'clear sky':
				genre = 1192;
				break;
			case 'broken clouds':
				genre = 1147;
				break;
			default:
				genre = 1143;
		};

		var itunesUrl = 'https://itunes.apple.com/us/rss/topsongs/genre=' + genre + '/json';

		
			$http.get(openWeatherUrlCity).then(cityWeatherCallback, errorCallback);
			$http.get(itunesUrl).then(function(response, data) {
			
			//assign iTunes data
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
				
				$scope.ii = 0;
				$scope.audio.addEventListener('ended', function() {
					$scope.ii = $scope.ii+1;
					$scope.audio.src = $scope.tracks[$scope.ii].m4a
					$scope.audio.play();
					//replay playlist
					if ($scope.ii > 7) {	$scope.ii = 0;	};
				});
				$scope.audio.src = $scope.tracks[$scope.ii].m4a
				$scope.audio.play();
				console.log(response.status);
			}, errorCallback);
			$scope.locale = "";
		}


	// 		//playing the audio based on the CurrentTime
});