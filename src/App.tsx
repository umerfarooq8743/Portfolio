import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Approach } from './components/Approach'
import { OpenSource } from './components/OpenSource'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <div aria-hidden="true" className="page-ambient" />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Approach />
        <OpenSource />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
