import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';


export default function Crypto({ data }) {
  const { locale, locales, push } = useRouter()
  const {t:translate} = useTranslation('crypto')
  const router = useRouter();
  console.log(data);

  const handleClick = l => () => {
    push('/cryptos/usd', undefined, {locale:l})
  }

  return (
    <div className="page">

        <div className="title">
                    <h1>Crypto Prices</h1>
        </div>

        <div className="cryptos">
                
                <div className="card">
                    <div className="image">
                        <img src={data[0].image} alt="" />
                    </div>
                    <h4>{data[0].name}</h4>
                    <p>USD${data[0].current_price}</p>
                </div>
                <div className="card">
                    <div className="image">
                        <img src={data[1].image} alt="" />
                    </div>
                    <h4>{data[1].name}</h4>
                    <p>USD${data[1].current_price}</p>
                </div>
                <div className="card">
                    <div className="image">
                        <img src={data[2].image} alt="" />
                    </div>
                    <h4>{data[2].name}</h4>
                    <p>USD${data[2].current_price}</p>
                </div>
        </div>
        <div className="currency">
            <h2>Currency</h2>
            <button>USD</button>
            <button onClick={() => router.push("/cryptos/cad")}>CAD</button>
        </div>
        <div className="language">
            <h2>Language</h2>
            {locales.map(l => (
            <button key = {l} onClick={handleClick(l)}>
            {l}
            </button>
        ))}

        </div>
    </div>
    
  );
}

export async function getServerSideProps(context) {
  const crypto = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Ceos&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
  );
  const data = crypto.data;
  return {
    props: { data },
  };
}

export async function getStaticProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['crypto'])),
    },
  }
}
