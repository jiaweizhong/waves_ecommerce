import React, { Component } from 'react';
import FormField from '../../utils/Form/formfield';
import { update, generateData, isFormValid, populateFields } from '../../utils/Form/formActions';

import { connect } from 'react-redux';
import { getSiteData, updateSiteData } from '../../../actions/site_actions';

class UpdateSiteNfo extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formData: {
            address: {
                element: 'input',
                value: '',
                config: {
                    label: 'Address',
                    name: 'address_input',
                    type: 'text',
                    placeholder: 'Enter the site address'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            hours: {
                element: 'input',
                value: '',
                config: {
                    label: 'Working Hours',
                    name: 'hours_input',
                    type: 'text',
                    placeholder: 'Enter the site working hours'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            phone: {
                element: 'input',
                value: '',
                config: {
                    label: 'Phone Number',
                    name: 'phone_input',
                    type: 'text',
                    placeholder: 'Enter the phone number'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },

            email: {
                element: 'input',
                value: '',
                config: {
                    label: 'Shop Email',
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            }
        }
    }

    // update form
    updateForm = (element) => {
        const newFormdata = update(element, this.state.formData, 'site_info');
        this.setState({
            formError: false,
            formData: newFormdata
        })
    }

    // submit form
    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'site_info');
        let formIsValid = isFormValid(this.state.formData, 'site_info');

        if (formIsValid) {
            this.props.dispatch(updateSiteData(dataToSubmit)).then(() => {
                this.setState({
                    formSuccess: true
                }, () => {
                    setTimeout(()=>{
                        this.setState({
                            formSuccess: false
                        })
                    },2000)
                })
            })
        } else {
            this.setState({
                formError: true
            });
        }
    }

    componentDidMount() {
        this.props.dispatch(getSiteData()).then(() => {
            const newFormdata = populateFields(this.state.formData, this.props.site.siteData[0]);
            this.setState({
                formData: newFormdata
            });
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.submitForm(event)}>
                    <h1>Site Info</h1>
                    <FormField
                        id={'address'}
                        formdata={this.state.formData.address}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormField
                        id={'hours'}
                        formdata={this.state.formData.hours}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormField
                        id={'phone'}
                        formdata={this.state.formData.phone}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormField
                        id={'email'}
                        formdata={this.state.formData.email}
                        change={(element) => this.updateForm(element)}
                    />
                    <div>
                        {
                            this.state.formSuccess ?
                                <div className="form_success">
                                    Success
                            </div>
                                : null
                        }
                        {this.state.formError ?
                            <div className='error_label'>
                                Please check your data, password need to be at least 5 characters.
                            </div>
                            : null}
                        <button onClick={(event) => this.submitForm(event)}>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        site: state.site
    }
}

export default connect(mapStateToProps)(UpdateSiteNfo);