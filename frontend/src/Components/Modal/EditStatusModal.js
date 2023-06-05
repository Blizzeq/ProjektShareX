import React from "react";
import {useFormik} from "formik";
import {editStatusModalSchema} from "../FormValidation/FormValidation";

const EditStatusModal = ({status, setNewStatus, onClose, onSubmit}) => {
    const handleSubmit = (values) => {
        onSubmit();
    };

    const formik = useFormik({
        initialValues: {
            status: status,
        },
        validationSchema: editStatusModalSchema,
        onSubmit: (values) => {
            handleSubmit(values);
            setNewStatus(null);
        },
    });

    return (
        <div className={"fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"}>
            <div className={"bg-white p-8 rounded"}>
                <h2 className={"text-xl font-bold mb-4"}>Edit Status</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className={"flex justify-between"}>
                        <label htmlFor="status-title">Status Title</label>
                        <input
                            type="text"
                            id="project-name"
                            name="status"
                            value={formik.values.status}
                            onChange={e => {
                                formik.handleChange(e);
                                setNewStatus(e.target.value);
                            }}
                        />
                    </div>
                    {formik.touched.status && formik.errors.status ? (
                        <div className={'error-container'}>
                            <div className="error">{formik.errors.status}</div>
                        </div>
                    ) : null}
                    <div className={"flex justify-end mt-8"}>
                        <button type="button" className={"text-darkblue bg-gray-200 rounded px-4 py-2"}
                                onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className={"bg-blue text-white ml-4 px-4 py-2 rounded"}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditStatusModal;
