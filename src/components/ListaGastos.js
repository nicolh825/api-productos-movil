import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ListaGastos({ gastos = [] }) {
  if (gastos.length === 0) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Mis gastos</Text>
        <Text style={styles.vacio}>No hay gastos registrados.</Text>
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Mis gastos</Text>

      {gastos.map((gasto) => (
        <View key={gasto.id} style={styles.tarjeta}>
          <View style={styles.filaSuperior}>
            <Text style={styles.categoria}>{gasto.categoria || 'Sin categoría'}</Text>
            <Text style={styles.valor}>
              ${Number(gasto.valor || 0).toLocaleString('es-CO')}
            </Text>
          </View>

          <Text style={styles.descripcion} numberOfLines={2}>
            {gasto.descripcion || 'Gasto registrado'}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#172B4D',
    marginBottom: 12,
  },
  vacio: {
    textAlign: 'center',
    color: '#667085',
    paddingVertical: 20,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E4E7EC',
  },
  filaSuperior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  categoria: {
    backgroundColor: '#EEF4FF',
    color: '#245CC5',
    fontWeight: '700',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  valor: {
    fontSize: 16,
    fontWeight: '800',
    color: '#172B4D',
  },
  descripcion: {
    fontSize: 14,
    color: '#344054',
  },
});