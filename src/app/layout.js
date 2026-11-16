import './globals.css';
import Header from '@components/Header';
import { App } from 'antd';

export const metadata = {
    title: 'Alguel De Imóveis',
    description: 'Sistema de aluguel de imóveis',
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body>
                <App>
                    <Header/>
                    <main>{children}</main>
                </App>
            </body>
        </html>
    );
}