import DeviceUiInfo from '@utils/deviceUiInfo';

const type = {
  rubikMedium: 'Rubik-Medium',
  rubikRegular: 'Rubik-Regular',
  rubikSemiBold: 'Rubik-SemiBold',
};

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  smallMedium: 16,
  small: 12,
  tiny: 8.5,
  f4: DeviceUiInfo.moderateScale(4),
  f8: DeviceUiInfo.moderateScale(8),
  f9: DeviceUiInfo.moderateScale(9),
  f10: DeviceUiInfo.moderateScale(10),
  f11: DeviceUiInfo.moderateScale(11),
  f12: DeviceUiInfo.moderateScale(12),
  f13: DeviceUiInfo.moderateScale(13),
  f14: DeviceUiInfo.moderateScale(14),
  f15: DeviceUiInfo.moderateScale(15),
  f16: DeviceUiInfo.moderateScale(16),
  f17: DeviceUiInfo.moderateScale(17),
  f18: DeviceUiInfo.moderateScale(18),
  f19: DeviceUiInfo.moderateScale(19),
  f20: DeviceUiInfo.moderateScale(20),
  f22: DeviceUiInfo.moderateScale(22),
  f24: DeviceUiInfo.moderateScale(24),
  f26: DeviceUiInfo.moderateScale(26),
  f28: DeviceUiInfo.moderateScale(28),
  f30: DeviceUiInfo.moderateScale(30),
  f38: DeviceUiInfo.moderateScale(38),
  f75: DeviceUiInfo.moderateScale(75),
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2,
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3,
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4,
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5,
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6,
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular,
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium,
  },
};

export default {
  type,
  size,
  style,
};
