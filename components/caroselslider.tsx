'use client'
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

export function AnimeCarousel({data}:any){
  if (!data) return;

  const chunkArray = (array: any[], size: number) =>
  Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );

  const chunks = chunkArray(data, 5);

  return(
    <>
    {chunks.map((chunk: any[], index: number) => (
     <Swiper
     key={index}
        speed={600}
          spaceBetween={20}
          slidesPerView={1.6}
          breakpoints={{
            425: {
              spaceBetween: 10,
              slidesPerView: 1.7,
            },
            768: {
              spaceBetween: 15,
              slidesPerView: 3,
            },
            1024: {
              spaceBetween: 20,
              slidesPerView: 3.5,
            },
            1440: {
              spaceBetween: 20,
              slidesPerView: 4.5,
            },
          }}
          className="homesliderswiper"
        >
           {chunk.map((item: any, idx: number) => (
           <SwiperSlide key={idx} className="homesliderswiperslide">
              <Link
                href={`/AniDojo/anime/${item.id}`}
              >
                <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt="" />
                <div className="homesliderswiperslide-info">
                  <h4 className="homesliderswiperslide-name">
                  {item.name ? item.name : item.title}
                  </h4>
                  <span>
                  {item.movie_quality && (
                      <h4 className="homesliderswiperslide-datentime">
                        {item.movie_quality}
                      </h4>
                    )}
                    <hr />
                    {item.first_air_date ? (
                      <h4 className="homesliderswiperslide-datentime">
                        {item.first_air_date.substring(0,4)}
                      </h4>
                    ) : (
                      <h4 className="homesliderswiperslide-datentime">
                        {item.release_date.substring(0,4)}
                      </h4>
                    )}
                  </span>
                </div>
              </Link>
            </SwiperSlide>
             ))}
        </Swiper>
          ))}
    </>
  )
}

export function MovieCarousel({data}:any){
  if (!data) return;

  const chunkArray = (array: any[], size: number) =>
  Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );

  const chunks = chunkArray(data, 5);

  return(
    <>
    {chunks.map((chunk: any[], index: number) => (
     <Swiper
     key={index}
        speed={600}
          spaceBetween={20}
          slidesPerView={1.6}
          breakpoints={{
            425: {
              spaceBetween: 10,
              slidesPerView: 1.7,
            },
            768: {
              spaceBetween: 15,
              slidesPerView: 3,
            },
            1024: {
              spaceBetween: 20,
              slidesPerView: 3.5,
            },
            1440: {
              spaceBetween: 20,
              slidesPerView: 4.5,
            },
          }}
          className="homesliderswiper"
        >
           {chunk.map((item: any, idx: number) => (
           <SwiperSlide key={idx} className="homesliderswiperslide">
              <Link
                href={`/AniDojo/movie/${item.id}`}
              >
                <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt="" />
                <div className="homesliderswiperslide-info">
                  <h4 className="homesliderswiperslide-name">
                  {item.name ? item.name : item.title}
                  </h4>
                  <span>
                    <hr />
                    {item.first_air_date ? (
                      <h4 className="homesliderswiperslide-datentime">
                        {item.first_air_date.substring(0,4)}
                      </h4>
                    ) : (
                      <h4 className="homesliderswiperslide-datentime">
                        {item.release_date.substring(0,4)}
                      </h4>
                    )}
                  </span>
                </div>
              </Link>
            </SwiperSlide>
             ))}
        </Swiper>
          ))}
    </>
  )
}