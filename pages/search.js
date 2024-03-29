import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';
import { googleData } from '../Response';

function Search({ results }) {
  console.log(results);
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{router.query.term} - Google Search</title>
        <link
          rel='icon'
          href='https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png'
        />
      </Head>

      {/*  Header */}

      <Header />

      {/* Search Results */}
      <SearchResults results={results} />
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const useDummyData = false;
  const startIndex = context.query.start || '0';

  const data = useDummyData
    ? googleData
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`
      )
        .then(res => res.json())
        .catch(err => {
          console.error(err);
        });

  return {
    props: {
      results: data,
    },
  };
}
