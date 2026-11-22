import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
} from 'react-native';

import LoadingScreen from './src/components/LoadingScreen';
import Header from './src/components/Header';
import FormularioGasto from './src/components/FormularioGasto';
import ListaGastos from './src/components/ListaGastos';
import ResumenGastos from './src/components/ResumenGastos';
import { obtenerGastosAPI } from './src/services/gastoService';

export default function App() {
  const [mostrandoSplash, setMostrandoSplash] = useState(true);
  const [gastos, setGastos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorApi, setErrorApi] = useState('');

  useEffect(() => {
    async function cargarGastos() {
      try {
        const datos = await obtenerGastosAPI();
        setGastos(datos);
      } catch (error) {
        setErrorApi('No se pudieron cargar los gastos desde la API.');
      } finally {
        setCargando(false);
      }
    }

    cargarGastos();
  }, []);

  function agregarGasto(nuevoGasto) {
    const gastoCompleto = {
      ...nuevoGasto,
      id: Date.now(),
    };
    setGastos((anteriores) => [gastoCompleto, ...anteriores]);
  }

  if (mostrandoSplash) {
    return <LoadingScreen onTerminarCarga={() => setMostrandoSplash(false)} />;
  }

  return (
    <SafeAreaView style={styles.contenedor}>
      <ScrollView
        contentContainerStyle={styles.contenido}
        keyboardShouldPersistTaps="handled"
      >
        <Header />
        <ResumenGastos gastos={gastos} />
        <FormularioGasto onAgregar={agregarGasto} gastos={gastos} />

        {cargando && (
          <Text style={styles.mensajeEstado}>Consultando gastos desde la API...</Text>
        )}
        {Boolean(errorApi) && (
          <Text style={styles.mensajeError}>{errorApi}</Text>
        )}

        <ListaGastos gastos={gastos} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F3F6FB',
  },
  contenido: {
    padding: 20,
    paddingTop: 25,
  },
  mensajeEstado: {
    color: '#245CC5',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '600',
  },
  mensajeError: {
    color: '#D92D20',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '600',
  },
});