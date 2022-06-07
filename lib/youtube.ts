// GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=THE%20BOYS&key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json
const BASE_URL = "https://youtube.googleapis.com/youtube/v3/search";





export const get_videoData = async (query: string) => {

    const res = await fetch(`${BASE_URL}?part=snippet&maxResults=1&q=${query}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`)

    const data = await res.json();
    const {items} = data;

    return items[0];
};
