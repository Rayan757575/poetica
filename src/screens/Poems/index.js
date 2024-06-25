import { Container, PoemsList, SubTitle } from "~/components"
import { useNotebookStore } from "~/services/stores"


const POEMS_DATA = [
    {
        id: 0,
        title: 'Test1',
        text: 'Textjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj3'
    },
    {
        id: 1,
        title: 'Test2',
        text: 'Text2'
    },
    {
        id: 2,
        title: 'Test3',
        text: 'Textjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj3'
    },
]

//refatorar o segundo container como um organismo

export const Poems = () => {
    const { selectedNotebook } = useNotebookStore()
    return (
        <Container >
            <Container marginTop={24} h={88} bg={'light'} justify={'center'} align={'center'}>
                <SubTitle>{selectedNotebook.title}</SubTitle>
            </Container>
            <PoemsList data={POEMS_DATA} />
        </Container>
    )
}