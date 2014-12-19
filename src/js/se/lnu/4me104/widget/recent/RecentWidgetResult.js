/**
 *	This is a dynamic class used to represent a recent Tumblr post.
 *
 *	@author		Myrtha Fuog <mf222rc@student.lnu.se>
 *	@copyright	Copyright (c) 2014.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	1.0.
 *	@since		2014-12-12
 */
function RecentWidgetResult(post) {

	//---------------------------------------------------
	//	Public properties
	//---------------------------------------------------

	/**
	 *	Public property that contains a reference to the
	 *	object's graphical representation. The graphical
	 *	representation consists of an ordinary DOM
	 *	elements (DIV).
	 *
	 *	@default {null}
	 */
	this.element = null;

	//---------------------------------------------------
	//	Private properties
	//---------------------------------------------------

	/**
	 *
 	 *	Private reference used to reference the object
 	 *	instance when the internal scope ine is available.
 	 *	For example, this property can be used to access
 	 *	the public properties and methods from private
 	 *	class methods.
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
		initLogo();
		initTitle();
		initLink();
	}

	/**
	 *	This method creates the element which encloses the
	 *	post instance.
	 *
	 *	@return {undefined}
	 */
	function initElement() {
		_this.element = document.createElement("div");
		_this.element.setAttribute("class", "recent-element");
	}

	/**
	 *	This method creates an image element that contains the tumbr logo.
	 *
	 *	@return {undefined}
	 */
	function initLogo() {
		_logo = document.createElement("img");
		logoUrl = "http://localhost/lnu/visitvaxjo/src/img/tumblr_logo.png";
		_logo.setAttribute("src", logoUrl);
		_this.element.appendChild(_logo);
	}

	/**
	 *	This method creates the title line for the post.
	 *	It contains the post's date, the blog name and the caption,
	 *	if any is given.
	 *
	 *	@return {undefined}
	 */
	function initTitle() {

		_date = document.createElement("i");
		_date.innerHTML = post.date.slice(0, 10);
		_this.element.appendChild(_date);

		_elmTitle = document.createElement("b");
		_elmTitle.innerHTML = " by " + post.blog_name + ": ";

		if(post.caption){
			_elmTitle.innerHTML += post.caption;
		}
		_this.element.appendChild(_elmTitle);
	}

	/**
	 *	This method creates a link to the original post on Tumbler.
	 *
	 *	@return {undefined}
	 */
	function initLink() {
		_a = document.createElement("a");
		_a.innerHTML = "read on Tumblr";
		_a.setAttribute("target", "_blank");
		_a.setAttribute("href", post.post_url);
		_this.element.appendChild(_a);
	}
	init();
}