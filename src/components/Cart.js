import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Form } from 'react-bootstrap';
import { removeFromCart, updateQuantity } from '../store/CartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);

  if (!cartItems.length) {
    return <h2 className="text-center mt-4">Cart is Empty</h2>;
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>
                <Form.Control
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={e => dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))} 
                />
              </td>
              <td>${item.price * item.quantity}</td>
              <td>
                <Button variant="danger" onClick={() => dispatch(removeFromCart(item.id))}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h4>Total Price: ${totalPrice}</h4>
    </div>
  );
};

export default Cart;
