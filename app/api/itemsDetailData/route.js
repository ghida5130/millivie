export async function POST(request) {
    const body = await request.json();
    const item = body.data;
    try {
        const data = await fetch(
            `https://api.themoviedb.org/3/movie/${item}?api_key=${process.env.TMDB_API_KEY}&language=ko-KR`,
            { method: "GET" }
        ).then((r) => {
            if (r.status == 200) {
                return r.json();
            } else {
                console.error("tmdb Server Error");
                return null;
            }
        });

        return Response.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json("서버에러", { status: 500 });
    }
}
