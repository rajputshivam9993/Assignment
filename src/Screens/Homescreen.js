import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  SafeAreaView,
  Modal,
  TextInput,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SearchBar, Icon} from 'react-native-elements';

const Homescreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setNatureData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const Adduser = async () => {
    try {
      let data = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastname,
          age: 250,
        }),
      });
      const res = await data.json();
      console.log(res);
      Alert.alert(
        'Successfully',
        'Product added successfully',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK pressed'),
            style: 'default',
          },
        ],
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products', {
        method: 'GET',
      });
      const json = await response.json();
      setNatureData(json);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../Assets/logo.png')}
          style={{
            width: 30,
            height: 30,
            marginTop: 11,
            marginBottom: 5,
          }}
        />
        <TouchableOpacity>
          <Image
            source={require('../Assets/slide.png')}
            style={{
              width: 30,
              height: 30,
              marginLeft: '85%',
              marginTop: 11,
              marginBottom: 5,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headerW}></View>
      <View style={styles.card}>
        <SearchBar
          placeholder="Search..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
          }}
          inputContainerStyle={{backgroundColor: '#FFFFFF'}}
          inputStyle={{color: 'black'}}
          searchIcon={() => (
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../Assets/search.png')}
                style={{
                  width: 10,
                  height: 10,
                }}
              />
              <Image
                source={require('../Assets/bell.png')}
                style={{
                  width: 10,
                  marginLeft:10,
                  height: 13,
                }}
              />
            </View>
          )}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.Button}>
            <Text style={styles.Buttontxt}>Add Customer</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.text}>Product List</Text>
        <Text style={styles.textname}>Product List Items</Text>

        <ScrollView>
          {data && data.products ? (
            data.products.map((product, index) => (
              <View key={index} style={styles.List}>
                <Text style={styles.customer}>Limit: {data.limit}</Text>
                <Text>Brand: {product.brand}</Text>
                <Text>Category: {product.category}</Text>
                <Text>{product.description}</Text>
              </View>
            ))
          ) : (
            <Text style={{marginTop: 20}}>No </Text>
          )}
        </ScrollView>
      </View>

      {/* Popup Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>Add Customer Details</Text>
          <Text>You can add as much customer you want</Text>
          <TextInput
            style={styles.input}
            onChangeText={setFirstname}
            value={firstName}
            placeholder="first Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={setLastname}
            value={lastname}
            placeholder="last name"
          />
<View style={{flexDirection: 'row'}}>
  <Button title="Close" onPress={() => setModalVisible(false)} />
  <Button title="Add" color="#11009E" onPress={Adduser} />
</View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#11009E',
    flex: 1,
  },

  card: {
    marginTop: 30,
    height: 680,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 12,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  header: {
    height: 53,
    width: '100%',
    backgroundColor: '#11009E',
    lineHeight: 5,
    flexDirection: 'row',
  },
  List: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 50,
    marginBottom: 8,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 20,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textname: {
    marginTop: 15,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  headerW: {
    height: 1,
    backgroundColor: '#4F709C',
  },
  customer: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  Button: {
    backgroundColor: '#11009E',
    borderRadius: 5,
    marginLeft: 245,
    marginTop: 10,
    padding: 6,
  },

  Buttontxt: {
    color: '#fff',
    textAlign:'center'
  },
  modalContent: {
    marginTop: 300,
    backgroundColor: '#EEEEEE',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 40,
    justifyContent: 'center',
  },
});
