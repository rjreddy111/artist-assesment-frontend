


import { Component } from "react";
import axios  from "axios";


import { useNavigate } from "react-router-dom";

import "./index.css"

const api = "https://artistsasses3-lb4sxsing-rjreddy111s-projects.vercel.app"

class AddTransactions extends Component {
    state = {type:"", amount : "", description:"",date:"" }

    submitForm = (event)=> {
            event.preventDefault()
            const {type ,amount,description,date}  =this.state 
            console.log(type,amount,description,date)
            axios.post (`http://localhost:4001/transactions`, {type,amount,description,date}) 
                .then (response => {
                    this.setState({type:"", amount:"", description:"",date:""})
                    this.props.navigate("/")
                    
                })
                .catch(e=> {
                    console.log("Error found:", e)
                })

    }
    onChnageDescription = (event)=> {
        this.setState({description:event.target.value})
    }

    onChangeAmount=(event)=> {
        this.setState({amount:event.target.value})

    }
    onChnageDate = (event)=> {
        this.setState({date:event.target.value})
    }

    onChnageoption = (event)=> {
        this.setState({type:event.target.value})
    }
    onChangeDate = (event)=> {
        this.setState({date:event.target.value})
    }

    render(){
        const {amount,type,description,date} = this.state 
        console.log(amount,description,type)
        console.log(typeof(amount))
        return (
            <div className="new-transaction-main-bg">

            
            <h1 className="new_transactionheading">New Transaction</h1>
            <form onSubmit={this.submitForm}>
                <div className="each-enteries-container">
                    <h3 className="label-spacing">Transaction Type</h3>
                    <select onChange = {this.onChnageoption} className="enter-values"  >
                        <option value ="credit" defaultValue={"credit"}  >Credit</option>
                        <option value = "debit">Debit</option>
                    </select>
                </div>
                
                <div className="each-enteries-container">
                    <h3 className="label-spacing">Amount</h3>
                    <input type = "number" name = "amount" value ={amount} onChange = {this.onChangeAmount}  className="enter-values"  />
                </div>
                <div className="each-enteries-container">
                    <h3  className="label-spacing">Description</h3>
                    <input type = "text" name = "description" value = {description} onChange={this.onChnageDescription} className="enter-values"  />            
                </div>
                <div className="each-enteries-container">
                    <h3  className="label-spacing">
                    Date
                    </h3>
                    <input type ="date" value = {date} onChange= {this.onChangeDate} className="enter-values"  />
                </div>
                <div className="butons_container">
                    <button type ="submit" className="save-button">
            
                        Save</button>
                    <button className="cancel-button" type="button" onClick={() => this.props.navigate("/")}>Cancel</button>
                </div>
           

            </form>
            </div>
        )
    }
}



export default function AddTransactionWithRouter(props) {
    const navigate = useNavigate();
    return <AddTransactions {...props} navigate={navigate} />;
}