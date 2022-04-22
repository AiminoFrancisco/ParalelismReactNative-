import nodejs from 'nodejs-mobile-react-native';
import React, {useEffect, useState} from 'react';
import {View, Button, Image} from 'react-native';

import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';
const App = () => {
  const [image, setImage] = useState('');
  const selectImage = () => {
    const options = {
      title: 'Selecciona una imagen/video',
      mediaType: 'image/video',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.errorCode) {
        console.log(response.errorMessage);
      } else {
        const path = response.assets[0].uri;
        setImage(path);
        nodejs.channel.post('node-echo',path)
        alert("TERMINE DE SUBIR")
      }
    });
  };
  useEffect(() => {
    nodejs.start('main.js');
    nodejs.channel.addListener('message', msg => {
      console.log('Finaliza ' + msg);
    });
  }, []);
  return (
    <View>
      <Button
        title="Message Node"
        onPress={() => {
          console.log('Se ejecuta segundo hilo');
          nodejs.channel.send('SEGUNDO HILO!');
        }}></Button>
      <Button
        title="Segundo Boton"
        onPress={() => console.log('HILO SINCRONO')}></Button>
      <Button
        title="Seleccionar Imagen/Video"
        onPress={() => {
          selectImage();
        }}></Button>
      <Image style={{height: 200, width: 200}} source={{uri: image}}></Image>
    </View>
  );
};
export default App;