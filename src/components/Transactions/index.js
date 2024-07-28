import {Component} from "react"
import axios from "axios"
import {Link} from "react-router-dom";

import "./index.css"

const api = "https://artistsasses3-lb4sxsing-rjreddy111s-projects.vercel.app"

class Transactions extends Component {
    state = {
        transactionsData: []

    }


    componentDidMount(){
        axios.get(`http://localhost:4001/transactions`)
        .then (response => {
            this.setState({transactionsData: response.data.transactions})
        })
        .catch(e=>{
            console.log("error in fetching",e)
        })

    }

    render(){
        const {transactionsData} = this.state 
       console.log(transactionsData)
        const sortedTransaction = transactionsData.sort((a,b)=> b.id - a.id)
        
        return (
            <div className="main-container">
            <h1>Transaction Assignment</h1>
            <div>
                
                <table>
                    <thead>
                        <tr>
                            <th colSpan={4}>Office Trannsactions</th>
                            
                            
                            <th><Link to ="/add-transaction"><button>+add trannsaction</button> </Link></th>
                        </tr>
                        <tr>
                        <th></th>
                        <th></th>
                        <th>Debit</th>
                        <th>Credit</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTransaction.map((eachTransaction)=> (
                            <tr key = {eachTransaction.id}>
                                <td className="padding-allocation">{eachTransaction.date}</td>
                                
                                <td className="padding-allocation">{eachTransaction.description}</td>
                                <td className="padding-allocation">{eachTransaction.type==="debit"? parseInt(eachTransaction.amount) :""}</td>
                                <td className="padding-allocation">{eachTransaction.type==="credit" ? parseInt(eachTransaction.amount): ""}</td>
                                <td className="padding-allocation">{eachTransaction.running_balance}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                    
                </table>

            </div>
            </div>
        )
    }
}



export default Transactions