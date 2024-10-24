import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export default function useKeyBoardOffsetHeight(){
    const [keyboardOffsetHeight,setKeyboardOffsetHeight] = useState(0);

    useEffect(()=>{


        const keyBoardWillAndroidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            e=>{
                setKeyboardOffsetHeight(e.endCoordinates.height);
            }
        );

        const keyBoardWillAndroidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            ()=>{
                setKeyboardOffsetHeight(0);
            }
        );

        const keyBoardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            e=>{
                setKeyboardOffsetHeight(e.endCoordinates.height);

            }
        );

        const keyBoardWillHideListener = Keyboard.addListener(
            'keyboardWillHide',
            ()=>{
                setKeyboardOffsetHeight(0);

            }
        );





return()=>{
    keyBoardWillAndroidHideListener.remove();
    keyBoardWillAndroidShowListener.remove();
    keyBoardWillShowListener.remove();
    keyBoardWillHideListener.remove();
};



    },[]);

    return keyboardOffsetHeight;
}
