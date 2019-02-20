import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { Appbar, DefaultTheme, FAB, List, TouchableRipple } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

import Theme from './Theme';

import AppContext from '../context/AppContext';

const FABAnimated = Animatable.createAnimatableComponent(FAB);

export default class BeersScreen extends React.Component {

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <View style={styles.baseContainer}>
            <Appbar.Header theme={Theme}>
              <Appbar.Content
                title='Cervezas'
                style={{color: '#fff'}}
              />
            </Appbar.Header>
            <View style={styles.body}>
              <View style={styles.dinamicContent}>
                <ScrollView>
                  {context.state.beers.map(beer => {
                    return (
                      <TouchableRipple key={beer.id} onPress={() => this.props._setView(1, beer)}>
                        <List.Item left={props => <List.Icon {...props} icon="fiber-manual-record" color={beer.color} id={beer.id}/>} title={beer.name} right={props => <List.Icon {...props} icon="keyboard-arrow-right"/>}/>
                      </TouchableRipple>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
            <FAB
              theme={Theme}
              style={styles.fab}
              icon="add"
              onPress={() => this.props._setView(2, null)}
            />
          </View>
        )}
      </AppContext.Consumer>
    );
  }
}

const textInputStyle = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5b7ce5',
    accent: '#2b6aeb',
    surface: '#fff',
    background: '#fff'
  }
}

const fabTheme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5b7ce5',
    accent: '#2b6aeb',
    surface: '#fff',
    background: '#fff'
  }
}

const styles = StyleSheet.create({
  accordions: {
    backgroundColor: '#fff'
  },
  baseContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8'
  },
  noBorder: {
    borderWidth: 0,
  },
  body: {
    padding: 10
  },
  dinamicContent: {
    backgroundColor: '#fff',
    borderRadius: Theme.roundness,
    maxHeight: 440
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  },
});