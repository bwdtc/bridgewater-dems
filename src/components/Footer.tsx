const Footer = () => {
  return (
    <footer className="bg-[#40474a] text-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Our Town Section */}
          <div>
            <h3 className="font-alice text-xl font-bold mb-4">Our Town</h3>
            <blockquote className="text-sm leading-relaxed mb-4">
              <p className="mb-2">
                Outside, I'm all for progress. But once across the big bridge, progress wears a different face. It means preserving our tranquility against distant forces which press against us. We like it here; we mean to keep it this way. That's basic politics in Bridgewater.
              </p>
              <footer className="text-gray-400">
                -- 1985 - Theodore H. White, American political journalist, historian, and novelist.
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 mt-8 pt-6 text-sm text-gray-400">
          <p>Copyright © 2024 Bridgewater DTC. All rights reserved. Paid for by the Bridgewater DTC, Cynthia Feuer, Treasurer</p>
          <p className="mt-2">P.O. Box 132, Bridgewater, CT 06752</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
