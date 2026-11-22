import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function Header() {
  return (
    <View style={styles.headerCard}>
      <View style={styles.filaSuperior}>
        <View style={styles.badgeLogo}>
          <Text style={styles.textoLogo}>MG</Text>
        </View>

        <View style={styles.infoTexto}>
          <Text style={styles.titulo} numberOfLines={1}>
            MiGasto Móvil
          </Text>
          <Text style={styles.subtitulo} numberOfLines={1}>
            Control personal · SENA ADSO
          </Text>
        </View>

        <View style={styles.pillEstado}>
          <Text style={styles.textoPill}>v2</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    backgroundColor: '#172B4D',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.14,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      default: {
        boxShadow: '0px 4px 12px rgba(15, 23, 42, 0.12)',
      },
    }),
  },
  filaSuperior: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  badgeLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#245CC5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  textoLogo: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  infoTexto: {
    flex: 1,
    minWidth: 0,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
  },
  subtitulo: {
    color: '#CBD5E1',
    fontSize: 12,
    marginTop: 2,
  },
  pillEstado: {
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  textoPill: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '700',
  },
});