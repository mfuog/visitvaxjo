/**
 *	Class that handles the site's recent post widget. The
 *	widget is based on predefined DOM elements 
 *	contained in the page's HTML structure.
 *
 *	@author		Myrtha Fuog <mf222rc@student.lnu.se>
 *	@copyright	Copyright (c) 2014.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	1.0.
 *	@since		2014-12-12
 */
function RecentWidget() {

	//---------------------------------------------------
	//	Private properties
	//---------------------------------------------------

	/**
	 *	Referns to the predefined DOM element that 
	 *	encloses the widget.
	 *
	 *	@default {RecentWidgetResult}
	 */
	var _recentWrapper = document.getElementById("page-right-recent-wrapper");

	/**
	 *	Reference to a JavaScript-based interface for the
	 *	Tumblr's API.
	 *
	 *	@default {Tumblr}
	 */
	var _tumblr = new Tumblr();

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
		_tumblr.recommendedPosts(onServiceCallComplete);
		initNext();
	}

	/**
	 *	Enables element used to trigger requesting another post.
	 *
	 *	@return {undefined}
	 */
	function initNext() {
		var element = document.getElementById("recent-btn");
		google.maps.event.addDomListener(element, "click", onNextClick);
	}

	/**
	 *	This mode is activated when the search button to request
	 *	is another post activated.
	 *
	 *	@param	{event}	The event that triggered this method.
	 *
	 *	@return {undefined}
	 */
	function onNextClick(event) {
		event.preventDefault(); //do not send the form data
		_tumblr.recommendedPosts(onServiceCallComplete);
	}

	/**
	 *	This method removes the previous results from the
	 *	DOM structure.
	 *
	 *	@return {undefined}
	 */
	function removePost() {
		$('.recent-element').remove();
	}

	function onServiceCallComplete(data) {
		postsCount = data.length;
		random = Math.floor(Math.random() * postsCount-1) + 0;
		randomPost = data[random];

		// avoid adding the same post twice
		if($('#tumblr_' + data.id).length >= 1 ){

			_tumblr.recommendedPosts(onServiceCallComplete);
		}else{
			var post = new RecentWidgetResult(randomPost);
			_recentWrapper.appendChild(post.element);
		}

	}

	init();
}