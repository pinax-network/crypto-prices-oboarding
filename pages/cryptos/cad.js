import React from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Crypto({ data }) {
  console.log(data);
  const router = useRouter();

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
                    <p>CA${data[0].current_price}</p>
                </div>
                <div className="card">
                    <div className="image">
                        <img src={data[1].image} alt="" />
                    </div>
                    <h4>{data[1].name}</h4>
                    <p>CA${data[1].current_price}</p>
                </div>
                <div className="card">
                    <div className="image">
                        <img src={data[2].image} alt="" />
                    </div>
                    <h4>{data[2].name}</h4>
                    <p>CA${data[2].current_price}</p>
                </div>
        </div>
        <div className="currency">
            <h2>Currency</h2>
            <button onClick={() => router.push("/cryptos/usd")}>USD</button>
            <button>CAD</button>
        </div>
        <div className="language">
            <h2>Language</h2>
            <button>English</button>
            <button>Korean</button>
            <button>Chinese</button>

        </div>
    </div>
    
  );
}

export async function getServerSideProps(context) {
  const crypto = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&ids=bitcoin%2Cethereum%2Ceos&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
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
