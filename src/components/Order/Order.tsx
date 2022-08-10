import React from "react";

import "./Order.css";
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import {getCurrentMacarons, MacaronOrder} from "../../services/Firestore";

function Order() {
    const macaronsNotLoaded: MacaronOrder = {
        macarons: [],
        specialInstructions: "",
        name: "",
        email: "",
        phone: ""
    };

    const [initialValues, setInitialValues] = React.useState(macaronsNotLoaded);

    React.useEffect(() => {
        getCurrentMacarons().then(flavors => {
            const flavorsAndCounts = flavors.map(flavor => {
                return {
                    flavor: flavor.flavor,
                    quantity: 0
                };
            });
            setInitialValues({
                macarons: flavorsAndCounts,
                specialInstructions: "",
                name: "",
                email: "",
                phone: ""
            });
        });
    }, []);

    function onSubmit(values: MacaronOrder) {
        console.log(values);
    }

    return <div className="Order">
        <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={onSubmit}>
            {({values}) => (
                values.macarons.length > 0 ? <Form className='orderForm'>
                    <FieldArray name='macarons'>
                        {() => (
                            <div className='macaronSelection'>
                                {values.macarons.map((macaron, index) => (
                                    <div className='macaronSpinner' key={index}>
                                        <label htmlFor={`macaron[${index}].quantity`}>{macaron.flavor}</label>
                                        <Field name={`macarons[${index}].quantity`} type='number' min='0' max='12'
                                               step='2'/>
                                        <ErrorMessage name={`macarons[${index}].quantity`} component='div'/>
                                    </div>
                                ))}
                            </div>
                        )}
                    </FieldArray>
                    <div>
                        <Field name='specialInstructions' type='text' placeholder='Special Instructions'/>
                        <ErrorMessage name='specialInstructions' component='div'/>
                    </div>
                    <div className='personalInfo'>
                        <div className='personalInfoBlock'>
                            <Field name='name' type='text' placeholder='Name'/>
                            <ErrorMessage name='name' component='div'/>
                        </div>
                        <div className='personalInfoBlock'>
                            <Field name='email' type='email' placeholder='Email'/>
                            <ErrorMessage name='email' component='div'/>
                        </div>
                        <div className='personalInfoBlock'>
                            <Field name='phone' type='tel' placeholder='Phone'/>
                            <ErrorMessage name='phone' component='div'/>
                        </div>
                    </div>
                    <div>
                        <p>Total: {values.macarons.reduce((acc, curr) => acc + curr.quantity, 0)}</p>
                    </div>
                    <button className='center' type='submit'>Submit</button>
                </Form> : <p>Loading this month's macarons...</p>
            )}
        </Formik>
    </div>;
}

export default Order;