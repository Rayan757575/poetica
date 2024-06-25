import logoImage from '~/assets/logoPoetica.png';
import { LogoImage } from './styles';

const sizes ={
    small: 100,
    large: 200
}

export const Logo = ({size}) => {
    return (
        <LogoImage source={logoImage} size={sizes[size || "large"]}/>
    )
}