import React from 'react';
import {useFormik} from 'formik';
import {editModalSchema, profileSchema} from '../FormValidation/FormValidation';

const EditModal = ({task, statusList, onClose, onSubmit}) => {
    const handleSubmit = (values) => {
        onSubmit({id: task.id, name: values.title, description: values.description, statusName: values.statusName});
    };

    const formik = useFormik({
        initialValues: {
            title: task.name,
            description: task.description,
            statusName: task.statusName,
        },
        validationSchema: editModalSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    return (
        <div className={'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'}>
            <div className={'bg-white p-8 rounded'}>
                <h2 className={'text-xl font-bold mb-4'}>Edit Task</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className={'flex justify-between'}>
                        <label htmlFor="task-title">Task Title</label>
                        <input
                            type="text"
                            id="project-name"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {formik.touched.title && formik.errors.title ? (
                        <div className={'error-container'}>
                            <div className="error">{formik.errors.title}</div>
                        </div>
                    ) : null}
                    <div className={'mt-4 flex justify-between'}>
                        <label htmlFor="task-description">Task Description</label>
                        <input
                            type="text"
                            id="project-name"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {formik.touched.description && formik.errors.description ? (
                        <div className={'error-container'}>
                            <div className="error">{formik.errors.description}</div>
                        </div>
                    ) : null}
                    <div className={'mt-4 flex justify-between'}>
                        <label htmlFor="task-status">Task Status</label>
                        <select
                            id={'project-name'}
                            name="statusName"
                            value={formik.values.statusName}
                            onChange={formik.handleChange}
                        >
                            {statusList.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={'flex justify-end mt-8'}>
                        <button type="button" className={'text-darkblue bg-gray-200 rounded px-4 py-2'}
                                onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className={'bg-blue text-white ml-4 px-4 py-2 rounded'}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
