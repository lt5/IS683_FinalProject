


$(document).ready (function () {
				var  oSelectedCountry = {}
				, selectedCountryId = ""
				, selectedCountryName = "";

	var socket = io.connect('http://localhost:4000');
	socket.on('updatechart', function (selectedCountryData, data) {
		//$("#ChartContainer").html(data.country);
		console.log(selectedCountryData);


		    $('#ChartContainer').highcharts({
		        chart: {
		            events: {
		                redraw: function() {
		                    console.log('The chart was just redrawn');
		                }
		            }

		        },
		        title: {
	                text: data.country,
	                x: -20 //center
	            },
		        xAxis: {
		        	name: "Year",
		            categories: selectedCountryData.Labels
		        },

		        series: [{
		        	name: "Energy Comsumption",
		            data: selectedCountryData.Data
		        }]
		    });



	});

	$("#CountrySelector").change(function () {
		oSelectedCountry = $("#CountrySelector option:selected");
		selectedCountryId = oSelectedCountry.val();
		selectedCountryName = oSelectedCountry.text();

		objData = {id: selectedCountryId, country: selectedCountryName};
		socket.emit('selectCountry',objData);
		//console.log(selectedCountryId);
	});


});