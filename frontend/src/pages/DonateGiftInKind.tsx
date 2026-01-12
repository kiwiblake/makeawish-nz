import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { HeroSection } from 'components/HeroSection';
import { InfoSectionWithImage } from 'components/InfoSectionWithImage';
import { GiftInKindForm } from 'components/GiftInKindForm';
import { Gift, Gamepad2, Plane, Ticket, ShoppingBag, Utensils, Sparkles, Heart } from 'lucide-react';

// Gift categories we'd love to receive
const giftCategories = [
  { icon: Gamepad2, title: "Technology & Gaming", description: "Consoles, tablets, VR headsets" },
  { icon: Plane, title: "Travel Experiences", description: "Flights, hotel stays, theme parks" },
  { icon: Ticket, title: "Event Tickets", description: "Sports, concerts, attractions" },
  { icon: Gift, title: "Toys & Games", description: "Board games, outdoor equipment" },
  { icon: ShoppingBag, title: "Gift Vouchers", description: "Retail, entertainment, dining" },
  { icon: Utensils, title: "Experiences", description: "Cooking classes, adventure activities" },
  { icon: Sparkles, title: "Special Items", description: "Costumes, party supplies, decorations" },
  { icon: Heart, title: "Services", description: "Professional services, entertainment" },
];

const DonateGiftInKind = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection
          title="Donate a Gift in Kind"
          imageUrl="https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/fundraisingatschool.webp"
          imageAlt="Children enjoying special experiences"
          buttonText="Donate a Gift"
          buttonLink="#donation-form"
          buttonBgColor="bg-destructive"
          buttonTextColor="text-white"
        />

        {/* What are gifts in kind? */}
        <InfoSectionWithImage
          title="What are gifts in kind?"
          text="<p>Gifts in Kind can range from a box at an arena or stadium, allowing a wish child to watch the match of their dreams, a hotel stay for a wish family to spend some quality time together during their wish, to a tasty meal at a restaurant.</p><p>We simply couldn't grant life-changing wishes without the support and generosity of businesses and community partners across New Zealand. Whether you can offer a ride in a limo or an Apple iPad, please get in touch to find out more.</p>"
          imageUrl="https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/Jaspers-Wish.webp"
          imageAlt="Child receiving a special gift"
          reverseLayout={false}
        />

        {/* How to donate */}
        <InfoSectionWithImage
          title="How to donate a gift in kind"
          text="<p>If you would like to donate a gift in kind, please complete our form below and a member of our team will be in touch. You can donate a gift in kind as an individual or a company.</p><p>Please note, our wishes are just as unique as our wish children and in some cases, we may not have a wish to match your offer too. If we cannot make use of your offer to grant a wish, we will make you aware of other ways you could support Make-A-Wish New Zealand.</p>"
          imageUrl="https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/fundraiseimage.webp"
          imageAlt="Make-A-Wish team member"
          reverseLayout={true}
          backgroundColor="bg-gray-50"
        />

        {/* Gifts we'd love to receive */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
              Gifts we would love to receive!
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              There are certain items, services and experiences that are used to help us grant many wishes.
              We are always in need of the following:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {giftCategories.map((category, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 hover:bg-primary/5 transition-colors"
                >
                  <category.icon className="w-10 h-10 text-primary mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality control framework */}
        <InfoSectionWithImage
          title="Quality control framework"
          text="<p>Our wish children's safety and happiness is at the heart of everything we do. We have developed a quality control framework which allows us to seek and grant gifts in kind without compromising the quality of the wish.</p><p>To accept your donation, please provide us with the documentation below that is relevant to your gift in kind:</p>"
          bulletPointsText={`Proof of being a registered company/sole trader/charity - Any company or small business providing services on a wish must be government registered with Companies House or HMRC and provide us with their unique 10-digit tax reference or charity number.
Public Liability Insurance - Any tradesperson, venue etc. must have public liability insurance and provide us with a copy of their certificate.
Evidence of the normal cost of your gift - In order for us to report on your donation for any audit purposes, we need written confirmation from yourselves (e.g., an email) of how much you would normally charge for the goods or services that you are offering Make-A-Wish NZ.
Proof of purchase - If you are donating items, tickets or experiences that you have purchased, you will need to provide us with proof of purchase to show where and how it was purchased, along with official booking details.`}
          imageUrl="https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/fundraisingatwork.webp"
          imageAlt="Quality assurance process"
          reverseLayout={false}
          backgroundColor="bg-gray-50"
        />

        {/* Donation Form */}
        <GiftInKindForm />

        {/* Story/Testimonial Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Your gift could help more children like Hattie
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Hattie's wish to have a shopping spree allowed her to have a day that was all about her,
                rather than her condition. Below, you can watch a video of how Hattie's wish was granted
                thanks to donations of gifts in kind from people like you. With your support we can bring
                joy and happiness to children who need it the most. The donations included services such
                as tickets to attractions, clothes and shoes, a meal at a restaurant.
              </p>
              <a
                href="/wish-stories"
                className="inline-block bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-full transition duration-300"
              >
                Read More Wish Stories
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DonateGiftInKind;
