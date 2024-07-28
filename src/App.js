import {BrowserRouter,Route,Routes} from "react-router-dom"
import './App.css';
import Transactions from './components/Transactions';
import AddTransactions from "./components/AddTransactions";

const App = ()=> (
  <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Transactions/>} />
      <Route path = "/add-transaction" element = {<AddTransactions/>} />
    </Routes>
  </BrowserRouter>
)
export default App;
