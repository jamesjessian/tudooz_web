/** @name todo.jsx
	@desc React component. Simple todo/task with buttons to edit/reschedule/complete task.
	@css todo.css
*/
define(["react","jsx!/views/reschedule-panel", "utils"], function(React, ReschedulePanel, Utils) {
	var Todo = React.createClass({

		getInitialState: function () {
			return {title: this.props.title, open: false, editing: false};
		},

		/**
		 * componentDidMount
		 * Fired after component is initially rendered.
		 */
		componentDidMount: function() {
			// Bind a document click handler to detect when user clicks outside of component, so 
			// that task can be deselected.
			$(document).bind("click", this.onDocClick);
		},

		/**
		 * onDocClick 
		 * Handler for click outside of component 
		 */
		onDocClick: function(e) {
			// Check that click was not within this component
			if(this.refs.todo && !this.refs.todo.getDOMNode().contains(e.target)) {
				// Deselect component
				if(this.state.editing===true)
					this.updateTitle();
				this.setState({open: false, editing: false});
			}
		},

		/** 
		 * onClick - Handle click on component
		 * This will open the task for editing/other options
		 */
		onClick: function(e) {
			// Prevent click from bubbling up to document
			e.stopPropagation();
			if(!this.state.open) {
				var newState = !this.state.open;
				this.setState({open: newState});
				if(this.props.onOpen) this.props.onOpen(newState);
			}
			else if($(e.target).is(".title")) {
				this.onClickEdit(e);
			}
		},

		/** 
		 * getClassName - called when rendering component
		 * Determines class for component/DOM node.
		 */
		getClassName: function() {
			return 	"todo " +
					this.props.type + " " +
					((this.state.open)?"open ":" ") +
					((this.state.editing)?"editing ":" ") +
					this.props.section;
		},

		/**
		 * onClickComplete - Fired when 'complete' link clicked.
		 * Marks task as complete in database.
		 */
		onClickComplete: function(e) {
			e.stopPropagation();
			// Mark task as completed in database
			Utils.completeTask(this.props.id);
			// If necessary, call onComplete callback
			if(this.props.onComplete) this.props.onComplete(this.props.id);
		},

		/** onClickSchedule - Called when user selects to reschedule todo.
		 * This will present the user with ReschedulePanel (initialised with ID of todo)
		 */
		onClickSchedule: function(e) {
			e.stopPropagation();

			// Mount ReschedulePanel in #overlay
			var panel = React.createFactory(ReschedulePanel);
			React.render(
				panel({task: this.props.id}),
				document.getElementById('overlay')
			);
		},

		/**
		 * onClickEdit
		 * Fired when 'edit' link is clicked.  Makes task title editable.
		 */
		onClickEdit: function(e) {
			e.stopPropagation();
			this.setState({editing: true});
		},

		/**
		 * onTextChange
		 * Fired when task text is edited.  Updates task title in state.
		 */
		onTextChange: function(e) {
			this.setState({title: e.target.value})
		},

		onInputKeyPress: function(e) {
			if (e.key === 'Enter') {
				this.updateTitle();
				this.setState({open: false, editing: false});
			}
		},

		updateTitle: function() {
			Utils.updateTaskTitle(this.props.id, this.state.title);
		},
		
		/** componentDidUpdate
		 * Performs updates to DOM elements post-render 
		 */
		componentDidUpdate: function() {
			if(this.state.editing && this.state.title != "") {
				this.refs.input.getDOMNode().focus();
				/*
				var input = $("input");
				input[0].selectionStart = input[0].selectionEnd = input.val().length;
				*/
			}
		},

		render: function() {
			/* Displays task title, plus (when clicked) buttons for task edit, rescheduling and completion.
				An input field (to edit task title) is initially hidden. */
			return (
				<div ref="todo" className={this.getClassName()} onClick={this.onClick}>
					<div className="title">{this.state.title}</div>
					<input ref="input" className="title-edit" type="text" value={this.state.title} onChange={this.onTextChange} onKeyPress={this.onInputKeyPress}></input>
					<div className="buttons">
						<span className="flaticon-pencil" onClick={this.onClickEdit}></span>
						<span className="flaticon-clock" onClick={this.onClickSchedule}></span>
						<span className="flaticon-check" onClick={this.onClickComplete}></span>
					</div>
				</div>
			);
		}
	});
	return Todo;
});