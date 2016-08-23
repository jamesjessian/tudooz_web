/** @name category-circle.jsx
	@desc React component. Circular container containing image for task list category.
	@css category-circle.css
*/
define(["react", "utils"], function (React, Utils) {
	var CategoryCircle = React.createClass({
		
		// Private variables
		currImage: 1,

		/**
		 * getInitialState
		 * Determine initial state for component.
		 */
		getInitialState: function () {
			return {categoryImage1: this.props.initialImage, class1: "moveMiddle fromLeft"};
		},

		/**
		 * switchRight
		 * Public method to change current category image with animation to the right.
		 */
		switchRight: function(newImage) {
			if(this.currImage == 1) {
				this.currImage = 2;
				this.setState({categoryImage2: newImage, class1: "toRight", class2: "fromLeft"});
			}
			else {
				this.currImage = 1;
				this.setState({categoryImage1: newImage, class1: "fromLeft", class2: "toRight"});
			}
		},

		/**
		 * switchLeft
		 * Public method to change current category image with animation to the left.
		 */
		switchLeft: function(newImage) {
			if(this.currImage == 1) {
				this.currImage = 2;
				this.setState({categoryImage2: newImage, class1: "toLeft", class2: "fromRight"});
			}
			else {
				this.currImage = 1;
				this.setState({categoryImage1: newImage, class1: "fromRight", class2: "toLeft"});
			}
		},

		/**
		 * getClass
		 * Used during render to determine class for each image.
		 */
		getClass: function(index) {
			if(index==1)
				return this.state.class1;
			else
				return this.state.class2;
		},

		render: function () {
			/**
			 * Contains two images, one hidden and one visible.  These are switched by switchLeft and switchRight.
			 */
			return (
				<div className="category-circle">
					<img className={this.getClass(1)} src={this.state.categoryImage1}></img>
					<img className={this.getClass(2)} src={this.state.categoryImage2}></img>
				</div>
			);
		}
	});
	return CategoryCircle;
});