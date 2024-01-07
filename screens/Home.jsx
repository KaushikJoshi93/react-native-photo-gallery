import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View , FlatList , ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = (props) => {
  const [allImages , setAllImages] = useState([]);

  const fetchAllImages = async()=>{
    try {
      // console.log(process.env.EXPO_PUBLIC_API_URL)
      // fetch all the cached image url's from async storage
      const cachedImages = await AsyncStorage.getItem(process.env.EXPO_PUBLIC_IMAGE_KEY);
      let cachedJSON;
      if(cachedImages){
        cachedJSON = JSON.parse(cachedImages)
        setAllImages(cachedJSON)
      }
      let res = await fetch(process.env.EXPO_PUBLIC_API_URL);
      res = await res.json();
      if (res.photos && res.photos.photo && res.photos.photo.length) {
        const photoArr = res.photos.photo;
        const photoUrlsArr = photoArr.map(val => val.url_s)
        if(JSON.stringify(photoUrlsArr) !== JSON.stringify(cachedJSON)){
          console.log("changed...",cachedJSON)
          setAllImages(photoUrlsArr); // Use setAllImages to update the state
          // cache all the image url's
          await AsyncStorage.setItem(process.env.EXPO_PUBLIC_IMAGE_KEY,JSON.stringify(photoUrlsArr));
        }
      }
      // console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchAllImages();
  },[])

  
  return (
    <View style={styles.mainContainer}>
      {allImages.length ?  <FlatList
          data={allImages}
          renderItem={(obj)=><Image source={{uri:obj.item}} style={styles.imageStyle}/>}
          keyExtractor={(item , index)=>index.toString()}
          numColumns={2}
          />:
          <ActivityIndicator size={"large"}/>
        }
    </View>
  )
}


const styles = StyleSheet.create({
  mainContainer:{
    display:"flex",
    flex:1,
    gap:22,
  },
  imageStyle:{
    width:"50%",
    aspectRatio:1,
    margin:2
  },
})

export default Home