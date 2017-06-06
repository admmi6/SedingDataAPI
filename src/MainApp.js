import React, { PureComponent, Component, Proptypes } from 'react';
import {
Alert,
ScrollView,
StyleSheet,
Text,
TextInput,
TouchableOpacity,
View
} from 'react-native';

//const endpoint = 'https://my-bookmarks-api.herokuapp.com/api/bookmarks';
const endpoint1 = 'http://mhs.rey1024.com/1415051038/fitnessapp/addmhs.php';
//const endpoint2 = 'http://mhs.rey1024.com/1415051038/fitnessapp/getuser.php';
const endpoint3 = 'http://mhs.rey1024.com/1415051038/fitnessapp/json.php';

class MainApp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      nim: "",
      password: "",
      nama: "",
      no_hp: "",
      status: "",
    };
  }

  onLoad = async () => {
    this.setState({ result: 'Loading, please wait...' });
    const response = await fetch(endpoint3, {
      method: 'GET',
    });
    const result = await response.text();
    this.setState({ result });
  }

  onSave() {
    fetch(endpoint1 + '?nim=' + this.state.nim + '&password=' + this.state.password + '&nama=' + this.state.nama + '&no_hp=' + this.state.no_hp + '&status=' + this.state.status)
      .then((response) => response.json())
      .then((responseData) => {
        var id = responseData.id;
        if (id === -1) {
          Alert.alert("Gagal Input");
         }
         else
       {
          Alert.alert("Berhasil Input");
        }

      })
      .done();
  }


  render () {
    const { result, nim, password, nama, no_hp, status } = this.state;
    return (

      <View style={styles.container}>
      <ScrollView>
        <Text style={styles.toolbar}>Tambah Mahasiswa Baru </Text>
         <TextInput
          style={styles.input}
          onChangeText={(e) => this.setState({ nim: e })}
          text = {this.state.nim}
          placeholder="NIM"
        />
        <TextInput
         style={styles.input}
         onChangeText={(e) => this.setState({ password: e })}
         text = {this.state.password}
         placeholder="PASSWORD"
       />
        <TextInput
          style={styles.input}
          onChangeText={(e) => this.setState({ nama: e })}
          text = {this.state.nama}
          placeholder="NAMA"
        />
        <TextInput
         style={styles.input}
         onChangeText={(e) => this.setState({ no_hp: e })}
         text = {this.state.no_hp}
         placeholder="NO HP"
       />
       <TextInput
        style={styles.input}
        onChangeText={(e) => this.setState({ status: e })}
        text = {this.state.status}
        placeholder="STATUS"
      />

        <TouchableOpacity onPress={() => this.onSave()} style={styles.btn}>
            <Text>Simpan</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.onLoad} style={styles.btn}>
              <Text>Load</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.preview}
          value={result}
          placeholder="Hasil..."
          editable={false}
          multiline
        />
        </ScrollView>
      </View>
    );
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toolbar: {
    backgroundColor: '#CE93D8',
    color: '#fff',
    textAlign: 'center',
    padding: 15,
    fontSize: 20,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  preview: {
    backgroundColor: '#bdc3c7',
    flex: 1,
    height: 500,
  },
    input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    height: 40,
    padding: 5,
    marginBottom: 10,
    flex: 1,
  },
  btn: {
    backgroundColor: '#CE93D8',
    padding: 10,
    borderRadius: 3,
    marginBottom: 30,
    alignItems: 'center'

  },
});

export default MainApp;
