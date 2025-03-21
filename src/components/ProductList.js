import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import { addToCart } from '../store/CartSlice';

const products = [
  { 
    id: 101, 
    name: 'Laptop', 
    price: 800, 
    description: 'Powerful laptop with 16GB RAM and SSD storage.',
    stock: 10,  },
  { 
    id: 102, 
    name: 'Smartphone', 
    price: 500, 
    description: 'Latest smartphone with AMOLED display and 128GB storage.',
    stock: 15,
  },
  { 
    id: 103, 
    name: 'Tablet', 
    price: 300, 
    description: 'Lightweight tablet with 10-inch screen and 64GB storage.',
    stock: 5,
  },
];

const ProductList = () => {
  const dispatch = useDispatch();

  return (
    <div className="container mt-4">
      <h2 className="text-white">Products</h2>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4">
            <Card className="mb-3 bg-dark text-white">
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
                <Card.Text><strong>Stock:</strong> {product.stock} left</Card.Text>
                <Button 
                  variant="primary" 
                  onClick={() => dispatch(addToCart(product))}
                  disabled={product.stock === 0} // Disable button if out of stock
                >
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
