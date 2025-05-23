import Header from 'components/Header/Header'
import Navbar from 'components/Navbar/Navbar'

import styles from './appframe.module.css'

interface AppFrameProps {
  children?: React.ReactNode
  controls?: React.ReactNode
  title?: React.ReactNode
}

const AppFrame = ({ children, controls, title }: AppFrameProps) => {
  return (
    <main className={styles['app']}>
      <Navbar />
      <section className={styles['app__content']}>
        <Header controls={controls} title={title} />
        {children}
      </section>
    </main>
  )
}

export default AppFrame
