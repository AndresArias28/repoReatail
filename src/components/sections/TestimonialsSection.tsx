export function TestimonialsSection() {
  return (
    <section id="testimonios" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros 
            <span style={{background: 'linear-gradient(to right, #0071BC, #662D91)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>usuarios</span>
          </h2>
          <p className="text-xl text-gray-600">
            Historias reales de personas que han sido bendecidas
          </p>
        </div>
        {/* Testimonials content will be added here */}
      </div>
    </section>
  );
}
