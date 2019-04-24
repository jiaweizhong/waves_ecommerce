import React, { Component } from 'react';
import Header from '../components/Header_Footer/Header';
import Footer from '../components/Header_Footer/Footer';
import { connect } from 'react-redux';
import { getSiteData } from '../actions/site_actions';

class Layout extends Component{

    componentDidMount(){
        // if already have site info
        if(Object.keys(this.props.site).length === 0){
            this.props.dispatch(getSiteData());
        }
    }

    render() {
        return (
            <div>
                {/* header */}
                <Header />
                <div className="page_container">
                    {this.props.children}
                </div>
                {/* footer */}
                <Footer data={this.props.site}/>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        site: state.site
    }
}

export default connect(mapStateToProps)(Layout);