import {Dimensions, PixelRatio, Platform} from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import DeviceInfo from 'react-native-device-info';
import {isIphoneX} from 'react-native-iphone-x-helper';

const {width, height} = Dimensions.get('window');

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

// based on iphone 5s's scale
const scaleRatio = width / 320;

export default class DeviceUiInfo {
  static platform = Platform.OS;

  static isIphone = Platform.OS === 'ios';

  static isAndroid = Platform.OS === 'android';

  static screenSize = {width, height};

  static deviceSize = {deviceWidth, deviceHeight};

  static screenSizeWithPixelRatio = {
    width: width * PixelRatio.get(),
    height: height * PixelRatio.get(),
  };

  // static guidelineBaseWidth = 350;
  // static guidelineBaseHeight = 680;

  static guidelineBaseWidth = 350;

  static guidelineBaseHeight = 680;

  static isIphoneX = isIphoneX();

  static isTablet = DeviceInfo.isTablet();

  static appVersion = DeviceInfo.getVersion();

  static softBarHeight =
    Platform.OS === 'android' ? ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT') : 0;

  static statusBarHeight =
    Platform.OS === 'android' ? ExtraDimensions.get('STATUS_BAR_HEIGHT') : 0;

  static isIphone5 = !!(
    Platform.OS === 'ios' &&
    height === 568 &&
    width === 320
  );

  static isSmallDevice() {
    if (Platform.OS === 'android') {
      if (height < 650 && width < 365) {
        return true;
      }
    } else if (Platform.OS === 'ios') {
      if (height < 580 && width < 340) {
        return true;
      }
    }
    return false;
  }

  static storeVersion = null;

  static init() {}

  static getPlatform() {
    return this.platform;
  }

  static getScreenSize() {
    return this.screenSize;
  }

  static getScreenSizeWithPixelRatio() {
    return this.screenSizeWithPixelRatio;
  }

  // static isIphoneX() {
  //   return this.isIphoneX;
  // }

  static scale(size) {
    return (this.screenSize.width / this.guidelineBaseWidth) * size;
  }

  static verticalScale(size) {
    return (this.screenSize.height / this.guidelineBaseHeight) * size;
  }

  static moderateScale(size, factor = 0.4) {
    return size + (this.scale(size) - size) * factor;
  }

  static normalize(size) {
    const newSize = size * scaleRatio;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    }
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
}
