import React from 'react'
import styles from './AuthForm.module.scss'
import { Link } from 'react-router-dom'

const AuthForm = ({
    kind,
    onChangeInput,
    username,
    password,
    onLogin,
    onRegister,
    error
}) => {
    const handleChange = e => {
        const { name, value } = e.target
        onChangeInput({ name, value })
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            switch (kind) {
                case 'register':
                    onRegister()
                    return
                case 'login':
                    onLogin()
                    return
                default:
                    return
            }
        }
    }

    return (
        <div className={styles.auth_form}>
            <div className={styles.title}>{kind.toUpperCase()}</div>
            <div className={styles.error}>
                {error.triggered && (
                    <div className={styles.message}>{error.message}</div>
                )}
            </div>
            <div className={styles.line_wrapper}>
                <div className={styles.input_title}>username</div>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
            </div>
            <div className={styles.line_wrapper}>
                <div className={styles.input_title}>password</div>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
            </div>
            {kind === "register" ? (
                <div className={styles.auth_button} onClick={onRegister}>
                    {kind.toUpperCase()}
                </div>
            ) : (
                <div className={styles.auth_button} onClick={onLogin}>
                    {kind.toUpperCase()}
                </div>
            )}
            {kind === "register" ? (
                <Link to={'/auth/login'} className={styles.description}>
                    if you already have account...
                </Link>
            ) : (
                <Link to={'/auth/register'} className={styles.description}>
                    if you don't have an account...
                </Link>
            )}
        </div>
    )
}

export default AuthForm;