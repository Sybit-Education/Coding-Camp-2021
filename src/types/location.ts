import { Attachment } from "airtable"

export default interface Location {
  id: string
  name: string
  type: string
  image: Array<Attachment>
  notes: string
  link: string
  latitude: number
  longitude: number
}
