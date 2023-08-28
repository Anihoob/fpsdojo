"use client";
import "../../../globals.css";
import Link from "next/link";
import Supabase from "@/thirdparty_req/supabase";
import { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";
import animereq from "@/thirdparty_req/animereq";

interface umrl {
  title: string | undefined | any;
  id: string | any;
}

interface datatype {
  id: number;
  tv_series_title: string;
  season_number: number | any;
  episode_number: number | any;
  episode_link: string;
  episode_id: string;
  season_id: string;
  tv_series_id: string;
  season_quality: string;
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

  const superbase = Supabase();

  const [supabasedata, setSupabasedata] = useState<datatype[]>();

  async function fetchsupabase() {
    if (!supabasedata) {
      try {
        const { data } = await superbase.rpc("fetch_anime");
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

  const [fetchepsiode, setFetchepisode] = useState<datatype[] | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<datatype | null>(null);
  const [selectedEpisodeDownloadLink, setSelectedEpisodeDownloadLink] =
    useState<string | null>(null);

  const [filteredEpisodes, setFilteredEpisodes] = useState<datatype[] | null>(
    null
  );

  function fetchAnimeByTitle() {
    if (!fetchepsiode) {
      if (supabasedata) {
        const rez = supabasedata.filter(
          (bruh: datatype) => whichanime === bruh.tv_series_title
        );
        setFetchepisode(rez);
      }
    }
  }

  useEffect(() => {
    fetchAnimeByTitle();
  }, [supabasedata, whichanime]);

  useEffect(() => {
    if (selectedSeason !== null) {
      const episodesInSelectedSeason = fetchepsiode?.filter(
        (episode) => episode.season_number === selectedSeason
      );
      setFilteredEpisodes(episodesInSelectedSeason || null);
    }
  }, [selectedSeason, fetchepsiode]);

  const [gugudata, setGugudata] = useState<animedes | null>(null);

  async function gugu() {
    if (gugudata === null) {
      try {
        const animeFetch = await animereq({ id: whichanime });
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
  }, []);

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
    <div className={"infopagemain"}>
      <div className={"infopageoptions"}>
        <span>
          <div className="a" onClick={backUrl}>
            <Icon
              icon={"material-symbols:arrow-back-ios-new-rounded"}
              className={"icons"}
            />
          </div>
          <div onClick={shareOrCopyUrl} className="a">
            <Icon icon={"iconoir:share-ios"} className={"icons"} />
          </div>
        </span>
      </div>
      {copied && <p className={'copiedpopup'}>Url Copied</p>}

      {gugudata && (
        <>
          <div className={"infopageposter"}>
            <img src={gugudata.image} alt="" />
          </div>
          <div className={"infopageinfo"}>
            <div className={"infopagecard"}>
              <h4 className={"infopagetitle"}>
                {gugudata.title?.toUpperCase()}
              </h4>
              <div className={"infopagegenre"}>
                <h5>{gugudata.genres[0]}</h5>
                <hr />
                <h5>{gugudata.releaseDate}</h5>
                <hr />
                <h5>{gugudata.totalEpisodes} Ep</h5>
              </div>

              {fetchepsiode && (
                <div className={"infopageselectbtn"}>
                  <select
                    onChange={(e) =>
                      setSelectedSeason(parseInt(e.target.value))
                    }
                    className={"infopagedwnldselect"}
                  >
                    <option value="0">Season</option>
                    {Array.from(
                      new Set(
                        fetchepsiode.map((episode) => episode.season_number)
                      )
                    ).map((seasonNumber) => (
                      <option key={seasonNumber} value={seasonNumber}>
                        Season {seasonNumber}
                      </option>
                    ))}
                  </select>
                  <select
                    onChange={(e) =>
                      setSelectedEpisodeDownloadLink(
                        filteredEpisodes?.find(
                          (episode) =>
                            episode.episode_number === parseInt(e.target.value)
                        )?.episode_link || null
                      )
                    }
                    className={"infopagedwnldselect"}
                  >
                    <option value="0">Episode</option>
                    {filteredEpisodes
                      ?.sort((a, b) => a.episode_number - b.episode_number)
                      .map((episode) => (
                        <option
                          key={episode.episode_id}
                          value={episode.episode_number}
                        >
                          Episode {episode.episode_number}
                        </option>
                      ))}
                  </select>
                </div>
              )}
              {selectedEpisodeDownloadLink && (
                <div className={"infopagedwnldbtn"}>
                  <Link href={selectedEpisodeDownloadLink} target="_blank">
                    <button>Download</button>
                  </Link>
                </div>
              )}
              <div className={expanded ? "expanded" : "infopageabout"}>
                <p className={"infopagedes"}>{gugudata.description}</p>
              </div>
              <button className={"showMoreButton"} onClick={toggleDescription}>
                {expanded ? "...Less" : "...More"}
              </button>
              {fetchepsiode &&
                fetchepsiode.some(
                  (episode) => episode.season_quality === "4k60fps"
                ) && (
                  <div className={"infopageaquality"}>
                    <Icon
                      icon={"iconoir:modern-tv-4k"}
                      style={{ fontSize: "30px", color: "white" }}
                    />
                    <Icon
                      icon={"fluent:fps-60-24-filled"}
                      style={{ fontSize: "30px", color: "white" }}
                    />
                  </div>
                )}
              {fetchepsiode &&
                fetchepsiode.some(
                  (episode) => episode.season_quality === "1080p60fps"
                ) && (
                  <div className={"infopageaquality"}>
                    <Icon
                      icon={"material-symbols:full-hd-outline-rounded"}
                      style={{ fontSize: "30px", color: "white" }}
                    />
                    <Icon
                      icon={"fluent:fps-60-24-filled"}
                      style={{ fontSize: "30px", color: "white" }}
                    />
                  </div>
                )}
              {fetchepsiode &&
                fetchepsiode.some(
                  (episode) => episode.season_quality === "1080p144fps"
                ) && (
                  <div className={"infopageaquality"}>
                    <Icon
                      icon={"material-symbols:full-hd-outline-rounded"}
                      style={{ fontSize: "30px", color: "white" }}
                    />
                    <p>144fps</p>
                  </div>
                )}
              {fetchepsiode &&
                fetchepsiode.some(
                  (episode) => episode.season_quality === "1080p120fps"
                ) && (
                  <div className={"infopageaquality"}>
                    <Icon
                      icon={"material-symbols:full-hd-outline-rounded"}
                      style={{ fontSize: "30px", color: "white" }}
                    />
                    <p>120fps</p>
                  </div>
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
