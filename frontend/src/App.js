import './App.css';
import Header from "./components/Header";
import {Outlet} from "react-router-dom";

function App() {
    return (<>
        <Header/>
        {/*Outlet*/}
        <Outlet/>
        {/*Footer*/}
    </>);
}

export default App;

