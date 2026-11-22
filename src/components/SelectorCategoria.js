import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function SelectorCategoria({
  categorias = [],
  categoriaSeleccionada,
  onSeleccionar,
}) {
  const [abierto, setAbierto] = useState(false);

  const manejarSeleccion = (categoria) => {
    onSeleccionar(categoria);
    setAbierto(false);
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>Categoría</Text>

      <Pressable
        style={[styles.selectBoton, abierto && styles.selectBotonActivo]}
        onPress={() => setAbierto((prev) => !prev)}
      >
        <Text
          style={
            categoriaSeleccionada
              ? styles.textoSeleccionado
              : styles.textoPlaceholder
          }
        >
          {categoriaSeleccionada || 'Selecciona una categoría...'}
        </Text>
        <Text style={styles.flecha}>{abierto ? '▲' : '▼'}</Text>
      </Pressable>

      {abierto && (
        <View style={styles.listaDesplegable}>
          {categorias.map((categoria) => {
            const esActual = categoria === categoriaSeleccionada;

            return (
              <Pressable
                key={categoria}
                style={[styles.opcion, esActual && styles.opcionActiva]}
                onPress={() => manejarSeleccion(categoria)}
              >
                <Text
                  style={[
                    styles.textoOpcion,
                    esActual && styles.textoOpcionActiva,
                  ]}
                >
                  {categoria}
                </Text>
                {esActual && <Text style={styles.check}>✓</Text>}
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 10,
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#172B4D',
  },
  selectBoton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  selectBotonActivo: {
    borderColor: '#245CC5',
  },
  textoSeleccionado: {
    fontSize: 16,
    color: '#172B4D',
  },
  textoPlaceholder: {
    fontSize: 16,
    color: '#98A2B3',
  },
  flecha: {
    fontSize: 12,
    color: '#667085',
  },
  listaDesplegable: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  opcion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F4F7',
  },
  opcionActiva: {
    backgroundColor: '#EEF4FF',
  },
  textoOpcion: {
    fontSize: 15,
    color: '#344054',
  },
  textoOpcionActiva: {
    color: '#245CC5',
    fontWeight: '700',
  },
  check: {
    color: '#245CC5',
    fontWeight: 'bold',
  },
});