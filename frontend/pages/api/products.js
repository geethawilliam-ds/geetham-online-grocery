import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db('online_grocery')

    // Aggregation pipeline
    const products = await db.collection('products').aggregate([
      {
        $group: {
          _id: {
            product_name: { $trim: { input: "$product_name" } },
            category: { $trim: { input: "$category" } }
          },
          image: { $first: "$image_url" },
          description: { $first: "$description" },
          variants: {
            $push: {
              brand: "$brand",
              qty: { $concat: [ { $toString: "$variant_quantity" }, " ", "$unit" ] },
              price: "$variant_price"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id.product_name",
          category: "$_id.category",
          image: { $ifNull: ["$image", "/images/placeholder.png"] },
          description: 1,
          variants: 1
        }
      },
      { $sort: { name: 1 } } // optional: sort by product name
    ]).toArray()

    res.status(200).json(products)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
}
