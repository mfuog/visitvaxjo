/**
 *	A RestaurantWidgetResult is a graphical representation
 *	(a div element) of one restaurant-object.
 *
 *	@author		Myrtha Fuog <mf222rc@student.lnu.se>
 *	@copyright	Copyright (c) 2014.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	1.0.
 *	@since		2013-12-12
 */
function RestaurantWidgetResult(name, ratingImgUrl, url, imgUrl) {

	//---------------------------------------------------
	//	Public properties
	//---------------------------------------------------

	/**
	 *	Public reference to reference the object instance.
	 *
	 *	@default {null}
	 */
	this.element = null;

	//---------------------------------------------------
	//	Private properties
	//---------------------------------------------------

	/**
 	 *	Private reference to reference the object instance.
	 *
	 *	@default {null}
	 */
	var _this = this;

	//---------------------------------------------------
	//	Private methods
	//---------------------------------------------------

	/**
	 *	This method serves as a constructor.
	 *
	 *	@return {undefined}
	 */
	function init() {
		initElement();
		initName();
		initRating();
		initPic();
	}

	/**
	 *	This method creates the element which encloses the 
	 *	forecast instance. 
	 *
	 *	@TODO: The element type and name should 
	 *	be standardized through private constants
	 *
	 *	@return {undefined}
	 */
	function initElement() {
		_this.element = document.createElement("div");
		_this.element.setAttribute("class", "restaurant service-element");
	}

	function initName() {
		_elmTitle = document.createElement("h4");
		_elmTitle.innerHTML = name;
		_this.element.appendChild(_elmTitle);
	}

	/**
	 *	This method creates icons for the forecast.
	 *
	 *	@return {undefined}
	 */
	function initRating() {
		_elmIcon = document.createElement("img");
		_elmIcon.setAttribute("src", ratingImgUrl);
		_this.element.appendChild(_elmIcon);
	}

	function initPic() {
		_elmImg = document.createElement("img");
		_elmImg.setAttribute("src", imgUrl);
		_a = document.createElement("a");
		_a.setAttribute("href", url);
		_a.appendChild(_elmImg);
		_this.element.appendChild(_a);
	}

	init();
}