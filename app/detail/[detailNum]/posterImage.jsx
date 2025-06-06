import Image from "next/image";

export default function PosterImage({ path }) {
    return (
        <Image
            src={`https://image.tmdb.org/t/p/w500${path}`}
            alt="영화 포스터"
            fill
            style={{
                objectFit: "cover",
                zIndex: -1,
            }}
            priority
            fetchPriority="high"
        />
    );
}
