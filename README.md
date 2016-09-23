# FormValidation

Plain Javascript for validating forms based on CSS class.

# Usage

Single form element

```javascript
const formElement = document.querySelector('.form');
const inputElements = formElement.querySelectorAll('input, select, textarea, button');
new FormValidation(formElement, inputElements);
```

Multiple form elements

```javascript
const formElements = document.querySelectorAll('.form');
for (let i = 0; i < formElements.length; i++) {
	const inputElements = formElements[i].querySelectorAll('input, select, textarea, button');
	new FormValidation(formElements[i], inputElements);
}
```
