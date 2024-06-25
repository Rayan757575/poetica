import { HeaderContainer, HeaderImageBackground, HeaderGradient } from "./styles";
import { Logo } from "~/components/atoms";
import { colors } from "~/styles/colors";
import image from '~/assets/wallpaper1.jpg'

//colocar um sistema para mudar o url da imagem
export const Header = ({image_url}) => {
    return (
        <HeaderContainer>
            <HeaderImageBackground source={image_url}>
                <HeaderGradient colors={['transparent', colors.white]}>
                    <Logo size={'small'} />
                </HeaderGradient>
            </HeaderImageBackground>
        </HeaderContainer>
    )
}