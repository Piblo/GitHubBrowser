import React, {Component, Text, View, StyleSheet, ViewPagerAndroid} from 'react-native';

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<View style={styles.container}>
       <ViewPagerAndroid
		      style={styles.viewPager}
		      initialPage={0}>
		      <View style={styles.pageStyle}>
		        <Text>First page</Text>
		      </View>
		      <View style={styles.pageStyle}>
		        <Text>Second page</Text>
		      </View>
		    </ViewPagerAndroid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  	flex: 1,
  	justifyContent: 'center',
  	alignItems: 'center',
  	backgroundColor: 'F5FCFF'
  },
  welcome: {
  	fontSize: 20,
  	textAlign: 'center',
  	margin: 10
  },
  viewPager: {
    flex: 1,
  },
   pageStyle: {
    alignItems: 'center',
    padding: 20,
  }
});