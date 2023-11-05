
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'

export const ErrorPage = () => {
    return (
    <div className={styles.body}>
        <h1>404 Error: Page Not Found</h1>
        <h1>WRONG URL</h1>
    </div>)
}