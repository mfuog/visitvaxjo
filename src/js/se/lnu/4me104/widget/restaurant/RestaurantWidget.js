/**
 *	Class that handles the site's restaurant finder widget.
 *	It is based on predefined DOM elements
 *	contained in the page's HTML structure.
 *
 *	@author		Myrtha Fuog <mf222rc@student.lnu.se>
 *	@copyright	Copyright (c) 2014.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	1.0.
 *	@since		2014-12-12
 */
function RestaurantWidget() {

	//---------------------------------------------------
	//	Private properties
	//---------------------------------------------------

	/**
	 *	Referes to the predefined DOM element that
	 *	encloses the widget.
	 *
	 *	@default {RestaurantWidgetResult}
	 */
	var _restaurantWrapper = document.getElementById("page-restaurant-result-wrapper");

	//---------------------------------------------------
	//	Private methods
	//---------------------------------------------------

	/**
	 *	This method serves as a constructor and activates 
	 *	all components to be activated during class 
	 *	initialization.
	 *
	 *	@return {undefined}
	 */
	function init() {
		initSubmit();
	}

	/**
	 *	Enables element used to submit search request.
	 *
	 *	@return {undefined}
	 */
	function initSubmit() {
		var element = document.getElementById("restaurant-submit-btn");
		google.maps.event.addDomListener(element, "click", onSubmitClick);
	}

	/**
	 *	This mode is activated when the search button is
	 *	activated.
	 *
	 *	@param	{event}	The event that triggered this method.
	 *
	 *	@return {undefined}
	 */
	function onSubmitClick(event) {
		event.preventDefault(); //do not send the form data
		removeResults();
		searchResults();
	}

	/**
	 *	This method removes the previous results from the
	 *	DOM structure.
	 *
	 *	@return {undefined}
	 */
	function removeResults() {
		_restaurantWrapper.innerHTML = "";
	}

	/**
	 *	This method retrieves hotel-information from the
	 *	local proxy. For more information see
	 *	HotelService.php (src/php). The method uses
	 *	jQuery to perform the AJAX call, just like any
	 *	other widget.
	 *
	 *	@return {undefined}
	 */
	function searchResults() {
		$.get("src/php/RestaurantService.php", onServiceCallComplete);
	}

	/**
	 *	This method is activated when the information
	 *	is derived from the proxy. The information is
	 *	converted from a string to a JSON object
	 *
	 *	@param	{String}	The result data.
	 *
	 *	@return {undefined}
	 */
	function onServiceCallComplete(data) {
		data = JSON.parse(data);
		businesses = data.businesses;
		for (var i = 0; i < businesses.length; i++) {
			restaurant = new RestaurantWidgetResult(
					businesses[i].name,
					businesses[i].rating_img_url,
					businesses[i].url,
					businesses[i].image_url);
			_restaurantWrapper.appendChild(restaurant.element);
		}
		createRemoveButton();
	}

	function createRemoveButton() {
		button = document.createElement("button");
		button.innerHTML = "Remove results";
		google.maps.event.addDomListener(button, "click", function(event){
			_restaurantWrapper.remove(false);
		});
		_restaurantWrapper.appendChild(button);
	}

	init();
}