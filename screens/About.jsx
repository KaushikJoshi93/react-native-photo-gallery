import React from 'react'
import { StyleSheet, Text,View } from 'react-native'

const About = () => {
  return (
    <View style={styles.mainContainer}>
        <Text style={{fontSize:18}}>Here you will find photos related to every type</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    display:"flex",
    justifyContent:'center',
    alignItems:'center'
  }
})

export default About