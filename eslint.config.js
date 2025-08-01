import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
    {
        // Configuração para ignorar arquivos
        ignores: ['node_modules', 'dist', 'build', '.env'],
    },
    // Configurações padrão do ESLint e TypeScript
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        // Suas regras personalizadas vêm aqui
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
        },
    },

    eslintConfigPrettier,
);
