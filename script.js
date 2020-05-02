$( document ).ready(function() {
    var appID = "efb5e623b9ca5cd9f18f919daefaa92f";
    
    $('form').submit(function(event) {
        event.preventDefault(); // preventing the browser from refreshing the page

        // get input value
        var city = event.target.city.value;

        // ajax request
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appID + '&units=imperial';

        $.ajax({
            method: 'get',
            url: url,
        })
            .then(function(json) {
            
                var UVurl = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + appID + '&lat=' + json.coord.lat + '&lon=' + json.coord.lon;
                $.ajax({
                    method: 'get',
                    url: UVurl,
                }).then(function(data) {
                    var uvIndex = data.value;
                    /// add the uv index to the html
                    $("#UVindex").html(uvIndex);
                    if (uvIndex < 3) {
                        $('#UVindex').addClass('alert alert-success');
                        $('#UVindex').removeClass('alert-warning');
                        $('#UVindex').removeClass('alert alert-danger');
                    } else if (uvIndex < 7) {
                        $('#UVindex').addClass('alert alert-warning');
                        $('#UVindex').removeClass('alert-success');
                        $('#UVindex').removeClass('alert alert-danger');
                    } else {
                        $('#UVindex').addClass('alert alert-danger');
                        $('#UVindex').removeClass('alert-success');
                        $('#UVindex').removeClass('alert alert-warning');
                    }
                });

                $("#city").html(json.name);
                $("#main_weather").html(json.weather[0].main);
                $("#description_weather").html(json.weather[0].description);
                $("#weather_image").attr("src", "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
                $("#temperature").html(json.main.temp);
                $("#pressure").html(json.main.pressure);
                $("#humidity").html(json.main.humidity);
            });

        var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + appID + '&units=imperial';

        var weekdays = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',

        ];

        $.ajax({
            method: 'get',
            url: forecastUrl,
        }).then(function(response) {
            document.getElementById('forecast').innerHTML = ""; 

            for (var i = 0; i < response.list.length; i += 8) {
                
                $('#forecast').append(`
                    <div class="col-xs-12 col-md-6 col-lg-4 form-5-day form-group">
                        <div class="card forecast-item">
                            <div class="card-body">
                            
                                <p>Day: ${weekdays[moment(response.list[i].dt_txt).day()]}</p>
                                <img src="https://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png" />
                                <p>Temp: ${response.list[i].main.temp}</p>
                                <p>Humidity: ${response.list[i].main.humidity}</p>
                                
                                
                            </div>
                        </div>
                    </div>
                    

                
                `);
            }
        });
    });
    

    $('.city-buttons').click(function(event) {
        $('input[name="city"]').val(event.target.value);
        $('form').submit();
    });

});