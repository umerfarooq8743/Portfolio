import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Engineering } from './components/Engineering'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { OpenSource } from './components/OpenSource'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <div aria-hidden="true" className="page-atmosphere" />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Projects />
        <Engineering />
        <About />
        <Experience />
        <Skills />
        <OpenSource />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
