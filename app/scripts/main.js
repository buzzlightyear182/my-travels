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
    for (var i=2008; i <=2015; i++){
      getEventsOf(i);
    }
  });

  $('.year_button').click(function(){
    removeColors();
    var year = event.target.textContent;
    getEventsOf(year);
  });

  $('.event').click(function(){
    event.target.setAttribute('data-toggle', 'modal');
    event.target.setAttribute('data-target', '#modal_details');
    removeOnModal();

    var month = event.target.parentElement.previousElementSibling.textContent;
    var day = event.target.textContent;

    getTrips(month,day);
  });

  function getTrips(month, day){
    $.getJSON('../scripts/trips.json', function(data){
      var trip = data.trips[month][day];
      if (trip.length > 1) {
        showAllDayEvents(trip, month, day);
      }
      else {
        showOnModal(trip, month, day);
      }
    })
    .done(function(data) {
      console.log('Loaded!');
    })
    .fail(function() {
      console.log('Error: Failed to get JSON Data');
    })
  }

  function showAllDayEvents(trip, month, day){
    for (i = 0; i < trip.length; i++){
      showOnModal(trip[i], month, day)
    }
  }

  function showOnModal(trip, month, day){
    var location = trip.place + ", " + trip.country
    var date = month + " " + day +  ", " + trip.year

    $('.modal-header').append('<h4 class="modal-title">' + location + '</h4><p class="modal-title">' + date + '</h4><hr>');
  }

  function removeOnModal(){
    $('.modal-title').remove();
    $('.modal-header hr').remove();
  }

  function getEventsOf(year){
    var events_year = '.year_'+year;
    var events_array = document.querySelectorAll(events_year);

    getColorPerEvent(events_array, year);
  }

  function getColorPerEvent(events_array, year) {
     for(var i=0; i < events_array.length; i++){
      var month = events_array[i].parentElement.previousElementSibling.textContent;
      var shade = year_shades[year];

      var color_shaded = month_colors[month] + shade;
      events_array[i].classList.add(color_shaded);
    }
  }

  function removeColors(){
    var all_events = document.querySelectorAll('.event');
    for(var i=0; i < all_events.length; i++){
      removeUnnecessaryClasses(all_events[i]);
    }
  }

  function removeUnnecessaryClasses(event){
    if (event.classList.length === 4){
      for (var i=0; i < event.classList.length; i++){
        var last_class = event.classList[3];
        event.classList.remove(last_class);
        event.removeAttribute('data-toggle', 'modal');
        event.removeAttribute('data-target', '#modal_details');
      }
    }
  }

});
