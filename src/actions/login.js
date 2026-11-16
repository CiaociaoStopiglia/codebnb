'use server';

import { prisma } from '@lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const TEMPO_VIDA = 60 * 60; // 1 hora = 3600 segundos

export async function entrar({ nome, senha }) {
    let usuario;
    try {
        usuario = await prisma.usuario.findUnique({ where: { nome}})
        // 1. usuario = AGUARDAR prisma BUSCAR ÚNICO usuario ONDE nome
    } catch {
        return { erro: 'Erro ao conectar com o banco' };
    }
/* escreva aqui a condição do passo 2 */ 
    if (!usuario || (!await bcrypt.compare(senha, usuario.senha))) {
        // 2. SE NÃO TEM usuario OU NÃO (AGUARDAR bcrypt COMPARAR senha COM a senha do usuario) retorne usuário não existe ou senha errada
        return { erro: 'Usuário ou senha incorretos' };
    }

    // 3. token = jwt ASSINAR { nome: nome do usuario } COM a JWT_SECRET do .env, EXPIRANDO EM TEMPO_VIDA

    const token = jwt.sign({ nome: usuario.nome}, process.env.JWT_SECRET, { expiresIn: TEMPO_VIDA });
    (await cookies()).set('token', token, {httpOnly: true, sameSite: 'lax', maxAge: TEMPO_VIDA})

    redirect('/inicio');
}

export async function sair() {
    (await cookies()).delete('token');
    redirect('/')  // 4. REDIRECIONAR PARA a página de login ('/')
}
