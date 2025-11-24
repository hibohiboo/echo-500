/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import './styles/theme.css';
import AppRouter from './app/router.tsx';

const root = document.getElementById('root');

render(() => <AppRouter />, root!);
