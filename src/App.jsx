import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProjectPage from './pages/ProjectPage'
import { projects } from './data/projects'

// Minimal routing: "/" is the home page, "/projects/<slug>" a project page.
// Links are plain <a href>, so each page is loaded fresh (scroll animations start clean).
function App() {
  const match = window.location.pathname.match(/^\/projects\/([^/]+)\/?$/)
  if (!match) return window.location.pathname === '/' ? <Home /> : <NotFound />

  const project = projects.find((p) => p.slug === match[1] && p.caseStudy && !p.caseStudy.draft)
  return project ? <ProjectPage project={project} /> : <NotFound />
}

export default App
