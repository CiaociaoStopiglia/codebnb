import { excluir, salvar } from '@actions/clientes';
import Crud from '@components/Crud';
import { prisma } from '@lib/prisma';

const colunas = [
    { title: 'Nome', dataIndex: 'nome' },
    { title: 'Cômodos', dataIndex: 'qtd_comodo' },
    { title: 'Hóspedes', dataIndex: 'qtd_hospede' },
    { title: 'Avaliação', dataIndex: 'avaliacao' },
    { title: 'Valor', dataIndex: 'valor' },
    { title: 'Cliente', dataIndex: 'cliente_nome' },
];

export default async function Imoveis() {
    const [imoveis, clientes] = await Promise.all([
        prisma.imovel.findMany({ orderBy: { nome: 'asc' }, include: { cliente: true } }),
        prisma.cliente.findMany({ orderBy: { nome: 'asc' } }),
    ]);

    const registros = imoveis.map(({ cliente, valor, ...imovel }) => ({
        ...imovel,
        valor: Number(valor),
        cliente_nome: cliente.nome,
    }));

const campos = [
    { name: 'nome', label: 'Nome' },
        { name: 'qtd_comodo', label: 'Cômodos', tipo: 'number' },
        { name: 'qtd_hospede', label: 'Hóspedes', tipo: 'number' },
        { name: 'avaliacao', label: 'Avaliação', tipo: 'number', opcional: true },
        { name: 'valor', label: 'Valor', tipo: 'number' },
        { name: 'cliente_id', label: 'Cliente', opcoes: clientes.map((c) => ({ value: c.id, label: c.nome })) }
];

return <Crud titulo="Imóveis" {...{ colunas, campos, registros, salvar, excluir}} />

}