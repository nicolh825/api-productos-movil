import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Animated,
} from 'react-native';

export default function LoadingScreen({ onTerminarCarga }) {
  const opacidad = useRef(new Animated.Value(0)).current;
  const escala = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    // Animación de entrada suave del logo y contenido
    Animated.parallel([
      Animated.timing(opacidad, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(escala, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    // Mantener visible durante 3 segundos (3000 ms) y desvanecer suavemente
    const timer = setTimeout(() => {
      Animated.timing(opacidad, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished && typeof onTerminarCarga === 'function') {
          onTerminarCarga();
        }
      });
    }, 3000);

    return () => {
      clearTimeout(timer);
      opacidad.stopAnimation();
      escala.stopAnimation();
    };
  }, [onTerminarCarga, opacidad, escala]);

  return (
    <View style={styles.pantalla}>
      <Animated.View
        style={[
          styles.contenido,
          {
            opacity: opacidad,
            transform: [{ scale: escala }],
          },
        ]}
      >
        {/* Si tienes un logo en assets, puedes cambiar este bloque por un <Image /> */}
        <View style={styles.logoCaja}>
          <Text style={styles.textoLogo}>MG</Text>
        </View>

        <Text style={styles.nombreApp}>MiGasto Móvil</Text>
        <Text style={styles.subtitulo}>SENA · Análisis y Desarrollo de Software</Text>

        <View style={styles.indicadorZona}>
          <ActivityIndicator size="large" color="#60A5FA" />
          <Text style={styles.textoCargando}>Preparando tu espacio...</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#172B4D',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  contenido: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCaja: {
    width: 84,
    height: 84,
    borderRadius: 22,
    backgroundColor: '#245CC5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    marginBottom: 18,
  },
  textoLogo: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 1,
  },
  nombreApp: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitulo: {
    color: '#CBD5E1',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 28,
  },
  indicadorZona: {
    alignItems: 'center',
    gap: 10,
  },
  textoCargando: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '500',
  },
});