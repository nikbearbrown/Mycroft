export default function Partners() {
  return (
    <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-800">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Companies We Work With</h2>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6 items-center justify-center py-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
