# FormValidation

Plain Javascript for validating forms based on CSS class.

# Usage

```javascript
const formElems = document.querySelectorAll('.contact-form');
for (let i = 0; i < formElems.length; i++) {
	const inputs = formElems[i].querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], select, textarea');
	new FormValidation(formElems[i], inputs);
}
```
