import { StatusBar } from 'expo-status-bar';
import { ScreenScrollContainer, Text } from '~/components'
import { IconButton } from '~/components/molecules/iconButtons';
import { useNotebooks } from '~/services/hooks';


//reatorar o container como um sign up organism
export const Home = () => {
    const { createNotebook, getNotebooks, deleteNotebook } = useNotebooks()
    const item = [
        id = 0,
        name = 'my poems',
        wallpaper= '~/assets/wallpaper1.jpg'
    ]

    const createNewNotebook = async () => {
        const result = await createNotebook(item)
    }

    return (
        <ScreenScrollContainer withPadding >
            <Text fontFamily="medium" size={28}>Home</Text>
            <IconButton iconName={'add-circle-outline'} onPress={() => createNewNotebook()} />
        </ScreenScrollContainer>
    )
}
