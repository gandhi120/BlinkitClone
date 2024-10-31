
import React, { FC } from 'react';
import { Animated as RNAnimated ,View} from 'react-native';
import styles from './styles';
import { NoticeHeight } from '@utils/Scaling';
import Notice from '@views/component/dashboard/Notice';


const NOTICE_HEIGHT = -[NoticeHeight + 12];
interface noticeState{
  noticePosition:any;
  children:React.ReactElement
}
const NoticeAnimation:FC<noticeState> = ({noticePosition,children})=> {

    return (
      <View style={styles.container}>
        <RNAnimated.View style={[styles.noticeContainer,{transform:[{translateY:noticePosition}]}]} >

          <Notice/>
        </RNAnimated.View>

        <RNAnimated.View style={[styles.contentContainer,{
          paddingTop:noticePosition.interpolate({
            inputRange:[NOTICE_HEIGHT,0],
            outputRange:[0,NoticeHeight + 20],
          }),
        }]} >
          {children}
        </RNAnimated.View>
      </View>
    );
};


export default NoticeAnimation;
