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
  episode_number?: string | any;
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
  const ifMovie = fetchepsiode?.map((lao: any) => lao.season_number)
  const ifMoviel = fetchepsiode?.map((lao: any) => lao.episode_link)
  const [selectedSeason, setSelectedSeason] = useState<any>(0);

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
    if (selectedSeason > 0 || selectedSeason === 'Specials') {
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
              width={300}
              height={300}
              className="mobileimg"
              src={`https://image.tmdb.org/t/p/original${gugudata.poster_path}`}
              alt={gugudata.name}
            />
            <Image
              width={800}
              height={800}
              className="deskimg"
              src={`https://image.tmdb.org/t/p/original${gugudata.backdrop_path}`}
              alt={gugudata.name}
            />
          </div>
          <div className="infosection">
            <div className="infomain">
              <div className="infosub">
                <img
                  src={`https://image.tmdb.org/t/p/original${gugudata.extra.logos[0].file_path}`}
                  alt={gugudata.name}
                />
                <span>
                  <h5>{gugudata.genres[0].name}</h5>
                  <hr />
                  {gugudata.first_air_date ? (
                    <h5>{gugudata.first_air_date.substring(0, 4)}</h5>
                  ) : (
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
              {fetchepsiode && ifMovie != 0 ? (
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
                        const seasonEpisodes = fetchepsiode.filter(
                          (episode: any) =>
                            episode.season_number === selectedSeason
                        );
                        const episodeWithLink = seasonEpisodes.find(
                          (episode: any) =>
                            episode.episode_number === epis.episode_number
                        );

                        if (episodeWithLink) {
                          return (
                            <div className="episode" key={epis.id}>
                              <Image
                                width={200}
                                height={200}
                                src={`https://image.tmdb.org/t/p/original${epis.still_path}`}
                                alt={epis.name}
                              />
                              <span>
                                <h5>Episode {epis.episode_number}</h5>
                                <h5>{epis.air_date}</h5>
                              </span>
                              <h4>{epis.name}</h4>
                              <h5>{episodeWithLink.episode_quality}</h5>
                              <Link
                                href={
                                  episodeWithLink.episode_link
                                    ? episodeWithLink.episode_link
                                    : "/"
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
                </div>
              ):(
                <div className="download">
                <span>
                  <img
                    src={`https://image.tmdb.org/t/p/original${gugudata.extra.backdrops[2].file_path}`}
                    alt={gugudata.name}
                  />
                  <h4>{gugudata.title}</h4>
                  <Link href={ifMoviel[0] ? ifMoviel[0] : "/"}>Download</Link>
                </span>
              </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
