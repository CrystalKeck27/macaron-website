import React from "react";

import "./Order.css";
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";

interface MacaronData {
    name: string;
    quantity: number;
}

interface OrderFormValues {
    macarons: MacaronData[];
    name: string;
    email: string;
    phone: string;
}

function Order() {
    const macaronsNotLoaded: OrderFormValues = {
        macarons: [],
        name: "",
        email: "",
        phone: ""
    };

    const [initialValues, setInitialValues] = React.useState(macaronsNotLoaded);

    React.useEffect(() => {
        const macarons = [
            {
                name: "Cherry Berry Unicorn",
                quantity: 0
            },
            {
                name: "Blue Raspberry Rainbow",
                quantity: 0
            },
            {
                name: "Minecraft",
                quantity: 0
            },
            {
                name: "Vanilla",
                quantity: 0
            }
        ];
        //execute after 1 second
        setTimeout(() => {
            setInitialValues({
                macarons: macarons,
                name: "",
                email: "",
                phone: ""
            });
        }, 1000);
    }, []);

    function onSubmit(values: OrderFormValues) {
        console.log(values);
    }

    return <div className="Order">
        <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={onSubmit}>
            {({values}) => (
                <Form className='orderForm'>
                    <FieldArray name='macarons'>
                        {() => (
                            <div className='macaronSelection'>
                                {values.macarons.length > 0 ? values.macarons.map((macaron, index) => (
                                    <div className='macaronSpinner' key={index}>
                                        <label htmlFor={`macaron[${index}].quantity`}>{macaron.name}</label>
                                        <Field name={`macarons[${index}].quantity`} type='number' min='0' max='12'
                                               step='2'/>
                                        <ErrorMessage name={`macarons[${index}].quantity`} component='div'/>
                                    </div>
                                )) : <p>Loading this month's macarons...</p>}
                            </div>
                        )}
                    </FieldArray>
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
                    <button className='center' type='submit'>Submit</button>
                </Form>
            )}
        </Formik>
    </div>;
}

export default Order;