import { excluir, salvar } from '@actions/alugueis';
import Crud from '@components/Crud';
import { descriptografar } from '@lib/cripto';
import { prisma } from '@lib/prisma';

const colunas = [
    { title: 'Início', dataIndex: 'data_inicio' },
    { title: 'Fim', dataIndex: 'data_fim' },
    { title: 'Valor Total', dataIndex: 'valor_total' },
    { title: 'Imóvel', dataIndex: 'imovel_nome' },
    { title: 'Cliente', dataIndex: 'cliente_nome' },
    { title: 'CPF', dataIndex: 'cliente_cpf' },
];

export default async function alugueis() {
    const [alugueis, imoveis] = await Promise.all([
        prisma.alguel.findMany({
            orderBy: { data_inicio: 'asc' },
            include: { imovel: { include: { cliente: true } } },
        }),
        prisma.imovel.findMany({ orderBy: { nome: 'asc' }, include: { cliente: true } }),
    ]);

    const registros = alugueis.map(({ id, data_inicio, data_fim, valor_total, imovel_id, imovel }) => ({
        id,
        imovel_id,
        data_inicio: data_inicio.toISOString().slice(0, 10),
        data_fim: data_fim.toISOString().slice(0, 10),
        valor_total: valor_total.toFixed(2),
        imovel_nome: imovel.nome,
        cliente_nome: imovel.cliente.nome,
        cliente_cpf: descriptografar(imovel.cliente.cpf),
    }));

    const campos = [
        { name: 'data_inicio', label: 'Data de Início', tipo: 'date' },
        { name: 'data_fim', label: 'Data de Fim', tipo: 'date' },
        { name: 'valor_total', label: 'Valor Total', tipo: 'number' },
        {
            name: 'imovel_id',
            label: 'Imóvel',
            opcoes: imoveis.map((i) => ({ value: i.id, label: i.nome })),
        },
    ];

    return <Crud titulo="alugueis" {...{ colunas, campos, registros, salvar, excluir }} />;
}