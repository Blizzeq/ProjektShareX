import React, { useState } from 'react';
import {useFormik} from "formik";
import {editModalSchema} from "../FormValidation/FormValidation";

const AddModal = ({ onClose, onSubmit, statusList, projectName, setProjectName, projectDescription, setProjectDescription, projectStatus, setProjectStatus }) => {

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: editModalSchema,
        onSubmit: (values) => {
            handleSubmit(values);
            console.log(values);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className={'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'}>
            <div className={'bg-white p-8 rounded'}>
                <h2 className={'text-xl font-bold mb-4'}>Create new task</h2>
                <form onSubmit={handleSubmit}>
                    <div className={'flex justify-between'}>
                        <label htmlFor="project-name">Task Title</label>
                        <input
                            type="text"
                            id="project-name"
                            name="project-name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <div className="error">{formik.errors.title}</div>
                        ) : null}
                    </div>
                    <div className={'mt-4 flex justify-between'}>
                        <label htmlFor="project-description">Task Description</label>
                        <input
                            type="text"
                            id="project-name"
                            name="project-description"
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                        />
                        {formik.touched.description && formik.errors.description ? (
                            <div className="error">{formik.errors.description}</div>
                        ) : null}
                    </div>
                    <div className={'flex justify-end mt-8'}>
                        <button type="button" className={'text-darkblue bg-gray-200 rounded px-4 py-2'} onClick={onClose}>
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
