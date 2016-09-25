/** @name todo-container.jsx
	@desc React component. Primary container for a list of todos/tasks.
		Each container will be assigned a particular category (e.g. "home") and type
		(e.g. "someday") of todos to display.
		Container also includes component to add new tasks (Adder).
	@css todo-container.css
*/
define(["react","jsx!/views/todo", "jsx!/views/adder", "utils"], function (React, Todo, Adder, Utils) {
	var TodoContainer = React.createClass({

		getInitialState: function () {
			return {data: []};
		},

		/**
		 * onNewTodo
		 * Called once a new todo has been entered in Adder component (Adder.onSubmit)
		 * Add todo to database and display.
		 */
		onNewTodo: function(text) {
			// If blank, leave now
			if(!text) return;

			/// TODO: LAZY: Generate unique ID for task based on user ID and current time
			var user = JSON.parse(localStorage.getItem("profile")).user_id;
			var id = user+(new Date()).getTime();

			// Add task to database
			Utils.addTask(id, this.props.category, this.props.type, text);

			// Optimistically add new todo to displayed list immediately
			var data = this.state.data;
			var newData = data.concat([{id: id, title: text}]);
			this.setState({ data: newData });
		},

		/** 
		 * componentWillMount 
		 * Called before component is displayed for first time. 
		 * Load tasks to be displayed and add any external-event handlers. */
		componentWillMount: function() {
			this.loadTasks(this.props.category);

			/// TODO: LAZY: Reload todos if we pick up global trigger for this
			$(document).bind("tudooz.reloadlists", function(){
				this.loadTasks(this.props.category)
			}.bind(this));
		},

		/**
		 * componentWillReceiveProps
		 * Called after props for component have been changed by parent.
		 * The only prop-change supported here is change of category, in 
		 * which case we will reload the task list.
		 */
		componentWillReceiveProps: function(nextProps) {
			this.loadTasks(nextProps.category);
		},

		/**
		 * loadTasks
		 * Load tasks from server
		 */
		loadTasks: function(category) {
			Utils.getOpenTasks(category, this.props.type, function(data) {
				this.setState({data: data});
			}.bind(this));
		},

		/**
		 * onTaskComplete
		 * Called when a task has been marked as complete.
		 * Find task (by id) and remove it from state.data.
		 */
		onTaskComplete: function(id) {
			for(var i=0; i<this.state.data.length; i++) {
				if(this.state.data[i].id == id) {
					this.state.data.splice(i,1);
					this.setState({data: this.state.data});
					break;
				}
			}
		},

		render: function () {
			// Create array of Todo-component instances from data array in state
			var todos = this.state.data.map(function (todo) {
				return (
					<Todo key={todo.id} id={todo.id} title={todo.title} type={this.props.type} onComplete={this.onTaskComplete}></Todo>
				);
			}.bind(this));
			
			/* Output component. Contents:
				 - List of ToDo components
				 - Adder: Component allowing user to add a new todo
			*/
			return (
				<div className="todo-container">
					<span className="title">todo {this.props.type}</span>
					{todos}
					<Adder onSubmit={this.onNewTodo}></Adder>
				</div>
			);
		}
	});
	return TodoContainer;
});