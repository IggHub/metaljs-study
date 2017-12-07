import './modal.scss';
import JSXComponent from 'metal-jsx';
import axios from 'axios';

var data = {rss_url: 'https://medium.com/feed/@stupendous_igg'}

class Modal extends JSXComponent {

	attached(){
		var that = this;
		axios.get('https://api.rss2json.com/v1/api.json', {
				params: data
			})
			.then(function (response) {
				console.log(response.data.items);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	render() {
		console.log(this.state.axiosResponse)
		return (
			<div class="my-modal">
				<h2>Hello World!</h2>
				<p>Test 123</p>
			</div>
		);
	}
}

Modal.STATE = {
	isLoading: {
		value: true
	},
	axiosResponse: {
		value: {}
	}
}
export default Modal;
