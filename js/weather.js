var weekday = ['SU','MO','TU','WE','TH','FR','SA'];
d= new Date();
var measurement = 'cel';
$measurement = 'cel';
$(document).ready(function(){
$measurement = 'cel';
getLocation();
  
 $('#switch').click(function(){
 changeDeg();
 });


 /// 
});


function setIcon(status){
 
  switch(status){
    case 'Rain': $('#icon').append('<i class="wi wi-rain-mix"></i>');
$('body').css('background-image','url("http://pexels.imgix.net/photos/1551/field-thunderstorm-rainy-meadow.jpg?fit=crop&w=1600&h=853")'); 
     break;
          case 'Drizzle': $('#icon').append('<i class="wi wi-rain-mix"></i>');
$('body').css('background-image','url("http://pexels.imgix.net/photos/1551/field-thunderstorm-rainy-meadow.jpg?fit=crop&w=1600&h=853")'); 
     break;
    case 'Clear':$('#icon').append('<i class="wi wi-day-sunny"></i>');
           $('body').css('background-image','url("http://pexels.imgix.net/photos/3032/summer-ray-of-sunshine-bikes-bicycles.jpg?fit=crop&w=1600&h=853")')
    break;
    case 'Clouds':$('#icon').append('<i class="wi wi-cloudy"></i>');
           $('body').css('background-image','url("http://pexels.imgix.net/photos/2083/city-clouds-cloudy-ray-of-sunshine.jpg?fit=crop&w=1600&h=853")')
    break;
         case 'Thunderstorm':$('#icon').append('<i class="wi wi-storm-showers"></i>');
           $('body').css('background-image','url("http://pexels.imgix.net/photos/2271/clouds-cloudy-field-meadow.jpg?fit=crop&w=1600&h=853")')
    break;  
               case 'Snow':$('#icon').append('<i class="wi wi-snow"></i>');
           $('body').css('background-image','url("http://pexels.imgix.net/photos/2377/snow-black-and-white-street-winter.jpg?fit=crop&w=1600&h=853")')
    break;  
                     case 'Mist':$('#icon').append('<i class="wi wi-fog"></i>');
           $('body').css('background-image','url("http://pexels.imgix.net/photos/5230/road-fog-foggy-mist.jpg?fit=crop&w=1600&h=853")')
    break;  
                          case 'Fog':$('#icon').append('<i class="wi wi-fog"></i>');
           $('body').css('background-image','url("http://pexels.imgix.net/photos/5230/road-fog-foggy-mist.jpg?fit=crop&w=1600&h=853")')
    break;  
                           case 'Haze':$('#icon').append('<i class="wi wi-smoke"></i>');
           $('body').css('background-image','url("http://pexels.imgix.net/photos/5281/city-sky-skyline-australia.jpg?fit=crop&w=1600&h=853")')
    break;  
  }
}

function setCurrent(city){
   $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=5ffdbfa1c66bc24fc33a167761edd1e2',
    method: 'GET',
    data: {},
    dataType: 'json',
    success: function(data){
       setGradient(data.main.temp);
      $('#city').empty();
       $('#city').append(city.substring(0,city.indexOf(',')));
       $('#temp').empty();
      if ($('#icon').is(':empty')){
      setIcon(data.weather[0].main);}
      if ($('#temp').is(':empty')){
      $('#temp').append(inCel(data.main.temp));}
      if ($('#switch').is(':empty')){
        $('#switch').append('<button id="toggleDeg" class="btn btn-default">Switch to °F</button>')}
    }
  });
  
}

function setForecast(city, reason){
     $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+',de&mode=json&appid=5ffdbfa1c66bc24fc33a167761edd1e2',
    method: 'GET',
    data: {},
    dataType: 'json',
    success: function (data){
    $('#forecast').empty();    	
      var dayCounter= d.getDay();
  for (i=0;i<=4;i++){
    if (dayCounter >= weekday.length-1){
      dayCounter = 0
    }
    else {dayCounter+=1}
if (data.list[i].weather[0].main !== '' && reason !== 'refresh'){

$('#weekdays').append(weekday[dayCounter]+'<br/>');    $('.icons').append(getIcon(data.list[i].weather[0].main)+'<br/>');}
$('#forecast').append(inCel(data.list[i].temp.max)+"<br/>");

  
  }
}
  });
}

function inCel(value, reason){
  if ($measurement === 'cel')
  {return Math.round(value - 273.15)+' °C';}
  else {return Math.round((value - 273.15)* 1.8000 + 32.00)+' °F';}
}

function getIcon(weather){
  switch(weather){
    case 'Rain': return '<i class="wi wi-rain-mix"></i>';
    case 'Drizzle': return '<i class="wi wi-rain-mix"></i>';
    case 'Clouds': return '<i class="wi wi-cloudy"></i>';
    case 'Clear': return '<i class="wi wi-day-sunny"></i>';
    case 'Thunderstorm': return '<i class="wi wi-storm-showers"></i>';
    case 'Snow': return '<i class="wi wi-snow"></i>';
          case 'Haze': return '<i class="wi wi-smoke"></i>';
          case 'Fog': return '<i class="wi wi-fog"></i>';
          case 'Mist': return '<i class="wi wi-fog"></i>';
    default: return '<i class="wi wi-time-1"></i>';
  }
}
function getLocation(){


  $.ajax({
    url:'http://ip-api.com/json',
    method:'GET',
    data:{},
    dataType:'json',
    success: function(data){
    $city = data.city+','+data.countryCode;

    setCurrent($city);
    setForecast($city);
    ;
    }
    
    ,
    error: function(err){
    console.log(err)
  }
   
  });
}

function setGradient(value){
  $('.container-fluid').css('background','linear-gradient(rgba('+Math.round(value-263 )*8 +','+ Math.round(value-263)*2+','+(45-Math.round(value-263))*7+',0.6), rgba('+Math.round(value-263)*8+','+ Math.round(value-263)*5 +',200,0.6))');
    $('.container-fluid').css('background','-webkit-linear-gradient(rgba('+Math.round(value-263)*8+','+ Math.round(value-263)*2+','+(45-Math.round(value-263))*6+',0.6), rgba('+Math.round(value-263)*5+','+ Math.round(value-263)*4+',200,0.6))');
      $('.container-fluid').css('background','-moz-linear-gradient(rgba('+Math.round(value-263)*8+','+ Math.round(value-263)*2+','+(45-Math.round(value-263))*6+',0.6), rgba('+Math.round(value-263)*5+','+ Math.round(value-263)*8+',200,0.6))');
      $('.container-fluid').css('background','-o-linear-gradient(rgba('+Math.round(value-263)*8+','+ Math.round(value-263)*2+','+(45-Math.round(value-263))*6+',0.6), rgba('+Math.round(value-263)*5+','+ Math.round(value-263)*8+',200,0.6))');
}

function changeDeg(){
  
   $('#switch').empty();
  if ($measurement === 'cel') {
  $('#switch').append('<button id="toggleDeg" class="btn btn-default">Switch to °C</button>');
  
  
 
  setForecast($city,'refresh')
  setCurrent($city)

  $measurement='far';
  }
  else {
    $('#switch').append('<button id="toggleDeg" class="btn btn-default">Switch to °F</button>');
  
 
  
  setCurrent($city)  
  setForecast($city,'refresh')
  $measurement='cel';}  
  }
 

$('#search').autocomplete({
  source: function (request, response) {
$.getJSON(	"http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+request.term,
			function (data) {
    if (data[0] ===''){response(close())}
  else{
    response(data)}
    }
		 );
},
  minLength: 3,
  appendTo: '#searchbox',
  delay:250,
  select: function (x,y){
    getCityDetails(y.item.value);
  }});

function getCityDetails(citycomp){
 
  $.ajax({
    url: 'http://gd.geobytes.com/GetCityDetails?callback=?&fqcn='+citycomp,
    dataType: 'json',
    success:function(data){

    $city = data.geobytescity+','+data.geobytesinternet+','+data.geobytesregionlocationcode.substring(2,5);
    $('#icon').empty();
      
   setCurrent($city);
      $('.icons').empty();
          $('#weekdays').empty();
   setForecast($city);
  }
});
}