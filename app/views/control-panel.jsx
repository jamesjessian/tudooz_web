/** @name control-panel.jsx
	@desc React component. Control panel, overlays whole screen to contain global controls (logout etc.)
	@css control-panel.css
*/
define(["react", "utils"], function (React, Utils) {
	var ControlPanel = React.createClass({
		clickPanel: function(){
			React.unmountComponentAtNode(document.getElementById('overlay'));
		},
		clickLogout: function() {
			// Logout user
			Utils.logout();
			// Close panel
			React.unmountComponentAtNode(document.getElementById('overlay'));
		},
		render: function () {
			return (
				<div className="control-panel" onClick={this.clickPanel}>
					<div className="bigbutton" onClick={this.clickLogout}>Logout</div>
				</div>
			);
		}
	});
	return ControlPanel;
});