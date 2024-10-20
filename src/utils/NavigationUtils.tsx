import { CommonActions, createNavigationContainerRef, StackActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const  navigate = async(routeName:string,params?:object)=>{
    navigationRef.isReady();
    if(navigationRef.isReady()){
        navigationRef.dispatch(CommonActions.navigate(routeName,params));
    }
};

export const  replace = async(routeName:string,params?:object)=>{
    navigationRef.isReady();
    if(navigationRef.isReady()){
        navigationRef.dispatch(StackActions.replace(routeName,params));
    }
};

export const  resetAndNavigate = async(routeName:string)=>{
    navigationRef.isReady();
    if(navigationRef.isReady()){
        navigationRef.dispatch(CommonActions.reset(
            {
                index:0,
                routes:[{name:routeName}],
            }
        ));
    }
};

export const  goBack = async()=>{
    navigationRef.isReady();
    if(navigationRef.isReady()){
        navigationRef.dispatch(CommonActions.goBack());
    }
};

export const  push = async(routeName:string,params?:object)=>{
    navigationRef.isReady();
    if(navigationRef.isReady()){
        navigationRef.dispatch(StackActions.push(routeName,params));
    }
};

export const  prepareNavigation = async()=>{
    navigationRef.isReady();
};
