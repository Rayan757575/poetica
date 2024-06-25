import { PoemContainer, PoemText } from './styles';
import { Text, SubTitle } from '~/components/atoms';
import { useNavigation } from '@react-navigation/native';
import { usePoemStore } from '~/services/stores';

export const Poem = ({ item }) => {
    const { setSelectedData } = usePoemStore()
    const navigation = useNavigation()

    const onSelectPoem = () => {
        setSelectedData(item)
        navigation.navigate('Text')
    }
    return (
        <PoemContainer onPress={() => onSelectPoem()}>
            <SubTitle color={'white'} mBottom={20}>{item.title}</SubTitle>
            <PoemText>
                <Text color={'white'}>{item.text}</Text>
            </PoemText>
        </PoemContainer>
    )
}