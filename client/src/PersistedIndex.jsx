import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistedStore } from './redux/persistedStore'
import { store } from './redux/store'

const PersistedIndex = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistedStore}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default PersistedIndex