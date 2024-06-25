import { List } from './styles'
import { Notebook } from '~/components/molecules'

export const NotebooksList = ({ data }) => {
    return (
        <List
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            data={data}
            renderItem={({ item }) => <Notebook item={item} />}
            keyExtractor={(item) => item.id}
        />
    )
}