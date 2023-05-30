import React from 'react';
import {useFormik} from 'formik';
import {addModalSchema} from '../FormValidation/FormValidation';

const AddModal = ({onClose, onSubmit, projectName, setProjectName, projectDescription, setProjectDescription}) => {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: addModalSchema,
        onSubmit: (values) => {
            handleSubmit(values);
            console.log(values);
        },
    });

    const handleSubmit = (values) => {
        onSubmit(values);
        setProjectName("");
        setProjectDescription("");
    };

    return (
        <div className={'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'}>
            <div className={'bg-white p-8 rounded'}>
                <h2 className={'text-xl font-bold mb-4'}>Create new task</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className={'flex justify-between'}>
                        <label htmlFor="project-name">Task Title</label>
                        <input
                            type="text"
                            id="project-name"
                            name="title"
                            value={formik.values.title}
                            onChange={e => {
                                formik.handleChange(e);
                                setProjectName(e.target.value);
                            }}
                        />
                    </div>
                    {formik.touched.title && formik.errors.title ? (
                        <div className={'error-container'}>
                            <div className="error">{formik.errors.title}</div>
                        </div>
                    ) : null}
                    <div className={'mt-4 flex justify-between'}>
                        <label htmlFor="project-description">Task Description</label>
                        <input
                            type="text"
                            id="project-name"
                            name="description"
                            value={formik.values.description}
                            onChange={e => {
                                formik.handleChange(e);
                                setProjectDescription(e.target.value);
                            }}
                        />
                    </div>
                    {formik.touched.description && formik.errors.description ? (
                        <div className={'error-container'}>
                            <div className="error">{formik.errors.description}</div>
                        </div>
                    ) : null}
                    <div className={'flex justify-end mt-8'}>
                        <button type="button" className={'text-darkblue bg-gray-200 rounded px-4 py-2'}
                                onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className={'bg-blue text-white ml-4 px-4 py-2 rounded'}>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddModal;
