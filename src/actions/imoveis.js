'use server';

import { criptografar } from '@lib/cripto';
import { prisma } from '@lib/prisma';
import { revalidatePath } from 'next/cache';

export async function salvar({ id, ...dados }) {
    try {
        // 1. data = dados COM cpf = criptografar(dados.cpf)   (o cpf não pode ir aberto para o banco)
        const data = {
            ...dados,
            qtd_comodo: Number(dados.qtd_comodo),
            qtd_hospede: Number(dados.qtd_hospede),
            avaliacao: dados.avaliacao ? Number(dados.avaliacao) : null,
            valor: Number(dados.valor),
        };
        // 2. SE TEM id → AGUARDAR prisma ATUALIZAR entidade1 ONDE id, COM data   (é uma edição)
        //    SENÃO      → AGUARDAR prisma CRIAR entidade1 COM data                (é um cadastro novo)
        if (id) await prisma.imovel.update({ where: { id }, data });
        else await prisma.imovel.create({ data });
    } catch {
        return { erro: 'Erro ao salvar o imóvel' };
    }
    revalidatePath('/imoveis');
}

export async function excluir(id) {
    try {
        await prisma.imovel.delete({ where: { id } });
    } catch (e) {
        if (e.code === 'P2003') return { erro: 'Imóvel possui aluguéis cadastrados' };
        return { erro: 'Erro ao excluir o imóvel' };
    }
    revalidatePath('/imoveis');
}