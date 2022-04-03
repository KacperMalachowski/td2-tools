import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import MainLayout from '../layouts/Main'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>TD2 Tools</title>
        <meta name="description" content="Narzędzia dla symulatora https://td2.info.pl" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Witaj na stronie z narzędziami do <a href="https://td2.info.pl">Symulatora Train Driver 2!</a>
        </h1>

        <p className={styles.description}>
          Znajdziesz tu szereg narzędzi przydatnych podczas rozgrywki!
        </p>

        <div className={styles.grid}>
          <Link href="train-number">
            <a className={styles.card}>
              <h2>Generator Numerów Pociągów &rarr;</h2>
              <p>Wygeneruj numer pociagu zgodny z regulaminem symulatora TD2!</p>
            </a>
          </Link>
        </div>
      </main>
    </MainLayout>
  )
}

export default Home
