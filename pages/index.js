import HeadTitle from '@/components/headTitle';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id, title) => {
    router.push( `/movies/${title}/${id}`);
  }

  return (
    <div className='container'>
      <HeadTitle title="Home" />
      {results?.map((movie) => (
        // <Link legacyBehavior href={`/movies/${movie.id}`} key={movie.id}>
        //     <div className='movie'>
        //       <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
        //       <h4>{movie.original_title}</h4>
        //     </div>
        // </Link>
          <div onClick={() => onClick(movie.id, movie.original_title)} className='movie' key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
            <h4>
              <Link legacyBehavior href={`/movies/${movie.original_title}/${movie.id}`}>
              {movie.original_title}
              </Link>
            </h4>
          </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }

        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const { results } = await (await fetch(`http://localhost:3000//api/movies`)).json(); // 여기에는 절대 주소로 넣어야함
  return {
    props: {
      results,
    },
  };
}