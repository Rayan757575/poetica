import { Container, PoemsList, SubTitle } from "~/components"
import { usePoems } from "~/services/hooks"
import { useNotebookStore } from "~/services/stores" //para pegar o titulo do notebook selecionado
import { useEffect, useState } from 'react'

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
    const [poemsList, setPoemsList] = useState([])
    const { getPoems } = usePoems()
    
    const callGetPoems = async () => {
      const poems = await getPoems()
      setPoemsList(poems)
    }
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        callGetPoems()
      })
      return unsubscribe;
    }, [])
    const { selectedNotebook } = useNotebookStore()
    // usar o poemsList no luggar de poems data
    return (
        <Container >
            <Container marginTop={24} h={88} bg={'light'} justify={'center'} align={'center'}>
                <SubTitle>{selectedNotebook.title}</SubTitle>
            </Container>
            <PoemsList data={POEMS_DATA} /> 
        </Container>
    )
}