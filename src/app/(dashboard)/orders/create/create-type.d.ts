export interface Package {
  id: string
  name: string
  price: string
  deliveryDays: string
  revisions: string
  features: string[]
  description: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
}
