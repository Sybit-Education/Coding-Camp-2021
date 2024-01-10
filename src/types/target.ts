import { Attachment } from "airtable"

export default interface Target {
  id:string
  name: string
  color: string
  images: Array<Attachment>
  description: string
  targetAction: string
  targetLink: string
  targetLabel: string
  type: string
}
