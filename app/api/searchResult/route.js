export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        const query = searchParams.get("query");
        const page = searchParams.get("page");

        const data = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=ko-KR&page=${page}&api_key=${process.env.TMDB_API_KEY}`,
            { method: "GET", headers: { "Content-Type": "application/json" } }
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
