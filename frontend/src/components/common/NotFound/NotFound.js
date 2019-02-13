import React from 'react'
import styles from './NotFound.module.scss'

const NotFound = ({ onGoBack }) => (
    <div className={styles.not_found}>
        <div className={styles.description}>
            Hmm...
            <br /> You've reached some weird page!
            <div className={styles.go_back} onClick={onGoBack}>
                Go Back
            </div>
        </div>
    </div>
)

export default NotFound