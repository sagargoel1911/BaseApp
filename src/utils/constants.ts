const FORM_ELEMENTS = {
	email: 'email',
	text: 'text',
	number: 'number',
	textarea: 'textarea',
	select: 'select',
	single_select: 'single_select',
	multi_select: 'multi_select',
	checkbox: 'checkbox',
	multi_select_array: 'multi_select_array',
	date: 'date',
	date_only: 'date_only',
	long_text: 'long_text',
	phone_e164: 'phone_e164',
	url: 'url',
	single_file: 'single_file',
	multi_file: 'multi_file',
	percentage: 'percentage',
	password: 'password',
	country_single_select: 'country_single_select',
	state_single_select: 'state_single_select',
	payment_terms: 'payment_terms',
} as const;

const constants = {
	FORM_ELEMENTS,
} as const;

export default constants;
