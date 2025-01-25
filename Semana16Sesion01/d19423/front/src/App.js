import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Cancel from "./components/Cancel";
import Success from "./components/Success";
import StripePayment from "./components/StripePayment";

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/success" element={<Success/>} />
                <Route path="/cancel" element={<Cancel/>} />
                <Route path="/" element={<StripePayment/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;