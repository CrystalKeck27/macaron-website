import React from "react";

import "./Order.css";
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import {createOrder, getCurrentMacarons, getOrders, MacaronOrder} from "../../services/Firestore";

function Order() {
    const macaronsNotLoaded: MacaronOrder = {
        macarons: [],
        total: 0,
        specialInstructions: "",
        name: "",
        email: "",
        phone: ""
    };

    const [initialValues, setInitialValues] = React.useState(macaronsNotLoaded);
    const [loading, setLoading] = React.useState(true);
    const [submitting, setSubmitting] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);

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
                total: 0,
                specialInstructions: "",
                name: "",
                email: "",
                phone: ""
            });
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
        getOrders().then(orders => {
            console.log(orders);
        }).catch(error => {
            console.log(error);
        });
    }, []);


    function onSubmit(values: MacaronOrder) {
        setSubmitting(true);
        createOrder(values).then(() => {
            setSubmitting(false);
            setSubmitted(true);
        });
    }

    function validate(values: MacaronOrder) {
        const errors: any = {};
        if (!values.name) {
            errors.name = "Required";
        }
        //validate email
        if (!values.email) {
            errors.email = "Required";
        } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = "Invalid email address";
        }
        //validate phone
        if (!values.phone) {
            errors.phone = "Required";
        } else if (!/^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/i.test(values.phone)) {
            errors.phone = "Invalid phone number";
        }

        //if total is not a multiple of six, add error
        let total = 0;
        values.macarons.forEach(macaron => {
            total += macaron.quantity;
        });
        if (total % 6 !== 0) {
            errors.total = "Must order a multiple of six";
        }
        return errors;
    }

    let content =
        <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
            {({values}) => (
                <Form className='orderForm'>
                    <FieldArray name='macarons'>
                        {() => (
                            <div className='macaronSelection'>
                                {values.macarons.map((macaron, index) => (
                                    <div className='macaronSpinner' key={index}>
                                        <label htmlFor={`macaron[${index}].quantity`}>{macaron.flavor}</label>
                                        <Field name={`macarons[${index}].quantity`} type='number' min='0' max='12'
                                               step='1'/>
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
                        <ErrorMessage name='total' component='div'/>
                    </div>
                    <button className='center' type='submit'>Submit</button>
                </Form>
            )}
        </Formik>;

    if (submitting) {
        content = <div>Placing order...</div>;
    } else if (submitted) {
        content = <div>Order placed!</div>;
    } else if (loading) {
        content = <div>Loading...</div>;
    } else if (initialValues.macarons.length === 0) {
        content = <div>No macarons this month</div>;
    }

    return <div className="Order">
        <div className="OrderBackground"></div>
        {content}
    </div>;
}

export default Order;
