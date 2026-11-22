export async function obtenerGastosAPI() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4');

  if (!response.ok) {
    throw new Error('No se pudo obtener la información desde la API.');
  }

  const data = await response.json();

  return data.map((item, index) => ({
    id: String(item.id),
    categoria: index % 2 === 0 ? 'Alimentación' : 'Transporte',
    descripcion: item.title,
    valor: (index + 1) * 15000,
    fecha: new Date().toISOString().slice(0, 10),
  }));
}