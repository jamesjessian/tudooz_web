require.config({
	baseUrl: "js",
  jsx: {
    fileExtension: '.jsx',
    harmony: true,
    stripTypes: true
  },
  paths: {
	  	"react":"vendor/react-with-addons",
		"text": "vendor/text",
		"JSXTransformer": "vendor/JSXTransformer",
		"jsx": "vendor/jsx",
		"jquery": "vendor/jquery.min",
		"auth0lock":"vendor/lock.min"
  }
});

require(["jquery"], function($) {
		window.lock = null;
		// When page has loaded...
		$(document).ready(function() {
			// Initialise Auth0
			var auth0 = new Auth0({
				domain:       'tudooz.eu.auth0.com',
				clientID:     'fFIlD3qHLFbEISojQKN3LAG4jY8O0mKy',
				responseType: 'token'
			});

			// Check if we have just received callback token after authentication
			// OR 'idToken' exists in local storage to indicate open session
			var idToken = null;
			var result = auth0.parseHash(window.location.hash);
			if (result && result.idToken)
				idToken = result.idToken;
			else
				idToken = localStorage.getItem('id_token');

			if (idToken) {
				// Check token is still valid
				auth0.getProfile(idToken, function(error, profile) {
					if (error)
						displayFront();
					else {
						localStorage.setItem('id_token', idToken);
						localStorage.setItem('profile', JSON.stringify(profile));
						loadMain();
					}
				});
			} else if (result && result.error) {
				console.error('Error at login: ' + result.error)
				displayFront();
			} else {
				displayFront();
			}
		});
});

/**
 * displayFront
 * Used to display initial front screen.
 */
function displayFront() {

	// Get new Auth0 lock object.  This may trigger 'authenticated' event if 
	// user has been authenticated and redirected back here.
	var lock = new Auth0Lock('fFIlD3qHLFbEISojQKN3LAG4jY8O0mKy', 'tudooz.eu.auth0.com', {
			auth: { 
					params: { scope: 'openid email' } //Details: https:///scopes
			},
			allowedConnections: ['facebook', 'twitter'],
			socialButtonStyle: 'big',
			languageDictionary: {
				title: ""
			},
			rememberLastLogin: true,
			theme: {
				logo: 'img/logo.png'
			}  
	});
	$(".front").show();
	$(".login-button").click(function(){ lock.show() });
}

/**
 * loadMain
 *  Render main todo lists screen
 */
function loadMain() {
	require(["react", "jsx!/views/all-lists"], function(React, AllLists) {
		
		var allListsF = React.createFactory(AllLists);
		React.render(
			allListsF(),
			document.getElementById('content')
		);
	});
}