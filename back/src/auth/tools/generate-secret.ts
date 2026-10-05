import { readFileSync, writeFileSync, existsSync } from 'fs';
import * as path from 'path';

const envPath = path.resolve('.env');

function generateFortKnoxPassword(length: number = 64): string {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?/`~';
    const allChars = uppercase + lowercase + digits + symbols;

    let password = '';
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += digits[Math.floor(Math.random() * digits.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = 4; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return password
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('');
}

export function ensureJwtSecretExists() {
    if (!existsSync(envPath)) {
        writeFileSync(envPath, '');
    }

    let envContent = readFileSync(envPath, 'utf-8');
    const jwtAccessSecretKey = 'JWT_ACCESS_SECRET_KEY';
    const jwtRefreshSecretKey = 'JWT_REFRESH_SECRET_KEY';

    const accessAlreadyExists = envContent
        .split('\n')
        .some((line) => line.trim().startsWith(`${jwtAccessSecretKey}=`));

    const refreshAlreadyExists = envContent
        .split('\n')
        .some((line) => line.trim().startsWith(`${jwtRefreshSecretKey}=`));

    let newLines: string[] = [];

    if (!accessAlreadyExists) {
        const accessSecret = generateFortKnoxPassword();
        newLines.push(`${jwtAccessSecretKey}="${accessSecret}"`);
        console.log('Clé JWT_ACCESS_SECRET_KEY ajoutée dans .env.');
    } else {
        console.log(
            'Clé JWT Access Token déjà présente dans .env. Aucune modification.',
        );
    }

    if (!refreshAlreadyExists) {
        const refreshSecret = generateFortKnoxPassword();
        newLines.push(`${jwtRefreshSecretKey}="${refreshSecret}"`);
        console.log('Clé JWT_REFRESH_SECRET_KEY ajoutée dans .env.');
    } else {
        console.log(
            'Clé JWT Refresh Token déjà présente dans .env. Aucune modification.',
        );
    }

    if (newLines.length > 0) {
        envContent = envContent.trimEnd() + '\n' + newLines.join('\n') + '\n';
        writeFileSync(envPath, envContent);
    }
}
