// Select all section elements and navigation links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

// Intersection Observer for revealing sections on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const section = entry.target;
    const sectionId = section.getAttribute('id');
    const link = document.querySelector(`nav a[href="#${sectionId}"]`);

    if (entry.isIntersecting) {
      section.classList.add('visible');
      if (link) link.classList.add('active');
    } else {
      section.classList.remove('visible');
      if (link) link.classList.remove('active');
    }
  });
}, {
  root: null,
  threshold: 0.5
});

// Observe all sections
sections.forEach(section => observer.observe(section));

// Function to manually check active section (fallback for some cases)
function checkActiveSection() {
  let currentSection = null;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => link.classList.remove('active'));

  if (currentSection) {
    const activeLink = document.querySelector(`nav a[href="#${currentSection}"]`);
    if (activeLink) activeLink.classList.add('active');
  }
}

window.addEventListener('scroll', checkActiveSection);
document.addEventListener('DOMContentLoaded', checkActiveSection);

// === Three.js 3D Background ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background').appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ffe0, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.03;
  cube.rotation.y += 0.03;
  renderer.render(scene, camera);
}
animate();

// Resize handling
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }, 200);
});
