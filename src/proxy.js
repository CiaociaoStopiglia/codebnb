import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

function logado(token) {
    try {
        return Boolean(jwt.verify(token, process.env.JWT_SECRET));
        // 1. RETORNAR jwt VERIFICAR token COM a JWT_SECRET do .env, CONVERTIDO PARA booleano
    } catch {
        return false;
    }
}

export function proxy(request) {
    const temSessao = logado(request.cookies.get('token')?.value);
    const ehPaginaLogin = request.nextUrl.pathname === '/';
    // 2. temSessao = logado(PEGAR o cookie 'token' da request E, SE EXISTIR, o valor dele)
    if (!temSessao && !ehPaginaLogin) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if (temSessao && ehPaginaLogin) {
        return NextResponse.redirect(new URL('/inicio', request.url));
    }
    return NextResponse.next();
}
    // 3. ehPaginaLogin = CAMINHO da URL da request É IGUAL A '/'
    /* escreva aqui a condição do passo 4 */
    // 4. SE NÃO temSessao E NÃO ehPaginaLogin   (está deslogado fora do login → vai para o login)
    // /* escreva aqui a condição do passo 5 */) {
    // 5. SE temSessao E ehPaginaLogin   (já está logado e abriu o login → vai para o i

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
