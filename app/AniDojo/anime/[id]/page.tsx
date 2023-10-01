"use client";
import "../../../globals.css";
import Link from "next/link";
import Supabase from "@/lib/supabase/supabase";
import { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";
import Tmdb, { tmdbseasondata } from "@/lib/tmdb/tmdb";
import Image from "next/image";

interface datatype {
  id?: number;
  tv_series_title?: string;
  season_number?: number | any;
  episode_number?: number | any;
  episode_link?: string;
  episode_id?: string;
  season_id?: string;
  tv_series_id?: string;
  season_quality?: string;
  tmdbanimes_title?: string | any;
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

export default function Tv({ params }: { params: { id: any } }) {
  const whichanime = params.id;

  const superbase = Supabase();

  const [supabasedata, setSupabasedata] = useState<datatype[]>();
  async function fetchsupabase() {
    if (!supabasedata) {
      try {
        const { data } = await superbase.rpc("get_tmdbanime");
        setSupabasedata(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  }

  useEffect(() => {
    fetchsupabase();
  });

  const [fetchepsiode, setFetchepisode] = useState<datatype | any>(null);
  const [selectedSeason, setSelectedSeason] = useState<number | any>(null);

  function fetchAnimeByTitle() {
    if (!fetchepsiode) {
      if (supabasedata) {
        const rez = supabasedata.filter(
          (bruh: datatype) => whichanime === bruh.tmdbanimes_title
        );
        setFetchepisode(rez);
      }
    }
  }

  useEffect(() => {
    fetchAnimeByTitle();
  }, [supabasedata, whichanime]);



  const [gugudata, setGugudata] = useState<animedes | any>(null);

  async function gugu() {
    if (gugudata === null) {
      try {
        // const animeFetch = await animereq({ id: whichanime });
        const animeType = fetchepsiode.map((lao: any) => lao.tmdbanimes_type);
        const animeFetch = await Tmdb({
          id: whichanime,
          type: animeType[0],
        });
        setGugudata(animeFetch);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  }

  useEffect(() => {
    gugu();
  }, [whichanime, fetchepsiode]);

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

  const [epidata, setEpidata] = useState<any>();
  async function bruh() {
    if (selectedSeason > 0) {
      const fetchepdata = await tmdbseasondata({
        id: whichanime,
        seasonNo: selectedSeason,
      });
      setEpidata(fetchepdata);
    }
  }

  useEffect(() => {
    bruh();
  }, [whichanime, selectedSeason]);

  return (
    <div className={"infopagemain"}>
      <div className={"infopageoptions"}>
        <span>
          <Link className="a" href={"/"}>
            <Icon
              icon={"material-symbols:arrow-back-ios-new-rounded"}
              className={"icons"}
            />
          </Link>
          <div onClick={shareOrCopyUrl} className="a">
            <Icon icon={"iconoir:share-ios"} className={"icons"} />
          </div>
        </span>
      </div>
      {copied && <p className={"copiedpopup"}>Url Copied</p>}

      {gugudata && (
        <>
          <div className={"infopageposter"}>
            <Image
              width={350}
              height={350}
              className="mobileimg"
              src={`https://image.tmdb.org/t/p/original${gugudata.poster_path}`}
              alt={gugudata.name}
            />
            <Image
              width={800}
              height={800}
              className="deskimg"
              src={`https://image.tmdb.org/t/p/original${gugudata.extra.backdrops[0].file_path}`}
              alt={gugudata.name}
            />
          </div>
          <div className="infosection">
            <div className="infomain">
              <div className="infosub">
                <img src={`https://image.tmdb.org/t/p/original${gugudata.extra.logos[0].file_path}`} alt="" />
                <span>
                  <h5>{gugudata.genre}</h5>
                  <hr />
                  {gugudata.first_air_date ? (
                    <h5>{gugudata.first_air_date.substring(0, 4)}</h5>
                    
                    ):(
                    <h5>{gugudata.release_date.substring(0, 4)}</h5>

                  )}
                </span>
              </div>
            </div>
            <div className="infosub2">
              <div className="description">
                <p className={expanded ? "more" : "less"}>
                  {gugudata.overview}
                </p>
                <button onClick={toggleDescription}>
                  {expanded ? "Less" : "More"}
                </button>
              </div>
              <hr className="divider" />
              {fetchepsiode && (
                <div className="season-select">
                  <select onChange={(e) => setSelectedSeason(e.target.value)}>
                    <option value="0" hidden>
                      Season
                    </option>
                    {Array.from(
                      new Set(
                        fetchepsiode.map(
                          (episode: any) => episode.season_number
                        )
                      )
                    ).map((seasonNumber: any) => (
                      <option value={seasonNumber} key={seasonNumber}>
                        Season {seasonNumber}
                      </option>
                    ))}
                  </select>
                  <div className="episodes-list">
                    {epidata &&
                      epidata.map((epis: any) => {
                        const episodeWithLink = fetchepsiode.find(
                          (episode: any) =>
                            episode.episode_number === epis.episode_number
                        );

                        if (episodeWithLink) {
                          return (
                            <div className="episode" key={epis.id}>
                              <Image
                              width={400}
                              height={400}
                                src={`https://image.tmdb.org/t/p/original${epis.still_path}`}
                                alt=""
                              />
                              <span>
                                <h5>Episode {epis.episode_number}</h5>
                                <h5>{epis.air_date}</h5>
                              </span>
                              <h4>{epis.name}</h4>
                              <p>{epis.overview}</p>
                              <h5>{episodeWithLink.episode_quality}</h5>
                              <Link
                                href={
                                  fetchepsiode.find(
                                    (episode: any) =>
                                      episode.episode_number ===
                                      epis.episode_number
                                  )?.episode_link || "/"
                                }
                              >
                                <button>Download</button>
                              </Link>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                  </div>
                  {/* <div className="episodes-list">
                    {epidata &&
                      epidata.map((epis: any) => (
                        fetchepsiode.find((ifep:any) => ifep.episode_link ) ? (
                          <div className="episode" key={epidata.id}>
                          <img
                            src={`https://image.tmdb.org/t/p/original${epis.still_path}`}
                            alt=""
                            />
                          <span><h5>Episode {epis.episode_number}</h5> <h5>{epis.air_date}</h5></span>
                          <h4>{epis.name}</h4>
                          <p>{epis.overview}</p>
                          
                          <Link href={fetchepsiode.find((episode:any)=> episode.episode_number === epis.episode_number)?.episode_link || '/'}>
                            <button>Download</button>
                          </Link>
                        </div>
                            ):null
                      ))}
                  </div> */}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
