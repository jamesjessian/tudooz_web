define(["react", "utils"], function (React, Utils) {
	var ReschedulePanel = React.createClass({
		clickPanel: function(){
			React.unmountComponentAtNode(document.getElementById('overlay'));
		},
		rescheduleNow: function() {
			Utils.updateTaskType(this.props.task, "now", Utils.reloadAllLists);
		},
		rescheduleSoon: function() {
			Utils.updateTaskType(this.props.task, "soon", Utils.reloadAllLists);
		},
		rescheduleSomeday: function() {
			Utils.updateTaskType(this.props.task, "someday", Utils.reloadAllLists);
		},
		render: function () {
			return (
				<div className="reschedule-panel" onClick={this.clickPanel}>
					<span className="title">When shall we do this?</span>
					<br/>
					<div className="bigbutton" onClick={this.rescheduleNow}>Now</div>
					<div className="bigbutton" onClick={this.rescheduleSoon}>Soon</div>
					<div className="bigbutton" onClick={this.rescheduleSomeday}>Someday</div>
				</div>
			);
		}
	});
	return ReschedulePanel;
});