'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormValidation = function () {
	function FormValidation(form, fields) {
		_classCallCheck(this, FormValidation);

		this.el = form;
		this.fields = fields;
		this.submitElem = this.el.querySelector('button[type="submit"]');

		this.formError = false;

		this.bindEvents = this.bindEvents.bind(this);
		this.checkFields = this.checkFields.bind(this);
		this.loopFields = this.loopFields.bind(this);

		this.bindEvents();
	}

	_createClass(FormValidation, [{
		key: 'bindEvents',
		value: function bindEvents() {
			var _this = this;

			var _loop = function _loop(i) {
				var field = _this.fields[i];
				field.addEventListener('input', function () {
					return _this.checkFields(field, field.value);
				});
			};

			// Change events on inputs
			for (var i = 0; i < this.fields.length; i++) {
				_loop(i);
			}

			// Submit form
			this.el.addEventListener('submit', function (ev) {
				if (_this.error) {
					ev.preventDefault();
				}
			});
		}
	}, {
		key: 'checkFields',
		value: function checkFields(input, val) {
			var error = false;
			var field = input.getAttribute('name');

			if (field === 'name' || field === 'participant') {
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

			if (input.classList.contains('no-validate')) {
				error = false;
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
	}, {
		key: 'loopFields',
		value: function loopFields() {
			var errors = [];

			for (var i = 0; i < this.fields.length; i++) {
				var _field = this.fields[i];
				if (_field.classList.contains('error') || !_field.value && !_field.classList.contains('no-validate')) {
					errors.push(_field);
				}
			}

			if (errors.length) {
				this.submitElem.setAttribute('disabled', 'disabled');
			} else {
				this.submitElem.removeAttribute('disabled');
			}
		}
	}]);

	return FormValidation;
}();
