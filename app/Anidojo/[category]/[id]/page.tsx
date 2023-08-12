"use client";
import Link from "next/link";
import Styles from "./tvseries.module.css";
import Supabase from "@/thirdparty_req/supabase";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface umrl {
  title: string | undefined | any;
  id: string | any;
}

interface datatype {
  id: number;
  tv_series_title: string;
  season_number: string;
  episode_number: string;
  episode_link: string;
}

type animedes = {
  id?: number;
  title?: string;
  description?: string | undefined;
  image?: string;
  type?: string;
  releaseDate?: string;
  totalEpisodes: number;
  genres: string;
};

export default function Tv({ params }: { params: umrl }) {
  const whichanime = params.id;
  // console.log(whichanime)

  const superbase = Supabase();

  const [supabasedata, setSupabasedata] = useState<datatype[]>();
  // console.log(supabasedata)

  async function fetchsupabase() {
    try {
      const { data } = await superbase.rpc(
        "fetch_tv_series_with_seasons_and_episodes"
      );
      setSupabasedata(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchsupabase();
  }, []);

  const [fetchepsiode, setFetchepisode] = useState<datatype | null>();

  function fetchAnimeByTitle() {
    if (supabasedata) {
      const rez = supabasedata.find(
        (bruh: datatype) => whichanime === bruh.tv_series_title
      );
      setFetchepisode(rez);
      // console.log(rez)
    }
  }

  useEffect(() => {
    fetchAnimeByTitle();
  }, [supabasedata, whichanime]);

  const [gugudata, setGugudata] = useState<animedes | null>(null);

  async function gugu() {
    try {
      const gugufind = await fetch(
        `https://ani-dojo-api.vercel.app/anime/gogoanime/info/` + whichanime
      );
      const demta: animedes = await gugufind.json();
      setGugudata({ ...demta, id: whichanime.id });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    gugu();
  });

  return (
    <div className={Styles.infopagemain}>
      <div className={Styles.infopageoptions}>
        <span>
          <Link href={"/"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="#ffff"
                d="M15.125 21.1L6.7 12.7q-.15-.15-.213-.325T6.425 12q0-.2.062-.375T6.7 11.3l8.425-8.425q.35-.35.875-.35t.9.375q.375.375.375.875t-.375.875L9.55 12l7.35 7.35q.35.35.35.863t-.375.887q-.375.375-.875.375t-.875-.375Z"
              />
            </svg>
          </Link>
          <Link href={"/"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
              <path
                fill="#fff"
                d="M24 13a1 1 0 0 1 .993.883L25 14v8a4 4 0 0 1-3.8 3.995L21 26H7a4 4 0 0 1-3.995-3.8L3 22v-8a1 1 0 0 1 1.993-.117L5 14v8a2 2 0 0 0 1.85 1.994L7 24h14a2 2 0 0 0 1.994-1.85L23 22v-8a1 1 0 0 1 1-1ZM6.929 8.657l6.364-6.364a1 1 0 0 1 1.32-.083l.094.083l6.364 6.364a1 1 0 0 1-1.32 1.497l-.094-.083L15 5.414V18a1 1 0 0 1-.883.993L14 19a1 1 0 0 1-.993-.883L13 18V5.414l-4.657 4.657a1 1 0 0 1-1.32.083l-.094-.083a1 1 0 0 1-.083-1.32l.083-.094l6.364-6.364l-6.364 6.364Z"
              />
            </svg>
          </Link>
        </span>
      </div>
      {gugudata && (
        <>
          <div className={Styles.infopageposter}>
            <img src={gugudata.image} alt="" />
          </div>
          <div className={Styles.infopageinfo}>
            <div className={Styles.infopagecard}>
              <h4 className={Styles.infopagetitle}>
                {gugudata.title?.toUpperCase()}
              </h4>
              <div className={Styles.infopagegenre}>
                <h5>{gugudata.genres[0]}</h5>
                <hr />
                <h5>{gugudata.releaseDate}</h5>
                <hr />
                <h5>{gugudata.totalEpisodes}</h5>
              </div>
              
                <div className={Styles.infopageselectbtn}>
                  <select className={Styles.infopagedwnldselect}>
                    <option value="0">Season</option>
                    {fetchepsiode && (
                    <option value={fetchepsiode.season_number}>
                      Season {fetchepsiode.season_number}
                    </option>
                       )}
                  </select>
                  <select className={Styles.infopagedwnldselect}>
                    <option value="0">Episode</option>
                    {fetchepsiode && (
                    <option value={fetchepsiode.episode_number}>Episode {fetchepsiode.episode_number}</option>
                    )}
                  </select>
                </div>
           
              <div className={Styles.infopagedwnldbtn}>
                <button>Download</button>
              </div>
              <div className={Styles.infopageabout}>
                <p>{gugudata.description}</p>
              </div>
              <div className={Styles.infopageaquality}>
                <svg
                  fill="#fff"
                  height="32px"
                  width="32px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 290.262 290.262"
                  xmlSpace="preserve"
                >
                  <g id="_x34_2-_1080_Full_HD">
                    <path
                      d="M278.743,29.29H11.519C5.157,29.29,0,34.447,0,40.809v128.645v11.355v68.645c0,6.361,5.157,11.519,11.519,11.519h267.225
		c6.361,0,11.519-5.157,11.519-11.519v-68.645v-11.355V40.809C290.262,34.447,285.104,29.29,278.743,29.29z M56.563,185.959H33.751
		v15.375H54.19v4.813H33.751v18.748h-4.996v-43.748h27.809V185.959z M99.69,206.895c0,11.375-6.875,18.252-18.313,18.252
		c-11.5,0-18.436-6.877-18.436-18.252v-25.748h5v25.748c0,8.5,5.122,13.439,13.436,13.439c8.313,0,13.313-4.939,13.313-13.439
		v-25.748h5V206.895z M136.13,224.895h-24.188v-43.748h5v39.002h19.188V224.895z M168.444,224.895h-24.187v-43.748h4.998v39.002
		h19.189V224.895z M214.693,224.895h-11.126v-16.998h-18.121v16.998h-11.127v-43.748h11.127v18h18.121v-18h11.126V224.895z
		 M241.822,224.895h-18.376v-25.201h11.125v16.33h7.939c6.811,0,11.688-5.254,11.688-12.939c0-7.754-5.126-13.063-12.189-13.063
		h-18.563v-8.875h18.813c13.75,0,23.248,8.875,23.248,21.873C265.507,215.957,255.882,224.895,241.822,224.895z M267.225,157.935
		H23.037V52.327h244.188V157.935z"
                    />
                    <polygon points="53.415,128.666 66.592,128.666 66.592,76.775 43.866,76.775 43.866,87.363 53.415,87.363 	" />
                    <path
                      d="M99.901,129.037c14.656,0,22.873-9.404,22.873-26.354c0-16.877-8.217-26.279-22.873-26.279
		c-14.805,0-23.021,9.402-23.021,26.279C76.88,119.633,85.097,129.037,99.901,129.037z M99.901,86.029c6.514,0,9.4,4.813,9.4,16.654
		s-2.887,16.729-9.4,16.729c-6.664,0-9.475-4.887-9.475-16.729S93.237,86.029,99.901,86.029z"
                    />
                    <path
                      d="M128.401,114.232c0,9.178,8.29,15.025,21.246,15.025c12.951,0,21.243-5.922,21.243-15.25
		c0-5.771-3.552-10.732-9.253-13.102c4.072-2.221,6.514-6.217,6.514-10.734c0-8.512-7.18-13.914-18.58-13.914
		c-11.25,0-18.505,5.258-18.505,13.549c0,4.512,2.814,8.656,7.18,11.1C132.251,103.275,128.401,108.307,128.401,114.232z
		 M149.647,84.918c4.811,0,7.475,2.148,7.475,5.994c0,3.703-2.664,5.777-7.475,5.777c-4.813,0-7.477-2.074-7.477-5.777
		C142.17,87.066,144.835,84.918,149.647,84.918z M149.647,106.164c5.697,0,8.881,2.441,8.881,6.736c0,4.441-3.184,6.811-8.881,6.811
		c-5.701,0-8.809-2.445-8.809-6.811C140.839,108.605,143.946,106.164,149.647,106.164z"
                    />
                    <path
                      d="M199.466,129.037c14.655,0,22.872-9.404,22.872-26.354c0-16.877-8.217-26.279-22.872-26.279
		c-14.805,0-23.023,9.402-23.023,26.279C176.443,119.633,184.661,129.037,199.466,129.037z M199.466,86.029
		c6.514,0,9.398,4.813,9.398,16.654s-2.885,16.729-9.398,16.729c-6.662,0-9.475-4.887-9.475-16.729S192.804,86.029,199.466,86.029z"
                    />
                    <path
                      d="M234.948,121.119h4.865c6.857,0,10.803-3.641,10.803-9.924c0-5.973-3.945-9.346-10.803-9.346h-11.682v26.816h6.816V121.119
		z M234.948,107.213h4.521c2.987,0,4.712,1.414,4.712,4.217c0,2.832-1.725,4.326-4.712,4.326h-4.521V107.213z"
                    />
                  </g>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#fff"
                    d="M11.75 15a2.25 2.25 0 0 1 .154 4.495l-.154.005H11v1.75a.75.75 0 0 1-.648.743L10.25 22a.75.75 0 0 1-.743-.648L9.5 21.25v-5.5a.75.75 0 0 1 .648-.743L10.25 15h1.5ZM18 15a2 2 0 0 1 2 2a.75.75 0 0 1-1.493.102L18.5 17a.5.5 0 0 0-.41-.492L18 16.5h-.625a.625.625 0 0 0-.092 1.243l.092.007h.5a2.125 2.125 0 0 1 .152 4.245l-.152.005h-.625a2 2 0 0 1-2-2a.75.75 0 0 1 1.493-.102l.007.102a.5.5 0 0 0 .41.492l.09.008h.625a.625.625 0 0 0 .092-1.243l-.092-.007h-.5a2.125 2.125 0 0 1-.152-4.245l.152-.005H18ZM7.75 15a.75.75 0 0 1 .102 1.493l-.102.007H5.5v1.502h1.75a.75.75 0 0 1 .102 1.494l-.102.007H5.5v1.728a.75.75 0 0 1-.648.743l-.102.007a.75.75 0 0 1-.743-.648L4 21.231V15.75a.75.75 0 0 1 .648-.743L4.75 15h3Zm4 1.5H11V18h.75a.75.75 0 0 0 .102-1.493l-.102-.007ZM8.251 3a2.751 2.751 0 0 1 2.752 2.751a1 1 0 0 1-1.994.117l-.006-.117a.752.752 0 0 0-.65-.744L8.251 5h-.248a1 1 0 0 0-.994.883L7.003 6v1.17a3 3 0 1 1-2 2.83l.001-.105l-.001-.05V6a3 3 0 0 1 2.823-2.995L8.003 3h.248ZM15 3a3 3 0 0 1 2.995 2.824L18 6v4a3 3 0 0 1-5.995.176L12 10V6a3 3 0 0 1 3-3ZM8.003 9a1 1 0 1 0 0 2a1 1 0 0 0 0-2ZM15 5a1 1 0 0 0-.993.883L14 6v4a1 1 0 0 0 1.993.117L16 10V6a1 1 0 0 0-1-1Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
