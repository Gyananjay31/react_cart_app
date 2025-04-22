import { useState } from "react";

const productsData = [
  { id: 1, name: "Apple", price: 10, image: "https://cdn.pixabay.com/photo/2014/02/01/17/28/apple-256261_1280.jpg" },
  { id: 2, name: "Sports Car", price: 25000, image: "https://cdn.pixabay.com/photo/2017/01/06/19/15/car-1957037_1280.jpg" },
  { id: 3, name: "Orange", price: 8, image: "https://cdn.pixabay.com/photo/2017/01/20/15/06/orange-1995056_1280.jpg" },
  { id: 4, name: "Fancy Truck", price: 30000, image: "https://cdn.pixabay.com/photo/2016/11/22/19/01/truck-1853507_1280.jpg" },
];

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const increaseQty = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (productId) => {
    setCart(
      cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkout = () => {
    alert("Checkout successful! Total: $" + total);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-8">🛒 React Shopping Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Products Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Products</h2>
            <div className="space-y-4">
              {productsData.map((product) => (
                <div key={product.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-xl shadow space-x-4">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="text-lg font-medium">{product.name}</p>
                    <p className="text-gray-500">${product.price}</p>
                  </div>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
            <div className="space-y-2">
              {cart.length === 0 ? (
                <p className="text-gray-500">Cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-green-50 p-3 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <p>{item.name}</p>
                        <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-2 py-1 bg-gray-300 rounded"
                        onClick={() => decreaseQty(item.id)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-300 rounded"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </button>
                      <button
                        className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <hr className="my-4" />
            <h3 className="text-xl font-bold mb-4">Total: ${total}</h3>
            {cart.length > 0 && (
              <button
                onClick={checkout}
                className="w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600"
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
