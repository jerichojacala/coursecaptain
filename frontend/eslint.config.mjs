import next from '@next/eslint-plugin-next';
import typescript from '@typescript-eslint/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@next/next': next,
      '@typescript-eslint': typescript,
      'jsx-a11y': jsxA11y,
      'react': react
    },
    rules: {
      // Fixes your build errors
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-empty-object-type': 'off',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'warn'
    }
  }
];