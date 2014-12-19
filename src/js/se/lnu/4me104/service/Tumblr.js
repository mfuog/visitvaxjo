//-------------------------------------------------------
//  Public class
//-------------------------------------------------------

/**
 *  A JavaScript-based interface (class) to communicate
 *  with Tumblr's API.
 *
 *  @author     Myrtha Fuog <mf222rc@student.lnu.se>
 *  @copyright  Copyright (c) 2014.
 *  @license    Creative Commons (BY-NC-SA)
 *  @version    1.0.
 *  @since      2013-12-12
 */
function Tumblr(APIKey) {

	//---------------------------------------------------
	//  Private properties
	//---------------------------------------------------
	
	/**
	 *	API key to gain access to Tumblr's API. The
	 *	object uses a standard key if no value is 
	 *	specified at instantiation. Every Tumblr
	 *	API-based application needs its own API key.
	 *
	 *	@default {String} "18KwhEK9upy8TqldWzTn6WnObXUWDFnJm7BWkPwXMjh47In0Pv"
	 */
	var _APIKey = APIKey || "18KwhEK9upy8TqldWzTn6WnObXUWDFnJm7BWkPwXMjh47In0Pv";

	//---------------------------------------------------
	//  Public static methods
	//---------------------------------------------------

	/**
	 *	Search for posts by tags in Tumblr's database.
	 *
	 *	@param	{Object}	Search arguments.
	 *	@param	{Function}	Callback function.
	 *
	 *	@return {undefined}
	 */
	Tumblr.prototype.tagSearch = function(arguments, callback) {
		var query = buildQueryString("tagged", arguments);
		$.getJSON(query, function(responseData) {
			callback(responseData);
		});
	};

	/**
	 *	Return 10 posts from Tumblr's database
	 *	that were tagged 'växjö'.
	 *
	 *	@param	{Function}	Callback function.
	 *
	 *	@return {undefined}
	 */
	Tumblr.prototype.recommendedPosts = function(callback) {
		var query = buildQueryString("tagged", { "tag": "växjö", "limit": 10 });
		$.ajax({
			url: query,
			dataType: "jsonp",
			jsonp: "jsonp",
			success: function(responseData){
				callback(responseData.response);
			}
		});
	};

	//---------------------------------------------------
	//  Private methods
	//---------------------------------------------------

	/**
	 *	This method compiles an API string to communicate 
	 *	with Tumblr's REST API.
	 *
	 *	@param	{String}	String identifying the API method to be used.
	 *	@param	{Object}	Call parameters.
	 *
	 *	@return {String}
	 */
	function buildQueryString(method, arguments) {
		var URL  = "http://api.tumblr.com/v2/"+method+"?";
		for (var property in arguments) {
			URL += "&"+property+"="+arguments[property];
		}
		URL += "&api_key="+_APIKey;
		return URL;
	}
}
