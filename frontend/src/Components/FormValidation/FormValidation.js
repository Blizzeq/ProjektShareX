import * as yup from 'yup';

const loginSchema = yup.object().shape({
    // email: yup.string().email("Please provide a valid email.").required("Email is required."),
    username: yup.string().required("Username is required."),
    password: yup.string().required("Password is required.")
});

const registerSchema = yup.object().shape({
    firstName: yup.string().required('First name is required.').matches(/^[A-Za-z]{2,}$/, 'First name must contain only letters and have at least 2 characters.'),
    lastName: yup.string().required('Last name is required.').matches(/^[A-Za-z]{2,}$/, 'Last name must contain only letters and have at least 2 characters.'),
    email: yup.string().email('Please provide a valid email.').required('Email is required.'),
    username: yup.string().required(),
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

const profileSchema = yup.object().shape({
    username: yup.string().required('Username is required').max(20, 'Username must be at most 20 characters'),
    firstName: yup.string().required('First name is required').max(20, 'First name must be at most 20 characters').matches(/^[A-Za-z]{2,}$/, 'First name must contain only letters and have at least 2 characters.'),
    lastName: yup.string().required('Last name is required').max(20, 'Last name must be at most 20 characters').matches(/^[A-Za-z]{2,}$/, 'Last name must contain only letters and have at least 2 characters.'),
    oldPassword: yup.string().required('Old Password is required').max(20, 'Old password must be at most 20 characters'),
    newPassword: yup.string().required('New Password is required').max(20, 'New password must be at most 20 characters'),
});

const editModalSchema = yup.object().shape({
    title: yup.string().required('Title is required').max(20, 'Title must be at most 20 characters'),
    description: yup.string().required('Description is required').max(100, 'Description must be at most 100 characters'),
})

const addProjectModalSchema = yup.object().shape({
    projectName: yup.string().required('Project Name is required').max(12, 'Project Name must be at most 12 characters'),
});

export  {loginSchema, registerSchema, resetPasswordSchema, profileSchema, editModalSchema, addProjectModalSchema};
