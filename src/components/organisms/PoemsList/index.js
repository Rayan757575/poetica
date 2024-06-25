import { Container, Text } from '~/components/atoms'
import { List, ListContainer } from './styles'
import { Poem } from '~/components/molecules'

export const PoemsList = ({ data }) => {
    return (
        <ListContainer>
            <List
                horizontal={true}
                data={data}
                renderItem={({ item }) => <Poem item={item} />}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() =><Container><Text>No Poem has been created yet</Text></Container>}
            />
        </ListContainer>
    )
}