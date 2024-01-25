export default interface MaterialRequest {
  name: string
  notes: string
  synonyms: string
  requester: {
    name: string
    email: string
    city: string
  }
}
