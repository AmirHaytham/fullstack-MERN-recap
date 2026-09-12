// Route prefix : a <Route path> with NO element adds a path prefix to its
//                children, without introducing a parent layout.
// Dynamic Route: capture a value from the URL with :param, read it with useParams().

import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet, useParams, useLocation } from 'react-router-dom';

const USERS = [
  { id: 1, name: 'Menna', role: 'TA' },
  { id: 2, name: 'Hassan', role: 'TA' },
  { id: 3, name: 'Rahma', role: 'TA' },
];

const PROJECTS = [
  { pid: 'sp1', title: 'Software Project I' },
  { pid: 'db2', title: 'Databases II' },
];

// dynamic route
function UserProfile() {
  // This extracts the value from the URL
  const { userId } = useParams();
  const user = USERS.find((u) => u.id === Number(userId));

  return (
    <div className="card">
      <h2>User profile</h2>
      <p>
        <code>useParams()</code> gave us <code>userId = "{userId}"</code>
      </p>
      {user ? (
        <p>
          <strong>{user.name}</strong> ({user.role})
        </p>
      ) : (
        <p className="note">No user with that id. The route still matched.</p>
      )}
      <p className="note">
        The value is always a <strong>string</strong>, even for "42". That is why
        the lookup uses <code>Number(userId)</code>.
      </p>
    </div>
  );
}

// more than one param in the same URL
function CourseGrade() {
  const { courseId, studentId } = useParams();
  return (
    <div className="card">
      <h2>Two params in one URL</h2>
      <pre>{JSON.stringify({ courseId, studentId }, null, 2)}</pre>
    </div>
  );
}

// route prefix
function ProjectsHome() {
  return (
    <div className="card">
      <h2>Projects</h2>
      <ul>
        {PROJECTS.map((p) => (
          <li key={p.pid}>
            <Link to={`/projects/${p.pid}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// a real layout, used only under the prefix
function ProjectsLayout() {
  return (
    <div className="card" style={{ border: '2px dashed #1f7ac0' }}>
      <p className="note">ProjectsLayout: this box only wraps a single project.</p>
      <Outlet />
    </div>
  );
}

function Project() {
  const { pid } = useParams();
  const project = PROJECTS.find((p) => p.pid === pid);
  return (
    <>
      <h2>{project ? project.title : 'Unknown project'}</h2>
      <p><code>pid = "{pid}"</code></p>
      <Link to={`/projects/${pid}/edit`}>Edit this project</Link>
    </>
  );
}

function EditProject() {
  const { pid } = useParams();
  return (
    <>
      <h2>Editing {pid}</h2>
      <Link to={`/projects/${pid}`}>Cancel</Link>
    </>
  );
}

function CurrentUrl() {
  const location = useLocation();
  return <p className="note">URL: <code>{location.pathname}</code></p>;
}

export default function App() {
  return (
    <BrowserRouter>
      <h1>Route prefix and dynamic routes</h1>
      <p className="slide">Slide: Routing, Route prefix / Dynamic Route (page 029)</p>

      <nav>
        <Link to="/users/1">/users/1</Link>
        <Link to="/users/2">/users/2</Link>
        <Link to="/users/99">/users/99</Link>
        <Link to="/courses/sp1/students/42">two params</Link>
        <Link to="/projects">/projects</Link>
      </nav>
      <CurrentUrl />

      <Routes>
        <Route path="/" element={<ProjectsHome />} />

        {/* dynamic route: :userId is a placeholder */}
        <Route path="/users/:userId" element={<UserProfile />} />

        {/* two params in one path */}
        <Route path="/courses/:courseId/students/:studentId" element={<CourseGrade />} />

        {/* ROUTE PREFIX: this Route has a path but NO element.
            It only adds "/projects" in front of its children. */}
        <Route path="projects">
          <Route index element={<ProjectsHome />} />

          {/* this one HAS an element, so it is a real layout */}
          <Route element={<ProjectsLayout />}>
            <Route path=":pid" element={<Project />} />
            <Route path=":pid/edit" element={<EditProject />} />
          </Route>
        </Route>
      </Routes>

      <div className="card">
        <h2>The difference in one sentence</h2>
        <ul>
          <li>
            <code>&lt;Route path="projects"&gt;</code> with no element: adds a URL
            prefix, renders nothing of its own.
          </li>
          <li>
            <code>&lt;Route element={'{<ProjectsLayout />}'}&gt;</code> with no
            path: adds shared UI, changes no URL.
          </li>
        </ul>
        <p className="note">
          Click /projects, then a project. The dashed layout box appears only for
          a single project, never on the list.
        </p>
      </div>
    </BrowserRouter>
  );
}
