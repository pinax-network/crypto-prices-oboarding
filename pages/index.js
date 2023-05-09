import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-translate/useTranslation'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { locale, locales, push } = useRouter()

  let router = useRouter()

  let greeting = router.locale === "en"?'choose your locale': router.locale === "ko"?'로케일을 선택하십시오':"";
  const handleClick = l => () => {
    push('/', undefined, {locale:l})
  }
  return (
    <>
      <h1>{locale}</h1>

      <div>
        <h3>With useRouter</h3>
        <h1>{greeting}</h1>

        {locales.map(l => (
          <button key = {l} onClick={handleClick(l)}>
            {l}
          </button>
        ))}

      </div>
    
    </>
  );
}

// export async function getStaticProps({locale}) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['index'])),
//     },
//   }
// }
