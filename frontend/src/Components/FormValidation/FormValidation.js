import * as yup from 'yup';

const loginSchema = yup.object().shape({
    email: yup.string().email("Please provide a valid email.").required("Email is required."),
    password: yup.string().required("Password is required.")
});

const registerSchema = yup.object().shape({
    firstName: yup.string().required('First name is required.').matches(/^[A-Za-z]{2,}$/, 'First name must contain only letters and have at least 2 characters.'),
    lastName: yup.string().required('Last name is required.').matches(/^[A-Za-z]{2,}$/, 'Last name must contain only letters and have at least 2 characters.'),
    email: yup.string().email('Please provide a valid email.').required('Email is required.'),
    phoneNo: yup.string().required('Phone number is required.').matches(/^[0-9]{9}$/, 'Phone number must contain exactly 9 digits.'),
    password: yup
        .string()
        .required('Password is required.')
        .min(6, 'Password should have at least 6 characters.')
        .matches(/[A-Z]/, 'Password should contain at least one uppercase letter.')
        .matches(/[\W]/, 'Password should contain at least one special character.'),
    confirmPassword: yup
        .string()
        .required('Confirm password is required.')
        .oneOf([yup.ref('password'), null], 'Passwords must match.'),
    agreeToTerms: yup.boolean().oneOf([true], 'You must agree to the terms to continue.'),
});


const resetPasswordSchema = yup.object().shape({
    email: yup.string().email("Please provide a valid email.").required("Email is required.")
});

export  {loginSchema, registerSchema, resetPasswordSchema};
