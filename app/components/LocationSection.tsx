export default function LocationSection() {
  return (
    <section className="mb-12 mt-16 relative">
      <div className="flex items-center gap-3 mb-6">
        <span className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </span>
        <h2 className="text-2xl font-bold text-white">Ubicación</h2>
      </div>

      <div className="rounded-2xl overflow-hidden border border-stone-800 bg-stone-900/50 shadow-2xl relative group">
        <div className="aspect-video w-full relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d473.0950312946887!2d-95.2114303!3d18.4491916!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c273001a71d72d%3A0x4e6a4dc1012219c8!2sAntojitos%20Tia%20kika!5e0!3m2!1ses!2smx!4v1767936244580!5m2!1ses!2smx"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale-[50%] hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 pointer-events-none border-4 border-stone-800/20 rounded-2xl shadow-inner"></div>
        </div>

        <div className="p-4 md:p-6 bg-stone-900 border-t border-stone-800 flex flex-col sm:flex-row gap-4 justify-between items-center text-center sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Antojitos Kika</h3>
            <p className="text-stone-400 text-sm">Visítanos y disfruta del auténtico sabor.</p>
          </div>
          <a
            href="https://maps.app.goo.gl/oEV9RS7UYYhUKa8t6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-500 transition-colors shadow-lg shadow-orange-900/20 active:scale-95 whitespace-nowrap"
          >
            <span>Cómo llegar</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
