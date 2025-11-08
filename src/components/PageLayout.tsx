import Sidebar from './Sidebar'

interface PageLayoutProps {
  children: React.ReactNode
  title?: string
}

const PageLayout = ({ children, title }: PageLayoutProps) => {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              {title && (
                <div className="mb-8">
                  <h1 className="font-adamina text-4xl md:text-5xl font-bold text-[#40474a] mb-4">
                    {title}
                  </h1>
                </div>
              )}
              {children}
            </div>
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </section>
  )
}

export default PageLayout
