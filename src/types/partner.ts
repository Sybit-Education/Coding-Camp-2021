import { Attachment } from "airtable"

export default interface Partner {
  id: string
  name: string
  notes: string
  logo: Array<Attachment>
  website: string
}
