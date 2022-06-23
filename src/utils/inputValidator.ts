export const validateInput = (input: string): string | null => {  
	if (!input || input.length === 0) {
	  	return "Component name can't be empty";
	}
	if (!input.match(/^[0-9a-zA-Z]+$/)) {
		return "Only alphabets and numbers allowed";
	}
	return null;
}