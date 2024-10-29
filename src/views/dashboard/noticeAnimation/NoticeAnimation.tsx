
import React, { FC } from 'react';
import { Animated as RNAnimated, StyleSheet, Text ,View} from 'react-native';
import styles from './styles';
import { NoticeHeight } from '@utils/Scaling';
import Notice from '@views/component/Notice';


const NOTICE_HEIGHT = -[NoticeHeight + 12];
interface noticeState{
  noticePosition:any;
  children:React.ReactElement
}
const NoticeAnimation:FC<noticeState> = ({noticePosition,children})=> {
  console.log('noticePosition',noticePosition);

    return (
      <View style={styles.container}>
        <RNAnimated.View style={[styles.noticeContainer,{transform:[{translateY:noticePosition}]}]} >

          <Notice/>
        </RNAnimated.View>

        <RNAnimated.View style={[styles.contentContainer,{
          paddingTop:noticePosition.interpolate({
            inputRange:[NOTICE_HEIGHT,0],
            outputRange:[0,NOTICE_HEIGHT + 20],
          }),
        }]} >
          {children}
        </RNAnimated.View>
      </View>
    );
};


export default NoticeAnimation;
