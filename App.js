import React from 'react';
import Index from "./src/Index";
import { Provider } from 'react-redux';
import { store } from './src/features/store';

const App = () => {

    return (
        <Provider store={store}>
            <Index/>
        </Provider>
    );
}



export default App;
