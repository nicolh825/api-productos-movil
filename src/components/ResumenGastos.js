import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default function ResumenGastos({ gastos }) {
  const total = gastos.reduce(
    (acumulado, gasto) => acumulado + gasto.valor,
    0
  );

  const cantidad = gastos.length;

  function formatoMoneda(valor) {
    return Number(valor).toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    });
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Resumen de gastos</Text>

      <View style={styles.tarjetas}>
        <View style={styles.tarjeta}>
          <Text style={styles.etiqueta}>Total gastado</Text>
          <Text style={styles.total}>{formatoMoneda(total)}</Text>
        </View>

        <View style={styles.tarjeta}>
          <Text style={styles.etiqueta}>Cantidad de gastos</Text>
          <Text style={styles.cantidad}>{cantidad}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginBottom: 20
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#172B4D',
    marginBottom: 12
  },
  tarjetas: {
    flexDirection: 'row',
    gap: 10
  },
  tarjeta: {
    flex: 1,
    backgroundColor: '#EAF0FC',
    padding: 15,
    borderRadius: 12
  },
  etiqueta: {
    fontSize: 13,
    color: '#475467'
  },
  total: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#245CC5',
    marginTop: 8
  },
  cantidad: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#245CC5',
    marginTop: 8
  }
});