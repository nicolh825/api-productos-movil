import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { validarGasto } from '../utils/validaciones';
import SelectorCategoria from './SelectorCategoria';

const CATEGORIAS_DISPONIBLES = [
  'Alimentación',
  'Transporte',
  'Vivienda',
  'Servicios',
  'Entretenimiento',
  'Salud',
  'Educación',
  'Otros',
];

export default function FormularioGasto({ onAgregar, gastos = [] }) {
  const [formulario, setFormulario] = useState({
    descripcion: '',
    categoria: '',
    valor: '',
  });
  const [errores, setErrores] = useState({});

  const actualizarCampo = (campo, valor) => {
    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));

    // Limpiar errores del campo al modificarlo
    setErrores((anteriores) => {
      const copia = { ...anteriores };
      delete copia[campo];
      if (campo === 'categoria') {
        delete copia.categoriaDuplicada;
      }
      return copia;
    });
  };

  function registrarGasto() {
    const resultado = validarGasto(formulario, gastos);

    if (Object.keys(resultado).length > 0) {
      setErrores(resultado);
      return;
    }

    const nuevoGasto = {
      descripcion: formulario.descripcion.trim(),
      categoria: formulario.categoria.trim(),
      valor: Number(formulario.valor),
      fecha: new Date().toISOString().slice(0, 10),
    };

    onAgregar(nuevoGasto);
    setFormulario({ descripcion: '', categoria: '', valor: '' });
    setErrores({});
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Registrar nuevo gasto</Text>

      <SelectorCategoria
        categorias={CATEGORIAS_DISPONIBLES}
        categoriaSeleccionada={formulario.categoria}
        onSeleccionar={(categoria) => actualizarCampo('categoria', categoria)}
      />

      {errores.categoria && (
        <Text style={styles.error}>{errores.categoria}</Text>
      )}

      {errores.categoriaDuplicada && (
        <View style={styles.alertaInfo}>
          <Text style={styles.alertaTitulo}>Categoría ya existente</Text>
          <Text style={styles.alertaTexto}>{errores.categoriaDuplicada}</Text>
        </View>
      )}

      <Text style={styles.etiqueta}>Descripción</Text>
      <TextInput
        style={styles.input}
        placeholder="Ejemplo: Almuerzo ejecutivo"
        value={formulario.descripcion}
        onChangeText={(texto) => actualizarCampo('descripcion', texto)}
      />
      {errores.descripcion && (
        <Text style={styles.error}>{errores.descripcion}</Text>
      )}

      <Text style={styles.etiqueta}>Valor del gasto</Text>
      <TextInput
        style={styles.input}
        placeholder="Ejemplo: 50000"
        value={formulario.valor}
        onChangeText={(texto) => actualizarCampo('valor', texto)}
        keyboardType="numeric"
      />
      {errores.valor && (
        <Text style={styles.error}>{errores.valor}</Text>
      )}

      <Pressable style={styles.boton} onPress={registrarGasto}>
        <Text style={styles.textoBoton}>Registrar gasto</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#172B4D',
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 12,
    color: '#172B4D',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  error: {
    color: '#D92D20',
    marginTop: 5,
    fontSize: 13,
  },
  alertaInfo: {
    marginTop: 8,
    backgroundColor: '#FEF3C7',
    borderLeftWidth: 4,
    borderLeftColor: '#D97706',
    borderRadius: 8,
    padding: 12,
  },
  alertaTitulo: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 2,
  },
  alertaTexto: {
    fontSize: 13,
    color: '#78350F',
  },
  boton: {
    backgroundColor: '#245CC5',
    padding: 14,
    borderRadius: 8,
    marginTop: 18,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});