export async function POST(request) {
    try {
        const body = await request.json();
        const data = JSON.parse(body.data);

        const fetchDataFor = (number) => {
            return fetch(
                `https://api.themoviedb.org/3/movie/${number}?api_key=${process.env.TMDB_API_KEY}&language=ko-KR`,
                { method: "GET" }
            ).then((r) => {
                if (r.status == 200) {
                    return r.json();
                } else {
                    console.error("tmdb Server Error");
                    return null;
                }
            });
        };

        const dataPromises = data.map(fetchDataFor);
        const allData = await Promise.all(dataPromises);

        return Response.json(
            allData.filter((item) => item !== null),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return Response.json("서버에러", { status: 500 });
    }
}
