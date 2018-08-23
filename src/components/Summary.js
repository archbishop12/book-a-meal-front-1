import React, { Component } from 'react';
import Navb from './Navbar3';
import OrderSum from './OrderSum';
import Modal from './Modal';
import { PropTypes } from 'prop-types';
import  { connect } from 'react-redux';
import { getOrders } from '../actions/orders';
import { deleteOrder } from '../actions/deleteOrder';

class Summary extends Component{
    constructor(props){
        super(props);
        this.state = {
            orders: [],
            isOpen: false
        }
    }

    componentWillMount(){
        console.log("Summary Data");
        console.log(this.props);
        this.props.getOrders();
    }

    componentWillReceiveProps(data){
        console.log("Component will recieve props")
        console.log(data.orderData)
        console.log(data.deleteOrderInfo)
    }

    toggleModal = (x) => {
        this.setState({
            isOpen: !this.state.isOpen,
            id: x
        });
        // this.setState({
        //     isOpen1: !this.state.isOpen1,
        //     id: x
        // }, () => {
        //     console.log(this.state.editMeal)
        // });
        console.log("Summary Data ");
        console.log(x);
        console.log(this.props);
    }

    handleDelete = () => {
        console.log(this.state);
        this.props.deleteOrder(this.state.id)
        console.log("Summary Delete");
        this.toggleModal()
    }

    render(){
        return(
            <div>
                <Navb />
                <br />
                <div className="container">
                    <h1>Summary For the day</h1>
                    <div className="summary">
                        <h3>Orders : 10</h3>
                        <h3>BreakFast:3</h3>
                        <h3>Lunch: 5</h3>
                        <h3>Supper: 2 </h3>
                        <h3>Total: 15000</h3>
                        <br/>
                    </div>
                </div>
                <OrderSum orders={this.props.orderData} toggleModalBtn={this.toggleModal.bind(this)} />
                <Modal show={this.state.isOpen}
                    onClose={this.toggleModal}>
                    Are you sure you want delete an order.
                    <br />
                    <br />
                    <button className="button" onClick={this.handleDelete}>
                        Delete Order
                    </button>
                </Modal>
            </div>    
        );
    }
}

Summary.propTypes = {
    getOrders: PropTypes.func.isRequired,
    deleteOrder: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    orderData: state.orders.orders,
    deleteOrderInfo: state.deleteOrder.message
})

export default connect(mapStateToProps, { getOrders, deleteOrder })(Summary);
