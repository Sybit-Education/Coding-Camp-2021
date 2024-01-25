export default interface Material {
  id: string
  name: string
  notes: string
  synonyms: string
  category: Array<string>
  targets:  Array<string>
  creationTime: string,
}
