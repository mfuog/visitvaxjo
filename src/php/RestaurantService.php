<?php
require_once('lib/OAuth.php');

/**
 *
 * The RestaurantService class allows to request a collection of five
 * restaurants that are located in Växjö.
 * The data is retrieved querying the Yelp API.
 *
 * Code used is largely taken from 'Yelp API v2.0 php code samples'.
 * see: https://github.com/Yelp/yelp-api/blob/master/v2/php/sample.php
 */
class RestaurantService {

    const CONSUMER_KEY = 'Q0QGMfldYCSeZuhYDoH93g';
    const CONSUMER_SECRET = 'XENE2VfkrN3-i5wEx7rJvYs5OGs';
    const TOKEN = 'H4to16MA6AXjBtUTd829wf-b_C_B6wPR';
    const TOKEN_SECRET = 'LNM_jbuvIbuOGaA3sNkEMRZUph8';
    const API_HOST = 'api.yelp.com';
    const DEFAULT_TERM = 'dinner';
    const DEFAULT_LOCATION = 'Växjö';
    const SEARCH_LIMIT = 4;
    const SEARCH_PATH = '/v2/search/';

    public function __construct() {}

    //---------------------------------------------------
    //  Public methods
    //---------------------------------------------------
    /**
     * Queries the Search API by location
     *
     * @param    $location    The search location passed to the API
     * @return   The JSON response from the request
     */
    public function getRestaurants($limit) {
        $url_params = array();

        $url_params['location'] = self::DEFAULT_LOCATION;
        $url_params['limit'] = $limit?: self::SEARCH_LIMIT;
        $search_path = self::SEARCH_PATH . "?" . http_build_query($url_params);

        return $this->yelpRequest(self::API_HOST, $search_path);
    }

    //---------------------------------------------------
    //  Private methods
    //---------------------------------------------------
    /**
     * Makes a request to the Yelp API and returns the response
     *
     * @param    $host    The domain host of the API
     * @param    $path    The path of the APi after the domain
     * @return   The JSON response from the request
     */
    public function yelpRequest($host, $path) {
        $unsigned_url = "http://" . $host . $path;
        // Token object built using the OAuth library
        $token = new OAuthToken(self::TOKEN, self::TOKEN_SECRET);
        // Consumer object built using the OAuth library
        $consumer = new OAuthConsumer(self::CONSUMER_KEY, self::CONSUMER_SECRET);
        // Yelp uses HMAC SHA1 encoding
        $signature_method = new OAuthSignatureMethod_HMAC_SHA1();
        $oauthrequest = OAuthRequest::from_consumer_and_token(
                $consumer,
                $token,
                'GET',
                $unsigned_url
        );

        // Sign the request
        $oauthrequest->sign_request($signature_method, $consumer, $token);

        // Get the signed URL
        $signed_url = $oauthrequest->to_url();

        // Send Yelp API Call
        $ch = curl_init($signed_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        $data = curl_exec($ch);
        curl_close($ch);

        return $data;
    }

}

/**
 * Initialize an instance of the RestaurantService class, retrieve the
 * list of restaurants and return te response in JSON format.
 */
$service  = new RestaurantService();
$limit = isset($_GET['limit'])?$_GET['limit']: 4;
print_r($service->getRestaurants($limit));
