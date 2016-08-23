define(["react", "jsx!/views/all-lists"], function(React, AllLists) {
	var me = {

		/** addTask
		 *  POSTs new task of given title to server, along with user's profile ID.
		 */
		addTask: function(id, category, type, title) {
			var user = JSON.parse(localStorage.getItem("profile")).user_id;
			if(!title || !user) return;
			$.post("/tasks", {id: id, category: category, type: type, title: title, user: user});
		},

		updateTaskTitle: function(id, title) {
			$.post("/tasks/"+id, {title: title});
		},
		
		updateTaskType: function(id, type, callback) {
			$.post("/tasks/"+id, {type: type}, callback);
		},

		/**
		 * completeTask
		 * Mark task as completed in database.
		 */
		completeTask: function(id) {
			$.post("/tasks/"+id, {complete: true});
		},

		/**
		 * reloadAllLists
		 * Reload all displayed todo lists. Useful for when multiple lists are affected by data changes.
		 */
		reloadAllLists: function() {
			/// TODO: LAZY: Trigger reload of all lists via global event
			$(document).trigger("tudooz.reloadlists");
		},

		/** 
		 * logout
		 * Logs the user out of current session and directs them back to front screen.
		 */
		logout: function() {
			// Remove auth0 ID token from browser cached storage
			localStorage.removeItem("id_token");
			// Redirect to front
			window.location.href = "https://tudooz.eu.auth0.com/v2/logout?returnTo="+window.location.origin+"&client_id=fFIlD3qHLFbEISojQKN3LAG4jY8O0mKy";
		},

		/**
		 * getTasks
		 * Retrieve list of open/incomplete tasks from server.
		 */
		getOpenTasks: function(category, type, callback) {
			$.get(
				"/tasks?category="+category+
						"&type="+type+
						"&user="+JSON.parse(localStorage.getItem("profile")).user_id+
						"&complete=false",
				function(data){
					callback(data);
				}
			);
		}
	}
	return me;
});