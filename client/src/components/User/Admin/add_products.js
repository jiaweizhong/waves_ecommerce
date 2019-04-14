import React, { Component } from 'react';
import UserLayout from '../../../hoc/user';
import FormField from '../../utils/Form/formfield';
import { update, generateData, isFormValid, populateOptionFields, resetFields } from '../../utils/Form/formActions';
import FileUpload from '../../utils/Form/fileupload';
import { connect } from 'react-redux';
import { getBrands, getWoods, addProduct, clearProduct } from '../../../actions/products_actions';

class AddProduct extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product Name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            description: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Product Description',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Enter your description'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            price: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product Price',
                    name: 'price_input',
                    type: 'number',
                    placeholder: 'Enter your price'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            brand: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product Brand',
                    name: 'brands_input',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            shipping: {
                element: 'select',
                value: '',
                config: {
                    label: 'Shipping',
                    name: 'shipping_input',
                    options: [
                        { key: true, value: 'Yes' },
                        { key: false, value: 'No' }
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            available: {
                element: 'select',
                value: '',
                config: {
                    label: 'Available in Stock',
                    name: 'available_input',
                    options: [
                        { key: true, value: 'Yes' },
                        { key: false, value: 'No' }
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            wood: {
                element: 'select',
                value: '',
                config: {
                    label: 'Wood Material',
                    name: 'wood_input',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            frets: {
                element: 'select',
                value: '',
                config: {
                    label: 'Frets',
                    name: 'frets_input',
                    options: [
                        { key: 21, value: 21 },
                        { key: 22, value: 22 },
                        { key: 23, value: 23 },
                        { key: 24, value: 24 }
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            publish: {
                element: 'select',
                value: '',
                config: {
                    label: 'Publish',
                    name: 'publish_input',
                    options: [
                        { key: true, value: 'Public' },
                        { key: false, value: 'Hidden' }
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            images:{
                value:[],
                validation:{
                    required: false
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: false
            }
        }

    }

    // update form
    updateForm = (element) => {
        const newFormdata = update(element, this.state.formData, 'products');
        this.setState({
            formError: false,
            formData: newFormdata
        })
    }

    resetFieldHandler = () => {
        const newFormData = resetFields(this.state.formData);

        this.setState({
            formData: newFormData,
            formSuccess: true
        });

        setTimeout(() => {
            this.setState({
                formSuccess: false
            },() => {
                this.props.dispatch(clearProduct());
            })
        },3000)
    }

     // submit form
     submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'register');
        let formIsValid = isFormValid(this.state.formData, 'register');
        if(formIsValid){
            this.props.dispatch(addProduct(dataToSubmit)).then(() => {
                if(this.props.products.addProduct.success){
                    this.resetFieldHandler();
                }else{
                    this.setState({formError: true});
                }
            })
        }else{
            this.setState({
                formError:true
            })
        }
    }


    updateFields = (newFormData) => {
        this.setState({
            formData: newFormData
        })
    }

    componentDidMount(){
        const formdata = this.state.formData;
        // populate brands
        this.props.dispatch(getBrands()).then( response => {
            // poplulate all the available options
            const newFormData = populateOptionFields(formdata, this.props.products.brands,'brand');
            // update the fields with options in the form
            this.updateFields(newFormData);
        })
        // populate woods
        this.props.dispatch(getWoods()).then( response => {
            // poplulate all the available options
            const newFormData = populateOptionFields(formdata, this.props.products.woods,'wood');
            // update the fields with options in the form
            this.updateFields(newFormData);
        })
    }

    imagesHandler = (images) => {
        const newFormData = {
            ...this.state.formData
        }
        newFormData['images'].value = images;
        newFormData['images'].valid = true;

        this.setState({
            formData: newFormData
        })
    }

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>Add product</h1>
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <FileUpload
                            imagesHandler={(images)=> this.imagesHandler(images)}
                            reset={this.state.formSuccess}
                        />
                        <FormField
                            id={'name'}
                            formdata={this.state.formData.name}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'description'}
                            formdata={this.state.formData.description}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'price'}
                            formdata={this.state.formData.price}
                            change={(element) => this.updateForm(element)}
                        />
                        <div className="form_devider"></div>
                        <FormField
                            id={'brand'}
                            formdata={this.state.formData.brand}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'shipping'}
                            formdata={this.state.formData.shipping}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'available'}
                            formdata={this.state.formData.available}
                            change={(element) => this.updateForm(element)}
                        />
                        <div className="form_devider"></div>
                        <FormField
                            id={'wood'}
                            formdata={this.state.formData.wood}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'frets'}
                            formdata={this.state.formData.frets}
                            change={(element) => this.updateForm(element)}
                        />
                        <div className="form_devider"></div>
                        <FormField
                            id={'publish'}
                            formdata={this.state.formData.publish}
                            change={(element) => this.updateForm(element)}
                        />
                        {this.state.formSuccess ?
                            <div className='form_success'>
                                Success..
                            </div>
                            : null}

                        {this.state.formError ?
                            <div className='error_label'>
                                Please check your data
                            </div>
                            : null}
                        <button onClick={(event) => this.submitForm(event)}>
                            Add product
                        </button>
                    </form>
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(AddProduct);