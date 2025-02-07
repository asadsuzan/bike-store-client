import Footer from "../components/Shared/Footer";
import Testimonial from "../components/Shared/Testimonial";

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">


      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">About BikeBD</h2>
          <p className="text-lg">
            Discover the story behind our passion for bikes and our commitment to quality.
          </p>
        </div>
      </section>

      {/* About Content Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              At BikeBD, our mission is to provide high-quality bikes that cater to every rider's needs. Whether you're commuting in the city or exploring off-road trails, we have the perfect bike for you.
            </p>
            <p className="text-gray-600 mb-6">
              We believe in sustainability and innovation, which is why we source eco-friendly materials and incorporate the latest technology into our designs.
            </p>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h3>
            <p className="text-gray-600 mb-6">
              BikeBD was founded in 2020 by a group of cycling enthusiasts who wanted to make premium bikes accessible to everyone. What started as a small workshop has now grown into a trusted brand with a global presence.
            </p>
            <p className="text-gray-600 mb-6">
              Over the years, we've built a community of passionate riders who share our love for cycling. Join us on this journey and experience the joy of riding a BikeBD bike.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
  <Testimonial/>

      {/* Footer Section */}
  <Footer/>
    </div>
  );
};

export default AboutPage;