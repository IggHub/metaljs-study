import './modal.scss';
import JSXComponent from 'metal-jsx';
import axios from 'axios';
import mediumHelper from './utils/helpers';

//var data = {rss_url: 'https://medium.com/feed/@HillaryClinton'}

class Modal extends JSXComponent {

	/*fetch API data using axios*/
	created(){
		console.log("attach")
		var that = this;
		var user = this.state.input;
		var data = {rss_url: 'https://medium.com/feed/@' + user}
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

	/*handles text input to search medium user*/
	handleInput(e){
		console.log(e.target.value);
		this.state.input = e.target.value;
		//console.log(this.state.axiosResponse);
	}

	submitInput(){/*
		var that = this;
		var user = this.state.input;
		var data = {rss_url: 'https://medium.com/feed/@' + user}
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
			*/
	}

	render() {
		//console.log("axios:");
		//console.log(this.state.axiosResponse);

		if(this.state.isLoading){
			return <div class="container"><h1 class="text-center">Loading...</h1></div>
		}
		const mediumPostItems = this.state.axiosResponse.filter(el => el.categories.length > 0);

		return (
			<div class="my-modal">
				<div class="container">
					<form class="form-inline">
					  <div class="form-group">
					    <label for="inputPassword2" class="sr-only">Password</label>
					    <input onChange={this.handleInput.bind(this)} type="text" class="form-control" placeholder="Medium" />
					  </div>
						<div class="form-group">
					  	<button class="btn btn-primary" onClick={this.submitInput.bind(this)}>Search</button>
						</div>
					</form>
				</div>

			<section>
				<div class="container">
					{mediumPostItems.map((post, index) =>
						<div class="col-sm-6 col-md-4">
							<div class="blog-post">
								<header>
									<h4 class="date">{mediumHelper.humanReadableDate(post.pubDate)}</h4>
									<div class="blog-element">
										<img class="img-responsive" src={mediumHelper.imageSearcher(post.description)} width="360px" height="240px" />
									</div>
								</header>
								<div class="blog-content">
									<h4>{post.title.length > 20 ? post.title.substring(0, 20) + "..." : post.title}</h4>
									<div class="post-meta">
										<span>{post.author}</span>
									</div>
									<p>{mediumHelper.descriptionCleaner(post.description)}...</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>

			</div>

		);
	}
}

Modal.STATE = {
	input: {
		value: "stupendous_igg"
	},
	axiosResponse: {
		value: {}
	},
	isLoading: {
		value: true
	}
}
export default Modal;
