import { NotebookContainer, NotebookImage, NotebookText } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useNotebookStore } from '~/services/stores';

export const Notebook = ({ item }) => {
    const { setSelectedData } = useNotebookStore()
    const navigation = useNavigation()

    const onSelectNotebook = () =>{
        setSelectedData(item)
        navigation.navigate('Poems')
    }

    return (
        <NotebookContainer onPress={()=> onSelectNotebook()}>
            <NotebookImage source={item.wallpaper} />
            <NotebookText>{item.title}</NotebookText>
        </NotebookContainer>
    )
}