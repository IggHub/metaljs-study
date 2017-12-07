import './modal.scss';
import JSXComponent from 'metal-jsx';

class Modal extends JSXComponent {
	render() {
		return (
			<div class="my-modal">
				<h2>Hello World!</h2>
				<p>Test 123</p>
			</div>
		);
	}
}

export default Modal;
