
import React, { FC, useMemo } from 'react';
import { Image, View } from 'react-native';
import { imageData } from '@utils/dummyData';
import AutoScroll from '@homielab/react-native-auto-scroll';
import styles from './styles';

const ProductSlider = ()=> {
    const rows = useMemo(()=>{
        const result = [];
        for (let i = 0; i < imageData.length; i += 4) {
            result.push(imageData.slice(i,i + 4));
        }
        return result;
    },[]);

    return (
      <View pointerEvents="none">
        <AutoScroll style={styles.autoScroll} endPaddingWidth={0} duration={10000}>
            <View style={styles.gridContainer}>
                {rows?.map((row:any,rowIndex:number)=>{
                    return(
                    <MemoizeRow row={row} rowIndex={rowIndex}/>
                    );
                })}
            </View>
        </AutoScroll>
      </View>
    );
};

const Row:FC<{row:typeof imageData;rowIndex:number}> = ({row,rowIndex})=>{
    const horizontalShift = rowIndex % 2 === 0 ? 18 : -18;
    return(
        <View style={styles.row}>
            {row.map((image)=>{
                return(
                    <View key={rowIndex} style={[styles.itemContainer,{transform:[{translateX:horizontalShift}]}]}>
                        <Image source={image} style={styles.image}/>
                    </View>
                );
            })}
        </View>
    );
};

const MemoizeRow = React.memo(Row);

export default ProductSlider;
