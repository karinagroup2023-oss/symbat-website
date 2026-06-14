import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { Pains } from './sections/Pains'
import { WhyNotOrdinary } from './sections/WhyNotOrdinary'
import { Services } from './sections/Services'
import { Passport } from './sections/Passport'
import { Process } from './sections/Process'
import { Audience } from './sections/Audience'
import { About } from './sections/About'
import { FinalCta } from './sections/FinalCta'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pains />
        <WhyNotOrdinary />
        <Services />
        <Passport />
        <Process />
        <Audience />
        <About />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
