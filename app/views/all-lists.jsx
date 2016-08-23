/** @name  all-lists.jsx
	@desc  React component. Contains three todo lists (todo-container) and links to change current list category.
	@css   all-lists.css
*/
define(["react", "jsx!/views/todo-container", "jsx!/views/category-circle", "jsx!/views/control-panel", "utils"], function (React, TodoContainer, CategoryCircle, ControlPanel, Utils) {
	var AllLists = React.createClass({

		/**
		 * getInitialState
		 * Determine initial state for component.
		 */
		getInitialState: function () {
			return {category: "home"};
		},

		/**
		 * getProfilePicUrl
		 * Used during render to determine URL for user's social profile pic.
		 */
		getProfilePicUrl: function() {
			return JSON.parse(localStorage.getItem("profile")).picture;
		},

		/** 
		 * onClickLeft
		 * Triggered when left arrow is clicked.
		 * Changes current task category.
		 */
		onClickLeft: function() {
			if(this.state.category=="work") {
				this.setState({category: "home"})
				this.refs.circle.switchLeft("img/home.png");
			}
			else {
				this.setState({category: "work"});
				this.refs.circle.switchLeft("img/work.png");
			}
		},

		/** 
		 * onClickRight
		 * Triggered when right arrow is clicked.
		 * Changes current task category.
		 */
		onClickRight: function() {
			if(this.state.category=="work") {
				this.setState({category: "home"})
				this.refs.circle.switchRight("img/home.png");
			}
			else {
				this.setState({category: "work"});
				this.refs.circle.switchRight("img/work.png");
			}
		},

		/**
		 * onClickProfilePic
		 * Trigged when profile pic is clicked.  Displays ControlPanel component (for logout etc.)
		 */
		onClickProfilePic: function() {
			// Mount ControlPanel in #overlay
			var panel = React.createFactory(ControlPanel);
			React.render(
				panel(),
				document.getElementById('overlay')
			);
		},

		render: function () {
			/* Display current task category, controls to change category, three task lists and user's social profile pic */
			return (
				<div className="all-lists">
					<span className="title">{this.state.category}</span>
					<br/>
					<div className="leftbutton"><span className="flaticon-left-arrow" onClick={this.onClickLeft}/></div>
					<CategoryCircle ref="circle" initialImage="img/home.png"></CategoryCircle>
					<div className="rightbutton"><span className="flaticon-right-arrow-1" onClick={this.onClickRight}/></div>
					<br/>
					<TodoContainer category={this.state.category} type="now"></TodoContainer>
					<br/>
					<TodoContainer category={this.state.category} type="soon"></TodoContainer>
					<br/>
					<TodoContainer category={this.state.category} type="someday"></TodoContainer>
					<br/>
					<img className="profilePic" src={this.getProfilePicUrl()} onClick={this.onClickProfilePic}></img>
				</div>
			);
		}
	});
	return AllLists;
});