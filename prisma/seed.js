import bcrypt from 'bcryptjs';

try {
    process.loadEnvFile();
} catch {
    console.error('   ❌ parceria ... arquivo .env');
    process.exit(1);
}

const { criptografar } = await import('../src/lib/cripto.js');
const { prisma } = await import('../src/lib/prisma.js');

// para ter mais linhas no banco, acrescente mais objetos em cada lista/tabela
const dados = {
    usuario: [
        { nome: 'admin', 
          senha: bcrypt.hashSync('admin123', 10) 
        },
        { nome: 'Yasmin', 
          senha: bcrypt.hashSync('123456', 10) 
        },
        { nome: 'João', 
          senha: bcrypt.hashSync('123456', 10) 
        },
    ],
    cliente: [
        { 
          nome: "Ana Souza",
          cpf: criptografar("234.567.890-12"),
        },
        { 
          nome: "Pietro Stopiglia",
          cpf: criptografar("456.567.099-12"),
        },
        { 
          nome: "Tyler Joseph",
          cpf: criptografar("246.675.339-41"),
        },
    ],
    imovel: [ 
        {
            nome: "Casa Guarujá",
            qtd_comodo: 4,
            qtd_hospede: 6,
            avaliacao: 4,
            valor: 350.00,
            cliente_id: 1
        },
        {
            nome: "Casa Monte Verde",
            qtd_comodo: 3,
            qtd_hospede: 5,
            avaliacao: 5,
            valor: 450.00,
            cliente_id: 2
        },
        {
            nome: "Casa Campos do Jordão",
            qtd_comodo: 3,
            qtd_hospede: 4,
            avaliacao: 3,
            valor: 800.00,
            cliente_id: 3
        },
    ],
    alguel: [
        {
            data_inicio: new Date("2024-06-01"),
            data_fim: new Date("2024-06-10"),
            valor_total: 3500.00,
            imovel_id: 1
        },
        {
            data_inicio: new Date("2024-07-01"),
            data_fim: new Date("2024-07-10"),
            valor_total: 4500.00,
            imovel_id: 2
        },
        {
            data_inicio: new Date("2024-08-01"),
            data_fim: new Date("2024-08-10"),
            valor_total: 8000.00,
            imovel_id: 3
        },
    ],
};

const tabelas = Object.keys(dados).reverse().join(', ');
await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tabelas} RESTART IDENTITY CASCADE`);
console.log('   🧹 registros anteriores apagados (ids reiniciados)');

for (const [tabela, data] of Object.entries(dados)) {
    const { count } = await prisma[tabela].createMany({ data });
    console.log(`   ✅ ${tabela}: ${count} registros`);
}

await prisma.$disconnect();
