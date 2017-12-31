angular.module('myapp',[])
.controller('weatherCtrl', function($scope, $http) {
	//Gather initial location callbacks
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
	console.log(response.status, $scope.locale);
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
	$scope.playbtn = document.getElementById('playbtn');
		function playPause() {
			if ($scope.audio.paused)	{
				$scope.audio.play();
				$scope.playbtn.classList.remove('playbtn');
				$scope.playbtn.classList.add('pausebtn');
				console.log('playing');
			} else {
				$scope.audio.pause();
				$scope.playbtn.classList.remove('pausebtn');
				$scope.playbtn.classList.add('playbtn');
				console.log('paused');
			}
		};
		playbtn.addEventListener('click', playPause);
	$scope.newLocation = function(){
		var apiKey = '67d4ac0e95120bc42f358dbe5cce49e8';
		var openWeatherUrlCity = 'http://api.openweathermap.org/data/2.5/weather?q='
		+ $scope.locale + '&appid=' + apiKey;

		function cityWeatherCallback (response, data) {
			$scope.description = response.data.weather[0].description;
			$scope.temp = 1.8*(response.data.main.temp-273) + 32;
			$scope.tempF = ($scope.temp).toFixed(01);
			$scope.tempC = ((response.data.main.temp)-273.15).toFixed(01);
			$scope.wind = (response.data.wind.speed).toFixed(01) + " mph";
			$scope.location = response.data.name;
			$scope.windd = (response.data.wind.speed).toFixed(01) + " mph";

		};
		$http.get(openWeatherUrlCity).then(cityWeatherCallback, errorCallback);
		$('table').removeClass('collapse')
		$('#playbtn').removeClass('collapse');
		}//End newLocation
		function rest(description) {
			switch($scope.description) {
				case 'overcast clouds':
				genre = 1010;
				break;
				case 'broken clouds':
				genre = 1147;
				break;
				case 'scattered clouds':
				genre = 1209;
				break;
				case 'few clouds':
				genre = 1112;
				break;
				case 'mist':
				genre = 1027;
				break;
				case 'haze':
				genre = 1114;
				break;
				case 'drizzle':
				genre = 1128;
				break;
				case 'fog':
				genre = 1142;
				break;
				case 'clear sky':
				genre = 1192;
				break;
				case 'heavy rain':
				genre = 1143;
				break;
				case 'moderate rain':
				genre = 1003;
				break;
				case 'light rain':
				genre = 1043;
				break;
				case 'heavy snow':
				genre = 1082;
				break;
				case 'moderate snow':
				genre = 1082;
				break;
				case 'light snow':
				genre = 1211;
				break;
			};
			console.log($scope.description)

			var itunesUrl = 'https://itunes.apple.com/us/rss/topsongs/genre=' + genre + '/json';


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
			// $scope.currentTitle = $scope.tracks[$scope.ii].title;
			$scope.audio.volume = 0.3;
			$scope.audio.addEventListener('ended', function() {
				$scope.ii += 1;
				$scope.audio.src = $scope.tracks[$scope.ii].m4a;
				$scope.audio.play();
				// $('#song').removeClass('collapse');
					//replay playlist
					if ($scope.ii > 7) {	$scope.ii = 0;	};
				});
			$scope.audio.src = $scope.tracks[$scope.ii].m4a
			
			console.log(itunesUrl);
		}, errorCallback);
			$scope.locale = "";
		};
		$scope.$watch('windd', function(newValue, oldValue){
			rest(newValue);
		});

	// 		//playing the audio based on the CurrentTime
});
