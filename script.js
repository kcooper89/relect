$( document ).ready(function() {
    var appID = "efb5e623b9ca5cd9f18f919daefaa92f";

    $('form').submit(function(event) {
        event.preventDefault(); // preventing the browser from refreshing the page

        // get input value
        var city = event.target.city.value;

        // ajax request
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appID + '&units=imperial';

        $.ajax({
            method: 'get',
            url: url,
        })
            .then(function(json) {
                $("#city").html(json.name);
                $("#main_weather").html(json.weather[0].main);
                $("#description_weather").html(json.weather[0].description);
                $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
                $("#temperature").html(json.main.temp);
                $("#pressure").html(json.main.pressure);
                $("#humidity").html(json.main.humidity);
            });

        var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + appID + '&units=imperial';

        $.ajax({
            method: 'get',
            url: forecastUrl,
        }).then(function(response) {
            document.getElementById('forecast').innerHTML = ""; // removes old forecasts

            for (var i = 0; i < response.list.length; i += 8) {
                console.log(response.list[i]); // add the data to the html
                $('#forecast').append(`
                    <div class="col-xs-12 col-md-2 col-lg-3 form-group">
                        <div class="card forecast-item">
                            <div class="card-body">
                                <p>Date; ${response.list[i].main.dt_txt}</p>
                                <img src="http://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png" />
                                <p>Temp: ${response.list[i].main.temp}</p>
                                <p>Humidity: ${response.list[i].main.humidity}</p>
                                <p>Pressure: ${response.list[i].main.pressure}</p>
                                
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

    /*
    $(".query_btn").click(function(){
        var query_param = $(this).prev().val();

        if ($(this).prev().attr("placeholder") == "City") {
            var weather = "http://api.openweathermap.org/data/2.5/weather?q=" + query_param + "&APPID=efb5e623b9ca5cd9f18f919daefaa92f" + appID;
        }

        $.getJSON(weather,function(json){
            $("#city").html(json.name);
            $("#main_weather").html(json.weather[0].main);
            $("#description_weather").html(json.weather[0].description);
            $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
            $("#temperature").html(json.main.temp);
            $("#pressure").html(json.main.pressure);
            $("#humidity").html(json.main.humidity);
        });
    })*/
});