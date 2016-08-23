/** @name  Adder.jsx
	@desc  React component. Button to add new task/todo.
	@css   adder.css
*/
define(["react"], function (React) {
	var Adder = React.createClass({
		
		componentDidMount: function() {
			// Bind a document click handler to detect when user clicks outside of component
			$(document).bind("click", this.onDocClick);
		},
		/* Handler for click outside of component */
		onDocClick: function(e) {
			// Check that click was not within this component
			if(!this.refs.adder.getDOMNode().contains(event.target)) {
				this.setState({open: false});
			}
			/*
			if(!$(event.target).closest('.adder').length) {
				this.setState({open: false});
			}
			*/
		},

		onIconClick: function() {
			if(this.state.open) {
				if(this.state.text != "") {
					this.setState({text: ""});
				} 
				else {
					this.state.open = false;
					this.setState({});
				}
			}
			else {
				this.state.open = true;
				this.setState({});
				// LAZY: If user clicks elsewhere, close input field
				/*
				$(document).one("click", function(e){
						this.state.open = false;
						this.setState({})
					}.bind(this));
					*/
			}
		},

		/* componentDidUpdate - Performs updates to DOM elements post-render */
		componentDidUpdate: function(){
			if(this.state.open) {
				this.refs.input.getDOMNode().focus(); 
			}
		},

		/* onValueChange - called on change of inputfield value */
		onValueChange: function(e) {
			this.setState({ text: e.target.value });
		},

		/* onSubmit - called on submit/enter of input field */
		onSubmit: function(e) {
			e.preventDefault();
			var text = this.state.text.trim();
			console.log(text);
			if(this.props.onSubmit) this.props.onSubmit(text);
			this.setState({ text: '' });
		},

		getClass: function() {
			return "adder "+((this.state.open)?"open":"");
		},

		getInitialState: function () {
			return {open: false};
		},

		render: function () {
			return (
				<div ref="adder" className={this.getClass()}>
					<form onSubmit={this.onSubmit}>
						<input type="text" ref="input" value={this.state.text} onChange={this.onValueChange} ></input>
						<span className="icon" onClick={this.onIconClick}></span>
						<input name="submit" type="submit" value="Post" />
					</form>
				</div>
			);
		}
	});
	return Adder;
});