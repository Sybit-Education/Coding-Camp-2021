import { Attachment } from "airtable"

export default interface Tip {
  id: string
  title: string
  teaser: string
  teaserImage: Array<Attachment>
  teaserImageSource: string
  article: string
  materialCategory: Array<string>
  creationTime: string
}
