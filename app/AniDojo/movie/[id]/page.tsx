"use client";
import Link from "next/link";
import "../../../globals.css";
import { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";
import Image from "next/image";
import Supabase from "@/lib/supabase/supabase";
import Tmdb from "@/lib/tmdb/tmdb";

interface umrl {
  title: string | undefined | any;
  id: string | any;
}

interface datatype {
  movie_id: number | string;
  movie_title: string | any;
  movie_type: string | any;
  download_id: string;
  download_link: string ;
  movies_quality: string | any;
}

type movides = {
  id?: number | string | any;
  title?: string | any;
  description?: string | undefined;
  image?: string | any;
  type?: string;
  releaseDate?: string;
  genres?: string | any;
  duration: string | any;
  cover: string;
};

export default function Movie({ params }: { params: umrl }) {
  const whichmovie = params.id;
  const superbase = Supabase();

  const [supabasedata, setSupabasedata] = useState<any>();
  async function fetchMoviesupabase() {
    if (!supabasedata) {
      try {
        const { data } = await superbase.rpc("get_tmdbmovies");
        setSupabasedata(data);
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    fetchMoviesupabase();
  });

  const [fetchmovie, setFetchmovie] = useState<datatype>();
  function fetchMovieByTitle() {
    if (supabasedata) {
      const rez = supabasedata.find(
        (lmao: any) => lmao.movie_title === whichmovie
      );
      setFetchmovie(rez);
    }
  }

  useEffect(() => {
    fetchMovieByTitle();
  }, );

  const [flixData, setFlixdata] = useState<movides | any>(null);
  async function flixhq() {
    if (whichmovie && fetchmovie) {
      try {
        // const movieFetch = await moviereq({id: "movie/" + whichmovie})
        const movieFetch = await Tmdb({
          id: whichmovie,
          type: fetchmovie?.movie_type,
        });
        setFlixdata(movieFetch);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      return;
    }
  }

  useEffect(() => {
    flixhq();
  }, [fetchmovie]);

  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const [copied, setCopied] = useState(false);

  const shareOrCopyUrl = () => {
    const currentUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: "Share this url",
        text: "url: ",
        url: currentUrl,
      });
    } else {
      navigator.clipboard.writeText(currentUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className={"movieinfopagemain"}>
      <div className={"movieinfopageoptions"}>
        <span>
          <Link className="a" href={"/Movies"}>
            <Icon
              icon={"material-symbols:arrow-back-ios-new-rounded"}
              className={"icons"}
            />
          </Link>
          <div className="a" onClick={shareOrCopyUrl}>
            <Icon icon={"iconoir:share-ios"} className={"icons"} />
          </div>
        </span>
      </div>
      {copied && <p className={"copiedpopup"}>Url Copied</p>}
      {flixData && (
        <>
          <div className={"movieinfopageposter"}>
            <Image
              width={350}
              height={350}
              className="mobileimg"
              src={`https://image.tmdb.org/t/p/original${flixData.poster_path}`}
              alt={flixData.title}
            />
            <Image
              width={700}
              height={700}
              className="deskimg"
              src={`https://image.tmdb.org/t/p/original${flixData.extra.backdrops[0].file_path}`}
              alt={flixData.title}
            />
          </div>
          <div className="movieinfosection">
            <div className="movieinfomain">
              <div className="movieinfosub">
                <img
                  src={`https://image.tmdb.org/t/p/original${flixData.extra.logos[0].file_path}`}
                  alt={flixData.title}
                />
                <span>
                  <h5>{flixData.genres[0].name}</h5>
                  <hr />
                  <h5>{flixData.release_date.substring(0, 4)}</h5>
                  <hr />
                  <h5>{flixData.runtime}mins</h5>
                </span>
                {fetchmovie && fetchmovie.movies_quality === "1080p60fps" && (
                  <span>
                    <svg
                      fill="white"
                      height="30px"
                      width="30px"
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
                    <Icon
                      icon={"fluent:fps-60-24-filled"}
                      style={{ fontSize: "30px", color: "white" }}
                    />
                  </span>
                )}
              </div>
            </div>
            <div className="movieinfosub2">
              <div className="description">
                <p className={expanded ? "more" : "less"}>
                  {flixData.overview}
                </p>
                <button onClick={toggleDescription}>
                  {expanded ? "Less" : "More"}
                </button>
              </div>
              <hr className="divider" />
              <div className="download">
                <span>
                  <img
                    src={`https://image.tmdb.org/t/p/original${flixData.extra.backdrops[2].file_path}`}
                    alt={flixData.name}
                  />
                  <h4>{flixData.title}</h4>
                  {fetchmovie && fetchmovie?.download_link && (
                    <Link href={fetchmovie?.download_link}>Download</Link>
                  )}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
