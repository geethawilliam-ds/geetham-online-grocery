import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  try {
    const cart = req.body

    if (!cart || Object.keys(cart).length === 0) {
      return res.status(400).json({ error: 'Cart is empty' })
    }

    const line_items = Object.values(cart).map(item => {
      if (!item.name || !item.price) {
        throw new Error('Invalid cart item')
      }

      return {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(Number(item.price) * 100), // pence
        },
        quantity: item.quantity ? Number(item.quantity) : 1,
      }
    })

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cart`,
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err.message)
    return res.status(500).json({ error: err.message })
  }
}
