function Features() {
  const features = [
    {
      title: "Fast Delivery",
      description: "Get products delivered within 24 hours.",
      icon: "🚚",
    },
    {
      title: "Secure Payment",
      description: "100% secure payment methods.",
      icon: "🔒",
    },
    {
      title: "Premium Quality",
      description: "Only genuine and premium products.",
      icon: "⭐",
    },
    {
      title: "24/7 Support",
      description: "Customer support anytime.",
      icon: "🎧",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">
        Why Choose Us
      </h2>

      <div className="grid md:grid-cols-4 gap-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-3xl shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-3">
              {item.title}
            </h3>
            <p className="text-gray-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;