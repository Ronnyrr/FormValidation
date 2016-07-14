export default class FormValidation {
	constructor(form, fields) {
		this.el = form;
		this.fields = fields;
		this.submitElem = this.el.querySelector('input[type="submit"]');

		this.formError = false;

		this.bindEvents = this.bindEvents.bind(this);
		this.checkFields = this.checkFields.bind(this);
		this.loopFields = this.loopFields.bind(this);

		this.bindEvents();
	}

	bindEvents() {
		// Change events on inputs
		for (let i = 0; i < this.fields.length; i++) {
			const field = this.fields[i];
			field.addEventListener('input', () => this.checkFields(field, field.value));
		}

		// Submit form
		this.el.addEventListener('submit', (ev) => {
			if (this.error) {
				ev.preventDefault();
			}
		});
	}

	checkFields(input, val) {
		let error = false;
		const field = input.getAttribute('name');

		if (field === 'name') {
			error = !val.match(new RegExp(/^([^.]{2,})+$/));
		} else if (field === 'zipcode') {
			error = !val.match(new RegExp(/^([0-9]{4})\s*([a-zA-Z]{2})$/));
		} else if (field === 'email') {
			error = !val.match(new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/));
		} else if (field === 'phone') {
			error = !val.match(new RegExp(/^([0-9]{6,10})$/));
		} else if (field === 'house_number') {
			error = !val.match(new RegExp(/^([0-9]{1,4})$/));
		} else {
			error = val.length === 0;
		}

		if (error) {
			this.formError = true;
			input.classList.add('error');
		} else {
			this.formError = false;
			input.classList.remove('error');
		}

		this.loopFields();
	}

	loopFields() {
		const errors = [];

		for (let i = 0; i < this.fields.length; i++) {
			const field = this.fields[i];
			if (field.classList.contains('error') || !field.value) {
				errors.push(field);
			}
		}

		if (errors.length) {
			this.submitElem.setAttribute('disabled', 'disabled');
		} else {
			this.submitElem.removeAttribute('disabled');
		}
	}
}
