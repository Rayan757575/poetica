import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

// Base única de responsividade do app — substitui o metrics.js do v1.
// scale() calcula em proporção à largura real da tela, verticalScale()
// à altura, moderateScale() suaviza esse crescimento (bom pra
// paddings/fontes, pra não ficarem exagerados em telas muito grandes).
export { scale, verticalScale, moderateScale };