import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import UploadModal from '../components/UploadModal'

export default function Home() {
  return (
    <div className="bg-[#121212] min-h-screen text-white">
      <Head>
        <title>DK - IG Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header boolean={true} />
      <Feed />
      <UploadModal />
    </div>
  )
}
