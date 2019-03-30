import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions/user_actions';
import CircularProgress from '@material-ui/core/CircularProgress';


// function return class
export default function(ComposedClass, reload, adminRoute = null){

    class AuthenticationCheck extends Component{

        state = {
            loading: true
        }

        componentDidMount(){
            this.props.dispatch(auth()).then(response => {
                let user = this.props.user.userData;
                console.log(user);

                if(!user.isAuth){
                    // private route
                    console.log(reload);
                    if(reload){
                        this.props.history.push('/register_login');
                    } 
                }else{
                    if(adminRoute && !user.isAuth){
                        this.props.history.push('/user/dashboard');
                    }else{
                        // if user already login 
                        if(reload === false){
                            this.props.history.push('/user/dashboard');
                        }
                    }
                }

                this.setState({loading:false});
            });

        }

        render() {
            if(this.state.loading){
                return (
                    <div className="main_loadr">
                        <CircularProgress style={{color:'#2196F3'}} thickness={7} />
                    </div>
                )
            }
            return (
                <ComposedClass {...this.props}/>
            );
        }
    
    }
    
    function mapStateToProps(state){

        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck);
}
