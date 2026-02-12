import { MovieService } from '@/services/movie';

export default async function Home() {
  const [movie] = await Promise.all([
    MovieService.getDetails(840464)
  ])

  console.log(movie);

  return (
    <main>
      <h1>Postboxd home</h1>
      <div>
        <h3>{movie.title}</h3>
      </div>
    </main>
  );
}
