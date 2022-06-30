import { View, Text,StatusBar } from 'react-native'
import React from 'react'

import AuthNavigation from './AuthNavigation'

const App = () => {
  return (
    <>
      <StatusBar barStyle='light-content'/>
      <AuthNavigation/>
    </>
  )
}

export default App