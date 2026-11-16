'use server';

import { criptografar } from '@lib/cripto';
import { prisma } from '@lib/prisma';
import { revalidatePath } from 'next/cache';

export async function salvar({ id, ...dados }) {
    try {
        // 1. data = dados COM cpf = criptografar(dados.cpf)   (o cpf não pode ir aberto para o banco)
        const data = { ...dados, cpf: criptografar(dados.cpf) }
        if (id) await prisma.cliente.update({ where: { id }, data });
        else await prisma.cliente.create({ data });
        // 2. SE TEM id → AGUARDAR prisma ATUALIZAR entidade1 ONDE id, COM data   (é uma edição)
        //    SENÃO      → AGUARDAR prisma CRIAR entidade1 COM data                (é um cadastro novo)
    } catch (e) {
        if (e.code === 'P2002') return { erro: 'CPF já cadastrado' };
        return { erro: 'Erro ao salvar o cliente' };
    }
    revalidatePath('/entidade1');
}

export async function excluir(id) {
    try {
        await prisma.cliente.delete({ where: { id } });
        // 3. AGUARDAR prisma EXCLUIR entidade1 ONDE id
    } catch (e) {
        if (e.code === 'P2003') return { erro: 'Cliente possui entidade2 cadastradas' };
        return { erro: 'Erro ao excluir o cliente' };
    }
    revalidatePath('/entidade1');
}
