import { Container, Text, NotebooksList } from '~/components'
import { useNotebooks } from '~/services/hooks'
import { useEffect, useState } from 'react'
import Image2 from '~/assets/vangogh-2.jpg'
import Image from '~/assets/vangogh.jpg'

const NOTEBOOKS_DATA = [
  {
    id: 0,
    title: 'Test',
    wallpaper: Image
  },
  {
    id: 1,
    title: 'Outros',
    wallpaper: Image2
  },
  {
    id: 2,
    title: 'alks',
    wallpaper: Image
  },
  {
    id: 3,
    title: 'Outro dia...',
    wallpaper: Image2
  },

]

export const NotebookScreen = ({ navigation }) => {
  const [notebooksList, setNotebooksList] = useState([])
  const { getNotebooks } = useNotebooks()

  const callGetNotebooks = async () => {
    const notebooks = await getNotebooks()
    setNotebooksList(notebooks)
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      callGetNotebooks()
    })
    return unsubscribe;
  }, [])


    // usar o notebooks no lugar de notebook data
  return (
    <Container >
      <Container marginLeft={44} h={108} direction={'row'} bg={'light'} align={'center'} >
        <Text fontFamily='medium' size={28}>Notebooks</Text>
      </Container>
      <NotebooksList data={NOTEBOOKS_DATA} />
    </Container>
  )
}