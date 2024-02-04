import React from 'react';
import "./styles.css"
import Index from "./src/Index";
import { Provider } from 'react-redux';
import { store } from './src/redux/store';


const App = () => {
    return (
        <Provider store={store}>
            <Index/>
        </Provider>
    );
}

export default App;
