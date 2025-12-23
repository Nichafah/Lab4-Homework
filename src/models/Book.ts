export interface BookListItem {
    id: number
    title: string
    category: string
    author?: {
        name: string
    } | null
}
