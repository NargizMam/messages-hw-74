export interface Post {
   id: string,
   message: string,
   datetime: string
}
export type PostWithoutId = Omit<Post, 'id'>;