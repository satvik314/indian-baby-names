import { CreativeBabyNameFinderComponent } from '@/components/creative-baby-name-finder'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <CreativeBabyNameFinderComponent />
      </main>

      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>Built by <a href="https://www.buildfastwithai.com/genai-course" className="text-purple-600 hover:underline">Build Fast with AI</a></p>
        </div>
      </footer>
    </div>
  )
}
