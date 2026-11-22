export function categoriaYaExiste(categoria, gastos = []) {
  const categoriaNormalizada = (categoria || '').trim().toLowerCase();
  if (!categoriaNormalizada) return false;

  return gastos.some(
    (gasto) => (gasto.categoria || '').trim().toLowerCase() === categoriaNormalizada
  );
}

export function validarGasto(formulario, gastos = []) {
  const errores = {};

  if (!formulario.categoria || formulario.categoria.trim() === '') {
    errores.categoria = 'Debes seleccionar una categoría.';
  } else if (categoriaYaExiste(formulario.categoria, gastos)) {
    errores.categoriaDuplicada = `La categoría "${formulario.categoria}" ya está registrada. Elige una categoría diferente para evitar duplicados.`;
  }

  if (!formulario.descripcion || formulario.descripcion.trim() === '') {
    errores.descripcion = 'La descripción es obligatoria.';
  }

  const valorNumero = Number(formulario.valor);
  if (!formulario.valor || Number.isNaN(valorNumero) || valorNumero <= 0) {
    errores.valor = 'Ingresa un valor válido mayor a 0.';
  }

  return errores;
}