import './modal.scss';
import JSXComponent from 'metal-jsx';
import axios from 'axios';
import mediumHelper from './utils/helpers';

var data = {rss_url: 'https://medium.com/feed/@stupendous_igg'}

class Modal extends JSXComponent {
	/*fetch API data using axios*/
	created(){
		console.log("attach")
		var that = this;
		axios.get('https://api.rss2json.com/v1/api.json', {
				params: data
			})
			.then(function (response) {
				//console.log(response.data.items[0].title);
				setTimeout(function(){
					that.state.axiosResponse = response.data.items;
					that.state.isLoading = false;
				}, 500)
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	handleInput(e){
		//console.log(e.target.value);
		this.state.input = e.target.value;
		//console.log(this.state.axiosResponse);
	}

	render() {
		console.log("axios:");
		console.log(this.state.axiosResponse);

		if(this.state.isLoading){
			return <div>Loading...</div>
		}
		const mediumPostItems = this.state.axiosResponse.filter(el => el.categories.length > 0);

		return (
			<div class="my-modal">
			<form class="form-inline">
			  <div class="form-group">
			    <label for="inputPassword2" class="sr-only">Password</label>
			    <input onChange={this.handleInput.bind(this)} type="text" class="form-control" placeholder="Medium" />
			  </div>
				<div class="form-group">
			  	<button type="submit" class="btn btn-primary">Search</button>
				</div>
			</form>

			<div>{mediumPostItems.map((post, index) =>
				<div>Title: {post.title}</div>
			)}</div>

			</div>

		);
	}
}

Modal.STATE = {
	input: {
		value: "Hello input"
	},
	axiosResponse: {
		value: {}
	},
	isLoading: {
		value: true
	}
}
export default Modal;
