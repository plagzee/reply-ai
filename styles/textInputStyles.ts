import { StyleSheet } from 'react-native';
import colors from './theme';

export const textInputStyles = StyleSheet.create({
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    elevation: 1,
  },
  replyBox: {
    marginTop: 24,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    elevation: 2,
  },
  replyText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  copyText: {
    color: colors.accent,
    textAlign: 'right',
    fontWeight: '500',
  },
});
