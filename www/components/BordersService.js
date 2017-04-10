angular.module('BordersService', []).factory('Borders', function($q, $http){
	var borders;
	return {

		fetchFromServer: function()
        {
            return $q(function(resolve, reject)
            {
                $http.get("https://border-pass-server.herokuapp.com/" + "borders").then(function(response)
                {
                    borders = response.data;
                    resolve();
                },
                function(err)
                {
                    reject();
                });
            });
        },

        departureCountries: function()
        {
        	var from_countries = [];
        	angular.forEach(borders, function(value, key)
        	{
  				if (from_countries.indexOf(value.from_country) == -1)
  				{
  				from_countries.push(value.from_country);
  				}
			   });
			   return from_countries;
        },

        destinationsFrom: function(chosen_country_from)
        {
        	var to_countries = [];
        	angular.forEach(borders, function(value, key)
        	{
  				if ((to_countries.indexOf(value.to_country) == -1) && (value.from_country == chosen_country_from))
  				{
  				to_countries.push(value.to_country);
  				}
			});
			return to_countries;
        },

        crossingCities: function(chosen_country_from, chosen_country_to)
        {
        	var addresses = [];
        	angular.forEach(borders, function(value, key)
        	{
  				if ((addresses.indexOf(value.address) == -1) && (value.from_country == chosen_country_from) && (value.to_country == chosen_country_to))
  				{
  				addresses.push(value.address);
  				}
			});
			return addresses;
        },

        getFlagFrom: function(country)
        {
          var flagURL;
          angular.forEach(borders, function(value, key)
          {
            if (country == value.from_country)
            {
              flagURL = value.from_flag_url;
            }
          });
          return flagURL;
        }
	}

});
