import React from 'react'
import { View, Image, ActivityIndicator, StatusBar, StyleSheet, Dimensions } from 'react-native'
import Toast from 'react-native-simple-toast'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width


const showToast = (msg, type) => {
    if (msg) {
        Toast.show(msg, 3000)
    } else {
        // Toast.show('Default Toast', 3000)
    }

}
const validationBlank = (value, msg) => {
    console.log('value --> ', value)
    if (value === '') {
        showToast(msg)
    } else if (value === undefined) {
        showToast(msg)
    } else if (value === null) {
        showToast(msg)
    } else if (value.length < 1) {
        showToast(msg)
    } else if (value === false) {
        showToast(msg)
    } else {
        return true
    }
}
const validationempty = (value) => {
    if (value === '') {
    } else if (value === undefined) {
    } else if (value === null) {
    } else if (value.length < 1) {
    } else {
        return true
    }
}

export {
    HEIGHT, WIDTH, showToast,validationBlank, validationempty,
}
