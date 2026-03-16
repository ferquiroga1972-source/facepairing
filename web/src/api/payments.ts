import client from './client'

export const createCheckout = () =>
  client.post<{ checkout_url: string }>('/payments/create-checkout')
