import WorldNewsWordCloud from '../components/WorldNewsWordCloud';

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Daily News Word Cloud</h1>
      <WorldNewsWordCloud />
    </div>
  )
}
