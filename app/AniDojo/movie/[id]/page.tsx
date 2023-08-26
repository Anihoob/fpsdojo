"use client";
import Link from "next/link";
import "../../../globals.css"
import Supabase from "@/thirdparty_req/supabase";
import { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";
import moviereq from "@/thirdparty_req/moviereq";

interface umrl {
  title: string | undefined | any;
  id: string | any;
}

interface datatype {
  movies_id: number | string ;
  movies_title: string | any;
  download_id: string;
  download_link: string | any | null;
}

type movides = {
  id?: number | string | any;
  title?: string;
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

  const [supabasedata, setSupabasedata] = useState<datatype[]>();
  async function fetchMoviesupabase() {
    if (!supabasedata) {
      try {
        const { data } = await superbase.rpc("get_movies");
        setSupabasedata(data);
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    fetchMoviesupabase();
  });

  const [fetchmovie, setFetchmovie] = useState<datatype | null>();
  function fetchMovieByTitle() {
    if (supabasedata) {
      const rez = supabasedata.find(
        (lmao: datatype) => lmao.movies_title.replace("movie/","") === whichmovie 
      );
      setFetchmovie(rez);
    }
  }

  useEffect(() => {
    fetchMovieByTitle();
  }, [supabasedata]);


  const [flixData, setFlixdata] = useState<movides | null>(null);
  async function flixhq() {
    if (flixData === null) {
      try {
        const movieFetch = await moviereq({id: "movie/" + whichmovie})
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
  },[]);

  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const [copied, setCopied] = useState(false);

  const shareOrCopyUrl = () => {
    const currentUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: 'Share this url',
        text: 'url: ',
        url: currentUrl
      });
    } else {
      navigator.clipboard.writeText(currentUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  function backUrl(){
    history.back()
  }


  return (
    <div className={"movieinfopagemain"}>
      <div className={"movieinfopageoptions"}>
        <span>
          <div className="a" onClick={backUrl}>
          <Icon
              icon={"material-symbols:arrow-back-ios-new-rounded"}
              className={"icons"}
            />
          </div>
          <div className="a" onClick={shareOrCopyUrl}>
          <Icon icon={"iconoir:share-ios"} className={"icons"} />
          </div>
        </span>
      </div>
      {copied && <p className={'copiedpopup'}>Url Copied</p>}
      {flixData && (
        <>
          <div className={"movieinfopageposter"}>
            <img
            className="mobileimg"
              src={flixData.image}
              alt={flixData.title}
            />
            <img
            className="deskimg"
              src={flixData.cover}
              alt={flixData.title}
            />
          </div>
          <div className={"movieinfopageinfo"}>
            <div className={"movieinfopagecard"}>
              <h4 className={"movieinfopagetitle"}>{flixData.title}</h4>
              <div className={"movieinfopagegenre"}>
                <h5>{flixData.genres && flixData.genres[0]}</h5>
                <hr />
                <h5>{flixData.releaseDate?.substring(0,4)}</h5>
                <hr />
                <h5>{flixData.duration}</h5>
              </div>
              {fetchmovie && (
                <div className={"movieinfopagedwnldbtn"}>
                  <Link href={fetchmovie.download_link} target="_blank">
                    <button>Download</button>
                  </Link>
                </div>
              )}
              <div className={expanded ? "expanded" : "movieinfopageabout"}>
                <p>{flixData.description}</p>
              </div>
              <button className={"showMoreButton"} onClick={toggleDescription}>
                {expanded ? "...Less" : "...More"}
              </button>
              <div className={"movieinfopageaquality"}>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
