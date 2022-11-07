import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert, Modal, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Separator = () => (
  <View style={styles.separator} />
);

function Clientes({ navigation }) {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await fetch('http://localhost:7217/api/Cliente');
      setClientes(await response.json());
    }
    fetchMyAPI();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={styles.fixToText}>
        <Button color='#034C8C'
          title="Clientes"
          onPress={() => navigation.navigate('Clientes')}
        />
  
        <Button color='#034C8C'
          title="Hospedagens"
          onPress={() => navigation.navigate('Hospedagem')}
        />
       
      </View>
      <View style={styles.fixToList}>
        <Text style={{ width: '10%' }}>Id</Text>
        <Text style={{ width: '30%' }}>Nome</Text>
        <Text style={{ width: '30%' }}>Cpf</Text>
        <Text style={{ width: '30%' }}>Email</Text>
      </View>
      {clientes.map(cli => (
        <View>
          <View style={styles.fixToList}>
            <Text style={{ width: '10%' }}>{cli.id}</Text>
            <Text style={{ width: '30%' }}>{cli.nome}</Text>
            <Text style={{ width: '30%' }}>{cli.cpf}</Text>
            <Text style={{ width: '30%' }}>{cli.email}</Text>
          </View>
          <Separator />
        </View>
      ))}
    </View>
  );
};


const Stack = createNativeStackNavigator();


function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Cliente'>
        <Stack.Screen
          name="Clientes" component={Clientes} options={{
            title: 'Clientes',
            headerStyle: { backgroundColor: '#034C8C', }, headerTintColor: '#fff'
          }} />
          </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo1: {
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 50,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  fixToList: {
    flexDirection: 'row',
  },
});