

interface Props {
  id: string | any;
  type: string | any;
}

class RateLimiter {
  private tokens: number;
  private lastRefreshed: number;

  constructor(private readonly rateLimit: number) {
    this.tokens = rateLimit;
    this.lastRefreshed = Date.now();
  }

  async getToken() {
    const now = Date.now();
    const elapsedTime = now - this.lastRefreshed;
    const newTokens = Math.floor(elapsedTime / 50); // 50ms interval

    if (newTokens > 0) {
      this.tokens = Math.min(this.tokens + newTokens, this.rateLimit);
      this.lastRefreshed = now;
    }

    if (this.tokens > 0) {
      this.tokens--;
      return true;
    }

    return new Promise((resolve) => {
      const timeToWait = 50 - ((now - this.lastRefreshed) % 50);
      setTimeout(() => resolve(this.getToken()), timeToWait);
    });
  }
}

const tmdbRateLimiter = new RateLimiter(20);


export default async function Tmdb(props: Props) {
  await tmdbRateLimiter.getToken();

  const baseUrl = "https://api.themoviedb.org/3";
  const dataUrl = `${baseUrl}/${props.type}/${props.id}`;
  const logoUrl = `${dataUrl}/images?include_image_language=en`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
  };
  
  try {
    const [mainResponse, imagesResponse] = await Promise.all([
      fetch(dataUrl, options),
      fetch(logoUrl, options),
    ]);

    if (!mainResponse.ok || !imagesResponse.ok) {
      throw new Error("response code 400");
    }

    const mainData = await mainResponse.json();
    const logoData = await imagesResponse.json();

    const combinedData = {
      ...mainData,
      extra: logoData,
    };
    return combinedData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

type seasondataType = {
  id: string | number;
  seasonNo: string;
};

// 

export async function tmdbseasondata(props: seasondataType) {


  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
  };

  if (props.seasonNo === "0") {
    return;
  }

  try {
    const request = await fetch(
      `https://api.themoviedb.org/3/tv/${props.id}/season/${props.seasonNo}`,
      options
    );
    const data = await request.json();

    if (data && Array.isArray(data.episodes)) {
      const episodedata = data.episodes;
      return episodedata;
    }
  } catch (error) {
    console.log(error);
  }
}
