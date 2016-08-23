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
			// Get new Auth0 lock object.  This may trigger 'authenticated' event if 
			// user has been authenticated and redirected back here.
			lock = new Auth0Lock('fFIlD3qHLFbEISojQKN3LAG4jY8O0mKy', 'tudooz.eu.auth0.com', {
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

			// Check if 'idToken' exists in local storage to indicate open session
			var idToken = localStorage.getItem('id_token');
			if(!idToken) {
				displayFront();
			}
			else {
				// Check token is still valid
				lock.getProfile(idToken, function(error, profile) {
					if (error) {
						displayFront();
					} 
					else {
						loadMain();
					}
				});
			}

			lock.on("authenticated", function(authResult) {
				lock.getProfile(authResult.idToken, function(error, profile) {
					if (error) {
						return;
					}
					localStorage.setItem('id_token', authResult.idToken);
					localStorage.setItem('profile', JSON.stringify(profile));
					loadMain();
				});
			});
		});
});

/**
 * displayFront
 * Used to display initial front screen.
 */
function displayFront() {
	$(".front").show();
	$(".login-button").click(function(){ lock.show() });
}

/**
 * 
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