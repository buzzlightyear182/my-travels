"use strict";$(document).ready(function(){function a(a){$.getJSON("../scripts/better_trips.json",function(c){for(var d=Object.keys(c.trips[a]),e=0;e<d.length;e++){var f=d[e];b(c.trips[a][f],f,a)}})}function b(a,b,c){for(var d=h[b],e=i[c],f=Object.keys(a),g=document.querySelector("."+d).nextElementSibling.children,j=0;j<f.length;j++){var k=f[j];g[k-1].classList.add(d+e),g[k-1].classList.add("trip")}}function c(a){$.getJSON("../scripts/better_trips.json",function(b){for(var c=2008;2015>=c;c++)void 0!=b.trips[c][a.month]&&(a.year=c,d(b.trips[c][a.month],a))})}function d(a,b){a[b.day]&&e(a[b.day],b)}function e(a,b){var c=a.place+", "+a.country,d=b.month+" "+b.day+", "+b.year;$(".modal-header").append('<h4 class="modal-title">'+c+'</h4><p class="modal-title">'+d+"</h4><hr>")}function f(){for(var a=document.querySelectorAll(".trip"),b=0;b<a.length;b++)for(var c=a[b].classList.length;c>0;){var d=a[b].classList[c];a[b].classList.remove(d),c-=1}}function g(){$(".modal-title").remove(),$(".modal-header hr").remove()}$.material.init();var h={January:"btn-material-red",February:"btn-material-deep-orange",March:"btn-material-amber",April:"btn-material-yellow",May:"btn-material-lime",June:"btn-material-green",July:"btn-material-teal",August:"btn-material-blue",September:"btn-material-indigo",October:"btn-material-deep-purple",November:"btn-material-purple",December:"btn-material-pink"},i={2008:"-800",2009:"-700",2010:"-600",2011:"-500",2012:"-400",2013:"-300",2014:"-200",2015:"-100"};$("#show_all").click(function(){f();for(var b=2008;2015>=b;b++)a(b)}),$(".year_button").click(function(){f();var b=event.target.textContent;a(b)}),$(".month_button").click(function(a){f();var c=a.target.textContent;$.getJSON("../scripts/better_trips.json",function(a){for(var d=2008;2015>=d;d++)void 0!=a.trips[d][c]&&b(a.trips[d][c],c,d)})}),$(".row .btn-group .btn").click(function(){event.target.setAttribute("data-toggle","modal"),event.target.setAttribute("data-target","#modal_details"),g();var a={month:event.target.parentElement.previousElementSibling.textContent,day:event.target.textContent,year:""};c(a)})});