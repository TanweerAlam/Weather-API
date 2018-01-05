$(document).ready(function(){
	

	var passedUrl = "defined";
	// var units = "undefined";
	
	function day(){
		var days = ['SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'];
		var day = new Date();
		var today = day.getDay(); //nextDay = Today + 1 

		var putDay = [];

		for(var i = 0; i <= 5; i++){
			if(today <= 6) {
				putDay.push(days[today]);
				today++;
			}
			else{
				today = 0;
			}
		
		}
		console.log(putDay);
		setDay(putDay);
	}

	function setDay(putDay){
		$('#day1').text(putDay[1]);
		$('#day2').text(putDay[2]);
		$('#day3').text(putDay[3]);
		$('#day4').text(putDay[4]);
	}

	function localWeather(){
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function(position){

				var latitude = position.coords.latitude;
				var longitude = position.coords.longitude;


				document.getElementById('coords-lat').innerHTML = latitude;
				document.getElementById('coords-long').innerHTML = longitude;

				passedUrl = "http://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&units=metric&appid=4b0a422202ef26d4d9c9dcab245a2636";
				
				showWeather(passedUrl);
			});
		}
		else{
			alert("Geolocation is disabled or not available.");
		}
	}

	localWeather();

	function showWeather(url){

		$.ajax({
				datatype: 'json',
				url: url,
				data: {
					format: 'jsonp',
					lang: 'en'
				},
				success: function(myResult){
					//console.log(passedUrl);
					$('#weather-city').text(myResult.city.name);
					$('#weather-country').text(", "+myResult.city.country);
					$('#weather-icon').html("<img alt ='weather-icon' src='http://api.openweathermap.org/img/w/" + myResult.list[0].weather[0].icon + ".png' style= 'height: 50px; width: 50px;'> <br><p>" + myResult.list[0].weather[0].description+"</p>");
					$('#weather-temp').text(myResult.list[0].main.temp);

					$('#wind-info').text(myResult.list[0].wind.speed);
					$('#wind-degree').text(myResult.list[0].wind.deg);
					$('#humidity-info').text(myResult.list[0].main.humidity);
					$('#pressure').text(myResult.list[0].main.pressure);

					// $('#weather-city').text(myResult.city.name);
					$('#weather-icon').html("<img alt ='weather-icon' src='http://api.openweathermap.org/img/w/" + myResult.list[0].weather[0].icon + ".png' > <br><p>" + myResult.list[0].weather[0].description+"</p>");
					$('#weather-temp').text(myResult.list[0].main.temp);

					$('#wind-info').text(myResult.list[0].wind.speed);
					$('#humidity-info').text(myResult.list[0].main.humidity);
					
					//show visibility here
					//show next-hour report here
					
					// next-days div goes here
					// {define report here for day 1}
					
					$('#day1-icon').html("<img alt='weather-icon' src='http://api.openweathermap.org/img/w/" + myResult.list[1].weather[0].icon + ".png' ><br><p>" + myResult.list[1].weather[0].description+"</p>");
					$('#day1-temp').text(myResult.list[1].main.temp);
					//{define report here for day 2}
					
					$('#day2-icon').html("<img alt='weather-icon' src='http://api.openweathermap.org/img/w/" + myResult.list[2].weather[0].icon + ".png' ><br><p>" + myResult.list[2].weather[0].description+"</p>");
					$('#day2-temp').text(myResult.list[2].main.temp);
					//{define report here for day 3}
					
					$('#day3-icon').html("<img alt='weather-icon' src='http://api.openweathermap.org/img/w/" + myResult.list[3].weather[0].icon + ".png' ><br><p>" + myResult.list[3].weather[0].description+"</p>");
					$('#day3-temp').text(myResult.list[3].main.temp);
					//{define report here for day 4}
					
					$('#day4-icon').html("<img alt='weather-icon' src='http://api.openweathermap.org/img/w/" + myResult.list[4].weather[0].icon + ".png' ><br><p>" + myResult.list[4].weather[0].description+"</p>");
					$('#day4-temp').text(myResult.list[4].main.temp);
				},
				error: function(){
					alert("There might be some problem in connection.");
				}
		});

	}

	function hideCoordinates(){
		$('#coords-lat').hide();
		$('#coords-long').hide();
	}

	function tempConversion(){
		var todayTemp = parseInt($('#weather-temp').text());
		var day1Temp = parseInt($('#day1-temp').text());
		var day2Temp = parseInt($('#weather-temp').text());
		var day3Temp = parseInt($('#weather-temp').text());
		var day4Temp = parseInt($('#weather-temp').text());

 		$('#weather-temp').text(Math.round(todayTemp* 1.8 + 32) + " F");
		$('#day1-temp').text(Math.round(day1Temp * 1.8 + 32) + " F");
		$('#day2-temp').text(Math.round(day2Temp * 1.8 + 32) + " F");
		$('#day3-temp').text(Math.round(day3Temp * 1.8 + 32) + " F");
		$('#day4-temp').text(Math.round(day4Temp * 1.8 + 32) + " F");

		console.log(todayTemp);
		console.log(day1Temp);
	}

	

	$('#local-weather').on('click', function(){
		localWeather();
	});

	$('#weatherByCity').on('click', function(){
		var cityName = $('#city-txt').val();
		passedUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName+"&units=metric&appid=4b0a422202ef26d4d9c9dcab245a2636";
		console.log(passedUrl);
		showWeather(passedUrl);
		hideCoordinates();		
	});

	$('#weatherByZip').on('click', function(){
		var zip = $('#zip-txt').val();
		passedUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=" + zip+ "&units=metric&appid=4b0a422202ef26d4d9c9dcab245a2636";
		showWeather(passedUrl);
		hideCoordinates();
	});

	$('#local-temp').on('click', function(){
		tempConversion();
	});

	day();


});