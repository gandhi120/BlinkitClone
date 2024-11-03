// WalletSection



import { Colors } from '@utils/Constants';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import WalletItem from './WalletItem';

const WalletSection = () => {


  return (
    <View style={styles.walletContainer}>
      <WalletItem icon="wallet-outline" label="wallet"/>
      <WalletItem icon="chatbubble-ellipses-outline" label="Support"/>
      <WalletItem icon="cart-outline" label="Payments"/>

    </View>
  );
};

const styles = StyleSheet.create({
  walletContainer: {
    justifyContent:'space-around',
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:Colors.backgroundSecondary,
    paddingVertical:15,
    borderRadius:15,
    marginVertical:20,
  },
  greetingText: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default WalletSection;
