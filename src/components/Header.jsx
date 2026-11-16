 // 1. cookieStore = AGUARDAR cookies()

    // 2. token = PEGAR o cookie 'token' DO cookieStore E, SE EXISTIR, o valor dele

    // 3. usuario = SE TEM token → jwt DECODIFICAR token

    // 4. SE NÃO TEM usuario → RETORNAR null   (assim o cabeçalho não aparece na tela de login)

    // 5. RETORNAR <Flex> COM os itens 6 e 7 DENTRO:
    //     component → 'header'
    //     style     → estilo
    //     justify   → 'space-between'
    //     align     → 'center'
    //     wrap
    //     gap       → 16

    // 6. <Flex> COM os links do menu:
    //     gap       → 16
    //     component → 'nav'
    //     <Link href> → texto:
    //         '/inicio'    → 'Início'
    //         '/entidade1' → 'Entidade1'
    //         '/entidade2' → 'Entidade2'
    //         '/entidade3' → 'Entidade3'

    // 7. <Flex> COM o nome do usuário e o botão Sair:
    //     gap   → 16
    //     align → 'center'
    //     <span>                → 'Olá, ' + nome do usuario
    //     <form action={sair}>  → COM <Button htmlType="submit"> 'Sair'


    
import { sair } from '@actions/login';
import { Button, Flex } from 'antd';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import Link from 'next/link';

const estilo = { padding: 16, borderBottom: '1px solid lightgray' };

export default async function Header() {
    const token = (await cookies()).get('token')?.value;
    const usuario = token && jwt.decode(token);
    if (!usuario) return null;

    return (
        <Flex
            component="header"
            style={estilo}
            justify="space-between"
            align="center"
            wrap
            gap={16}>
            <Flex gap={16} component="nav">
                <Link href="/inicio">Início</Link>
                <Link href="/clientes">Clientes</Link>
                <Link href="/imoveis">Imóveis</Link>
                <Link href="/alugueis">Alguéis</Link>
            </Flex>
            <Flex gap={16} align="center">
                <span>Olá, {usuario.nome}</span>
                <form action={sair}>
                    <Button htmlType="submit">Sair</Button>
                </form>
            </Flex>
        </Flex>
    );
}

