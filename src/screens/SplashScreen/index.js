import { StatusBar } from 'expo-status-bar';
import {useEffect} from 'react'
import { Logo, Title, Container } from '~/components/atoms' 

export const SplashScreen = ({navigation}) => {
    useEffect(() => {
        setTimeout(()=> {
            navigation.navigate('HomeBottomBar')
        }, 2000);
    }, [navigation])
    return (
        <Container bg={'white'} align={'center'} justify={'center'}>
            <Logo/>
            <Title>Poética</Title>
            <StatusBar style="auto" />
        </Container>
    )
}
