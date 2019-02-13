import React from 'react'
import styles from './LoadingView.module.scss'
import { ChasingDots } from 'better-react-spinkit'

const LoadingView = ({ isLoading }) => {
    if (!isLoading) return null
    return (
        <div className={styles.loading_view}>
            <ChasingDots color={'black'} size={60} />
        </div>
    )
}

export default LoadingView