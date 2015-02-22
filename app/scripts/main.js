$(document).ready(function() {
  $.material.init();

  var month_colors = {
    January: 'btn-material-red',
    February: 'btn-material-deep-orange',
    March: 'btn-material-amber',
    April: 'btn-material-yellow',
    May: 'btn-material-lime',
    June: 'btn-material-green',
    July: 'btn-material-teal',
    August: 'btn-material-blue',
    September: 'btn-material-indigo',
    October: 'btn-material-deep-purple',
    November: 'btn-material-purple',
    December: 'btn-material-pink',
  };

  var year_shades = {
    '2008': '-800',
    '2009': '-700',
    '2010': '-600',
    '2011': '-500',
    '2012': '-400',
    '2013': '-300',
    '2014': '-200',
    '2015': '-100'
  };

  $('#show_all').click(function(){
    removeColors();
    for (var i = 2008; i <= 2015; i++){
      getTripsOf(i);
    }
  });

  $('.year_button').click(function(){
    removeColors();
    var year = event.target.textContent;
    getTripsOf(year);
  });

  $('.row .btn-group .btn').click(function(){
    // console.log("Clicked!")
    event.target.setAttribute('data-toggle', 'modal');
    event.target.setAttribute('data-target', '#modal_details');
    removeOnModal();

    var date = {'month': event.target.parentElement.previousElementSibling.textContent, 'day': event.target.textContent, 'year': ""}

    getTripDetailsOf(date);
  });

  function getTripDetailsOf(date){
    $.getJSON('../scripts/better_trips.json', function(data){
      for (var year = 2008; year <= 2015; year++){
        if (data.trips[year][date.month]) {
          date.year = year;
          getDayTrips(data.trips[year][date.month], date);
        }
      }
    })
  }

  function getDayTrips(tripsInMonth, date){
    if (tripsInMonth[date.day]){
      showOnModal(tripsInMonth[date.day], date);
    }
  }

  function showOnModal(trip, date){
    var location = trip.place + ", " + trip.country
    var formatted_date = date.month + " " + date.day + ", " + date.year

    $('.modal-header').append('<h4 class="modal-title">' + location + '</h4><p class="modal-title">' + formatted_date + '</h4><hr>');
  }

  function getTripsOf(year){
    $.getJSON('../scripts/better_trips.json', function(data){
      var tripsYear = data.trips[year];
      var monthList = Object.keys(tripsYear);

      for (var i = 0; i < monthList.length; i++){
        var month = monthList[i];
        addColors(tripsYear[month], month, year);
      }
    })
  }

  function addColors(tripsInMonth, monthName, year){
    var monthColor = month_colors[monthName];
    var shade = year_shades[year];

    var dayList = Object.keys(tripsInMonth);
    var daysOfTheMonth = document.querySelector('.' + monthColor).nextElementSibling.children;

    for (var i = 0; i < dayList.length; i++){
      var day = dayList[i];
      daysOfTheMonth[day-1].classList.add(monthColor + shade);
      daysOfTheMonth[day-1].classList.add("trip");
    }
  }

  function removeColors(){
    var coloredDate = document.querySelectorAll('.trip');

    for(var i = 0; i < coloredDate.length; i++){
      var classCount = coloredDate[i].classList.length;

      while (classCount > 0) {
        var last_class = coloredDate[i].classList[classCount];
        coloredDate[i].classList.remove(last_class);
        classCount = classCount - 1;
      }
    }
  }

  function removeOnModal(){
    $('.modal-title').remove();
    $('.modal-header hr').remove();
  }

});
