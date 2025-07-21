import { StyleSheet } from 'react-native';
import colors from './theme';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 32,
  },
  button: {
    backgroundColor: colors.buttonBg,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  sliderContainer: {
    marginVertical: 24,
  },
  usageText: {
    marginTop: 24,
    color: colors.text,
    textAlign: 'center',
  },
});
