import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function Events() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.quadrobranco}>
          <View style={styles.box2}>
            <Image source={require('../../assets/img/banner.png')} style={styles.banner} />
            <Image source={require('../../assets/img/calendar.png')} style={styles.calendar} />

            <View style={styles.descricao}>
              <Text style={styles.aberto}>Aberto</Text>

              <View style={styles.iniciodata}>
                <Text style={styles.Inicio}>Início:</Text>
                <Text style={[styles.Inicio, styles.data1]}>05 ago. 2022</Text>
              </View>

              <View style={styles.terminodata}>
                <Text style={styles.Termino}>Término:</Text>
                <Text style={[styles.Termino, styles.data]}>01 set. 2022</Text>
              </View>
            </View>

            <Text style={styles.horizontes}>Horizontes Empreendedores</Text>
            <Text style={styles.inovador}>
              É um evento inovador destinado a explorar novas oportunidades no mundo dos negócios.
            </Text>

            <View style={styles.local}>
              <Text style={styles.localtext}>Local:</Text>
              <Text style={[styles.localtext, styles.local1]}>Etec Martinho Di Ciero</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.baixo}>
              <Image source={require('../../assets/img/design.png')} style={styles.design} />
              <Image source={require('../../assets/img/art.png')} style={[styles.design, styles.art, styles.code]} />
              <Image source={require('../../assets/img/code.png')} style={[styles.design, styles.art, styles.code]} />
            </View>

            <Text style={styles.texteventos}>STANDS</Text>

            <View style={styles.boxifood}>
              <Image source={require('../../assets/img/banner.png')} style={styles.bannerifood} />

              <View style={styles.descricao2}>
                <Text style={styles.ifood}>IFOOD</Text>
                <Text style={styles.participe}>Venha participar do desafio e ganhe uma pizza!</Text>

                <View style={styles.local2}>
                  <Text style={styles.localtext2}>Local:</Text>
                  <Text style={[styles.localtext2, styles.local3]}>Lab 6 - mesa 4</Text>
                </View>

                <View style={styles.perfil}>
                  <Image source={require('../../assets/img/perfil.png')} style={styles.fotoperfil} />
                  <Text style={styles.nomeperfil}>IFOOD</Text>

                  <View style={styles.baixo}>
                    <Image source={require('../../assets/img/design.png')} style={styles.design} />
                    <Image source={require('../../assets/img/art.png')} style={[styles.design, styles.art, styles.code]} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.rodape}>
          <Image source={require('../../assets/img/rodape.png')} style={styles.rodape2} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  quadrobranco: {
    alignContent: 'center',
    backgroundColor: '#fff',
    width: 360,
    height: 1000,
  },
  box2: {
    width: 330,
    height: 380,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#B9C2D3',
    marginLeft: 15,
    marginTop: 10,
  },
  banner: {
    width: 285,
    height: 195,
    marginTop: 15,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  calendar: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 50,
    backgroundColor: '#0766CF',
    position: 'absolute',
    marginHorizontal: 150,
    marginTop: 182,
  },
  descricao: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 26,
    marginHorizontal: 20,
  },
  aberto: {
    fontSize: 10,
    color: 'lightgreen',
  },
  iniciodata: {
    flexDirection: 'row',
    gap: 5,
  },
  Inicio: {
    fontSize: 10,
  },
  data1: {
    opacity: 0.4,
  },
  terminodata: {
    flexDirection: 'row',
    gap: 5,
  },
  Termino: {
    fontSize: 10,
  },
  data: {
    opacity: 0.4,
  },
  horizontes: {
    fontSize: 14,
    marginTop: 11,
    margin: 20,
    fontWeight: 'bold',
  },
  inovador: {
    fontSize: 10,
    marginTop: -10,
    margin: 20,
  },
  local: {
    flexDirection: 'row',
    margin: 20,
    marginTop: -11,
    gap: 5,
  },
  localtext: {
    fontSize: 10,
  },
  local1: {
    opacity: 0.4,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    margin: 20,
    marginTop: -9,
  },
  baixo: {
    flexDirection: 'row',
    gap: 10,
    marginLeft: 20,
  },
  texteventos: {
    color: '#0766CF',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 26,
  },
  boxifood: {
    width: 330,
    height: 200,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#B9C2D3',
    marginTop: 10,
  },
  bannerifood: {
    marginHorizontal: 90,
    width: 148,
    height: 61,
    marginTop: 15,
    borderRadius: 5,
  },
  ifood: {
    fontSize: 14,
    marginTop: 3,
    margin: 20,
    fontWeight: 'bold',
  },
  participe: {
    fontSize: 10,
    marginTop: -15,
    margin: 20,
  },
  localtext2: {
    fontSize: 10,
  },
  local2: {
    flexDirection: 'row',
    margin: 20,
    marginTop: -15,
    gap: 5,
  },
  local3: {
    opacity: 0.4,
    color: 'green',
  },
  perfil: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  fotoperfil: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginLeft: 20,
  },
  nomeperfil: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  rodape: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 50,
  },
  rodape2: {
    width: 360,
    height: 50,
    flex: 1,
    position: 'absolute',
  },
});
