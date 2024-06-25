import { StatusBar } from 'expo-status-bar';
import { SubTitle, Container, Header, ContinueButton, Text } from '~/components'

//reatorar o container como um sign up organism
export const Welcome = () => {
    return (
        <Container>
            <Header />
            
            <Container h={600} align={'center'} bg={'white'}>
                <SubTitle size={28} mBottom={15}>Welcome Poética</SubTitle>
                <ContinueButton bg={'primary'} color={'white'} >Sign up for free</ContinueButton>
                <Text size={18}>Or</Text>
                <ContinueButton IconName={'logo-apple'}>Continue with Apple</ContinueButton>
                <ContinueButton IconName={'logo-google'}>Continue with Google</ContinueButton>
            </Container>
        </Container>
    )
}
