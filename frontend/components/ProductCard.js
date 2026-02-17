import { useState } from "react";

export default function ProductCard({ product, onAdd }) {
  if (!product) return null; // Safety check if product is undefined

  const variants = product.variants || []; // Fallback if variants is undefined

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedQty, setSelectedQty] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);

  // Get unique brands
  const brands = [...new Set(variants.map(v => v.brand))];

  // Get quantities for selected brand
  const quantities = selectedBrand
    ? [...new Set(
        variants
          .filter(v => v.brand === selectedBrand)
          .map(v => v.qty)
      )]
    : [];

  // Handle brand selection
  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    setSelectedQty(""); // Reset quantity when brand changes
    setSelectedPrice(0);
  };

  // Handle quantity selection
  const handleQtyChange = (qty) => {
    setSelectedQty(qty);
    const variant = variants.find(
      v => v.brand === selectedBrand && v.qty === qty
    );
    if (variant) setSelectedPrice(variant.price);
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!selectedBrand || !selectedQty) return;

    const variant = variants.find(
      v => v.brand === selectedBrand && v.qty === selectedQty
    );

    if (!variant) return;

    onAdd({
      name: product.name,
      brand: variant.brand,
      qty: variant.qty,
      price: variant.price,
      quantity: 1
    });
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '10px',
      borderRadius: '8px',
      background: '#fff',
      width: '220px',
      marginBottom: '20px'
    }}>
      <img
        src={product.image || "/images/placeholder.png"}
        alt={product.name}
        style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '10px' }}
      />

      <h4 style={{ marginBottom: '5px' }}>{product.name}</h4>
      <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '10px' }}>{product.description}</p>

      {/* Brand dropdown */}
      <select
        value={selectedBrand}
        onChange={e => handleBrandChange(e.target.value)}
        style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
      >
        <option value="">Select Brand</option>
        {brands.map((brand, idx) => (
          <option key={idx} value={brand}>{brand}</option>
        ))}
      </select>

      {/* Quantity dropdown */}
      <select
        value={selectedQty}
        onChange={e => handleQtyChange(e.target.value)}
        disabled={!selectedBrand}
        style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
      >
        <option value="">Select Quantity</option>
        {quantities.map((qty, idx) => (
          <option key={idx} value={qty}>{qty}</option>
        ))}
      </select>

      <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        Price: £{selectedPrice.toFixed(2)}
      </p>

      <button
        onClick={handleAddToCart}
        disabled={!selectedBrand || !selectedQty}
        style={{
          width: '100%',
          padding: '8px',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
