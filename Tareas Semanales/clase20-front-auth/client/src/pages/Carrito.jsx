export default function Carrito({ carrito, onVaciar }) {
  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

  if (carrito.length === 0) return <p>El carrito está vacío.</p>;

  return (
    <section>
      <h1>Carrito</h1>
      <ul className="lista-carrito">
        {carrito.map((item) => (
          <li key={item._id}>
            {item.nombre} × {item.cantidad} — ${item.precio * item.cantidad}
          </li>
        ))}
      </ul>
      <p className="precio">Total: ${total}</p>
      <button onClick={onVaciar}>Vaciar carrito</button>
    </section>
  );
}
