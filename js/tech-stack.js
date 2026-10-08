/* =============================================
   tech-stack.js
   Tech stack data and rendering.
   Waits for "sectionsLoaded" before rendering.
   ============================================= */

// ---------------------------------------------
// 1. DATA
// Each category contains technology names and Devicon class names.
// ---------------------------------------------
const TECH_STACK = {
    Languages: [
        { name: 'C', icon: 'devicon-c-plain' },
        { name: 'C#', icon: 'devicon-csharp-plain' },
        { name: 'COBOL', icon: 'devicon-cobol-plain' },
        { name: 'Python', icon: 'devicon-python-plain' },
        { name: 'Java', icon: 'devicon-java-plain' },
        { name: 'JavaScript', icon: 'devicon-javascript-plain' },
        { name: 'PHP', icon: 'devicon-php-plain' },
        { name: 'Visual Basic', icon: 'devicon-visualbasic-plain' },
    ],

    Frontend: [
        { name: 'HTML5', icon: 'devicon-html5-plain' },
        { name: 'CSS3', icon: 'devicon-css3-plain' },
        { name: 'Bootstrap', icon: 'devicon-bootstrap-plain' },
        { name: 'React', icon: 'devicon-react-original' },
        { name: 'Vue', icon: 'devicon-vuejs-plain' },
        { name: 'Blade', icon: 'devicon-laravel-plain' }
    ],

    Backend: [
        { name: 'Flask', icon: 'devicon-flask-original' },
        { name: 'Spring Boot', icon: 'devicon-spring-original' },
        { name: 'Laravel', icon: 'devicon-laravel-original' },
        { name: 'ASP.NET', icon: 'devicon-dotnetcore-plain' },
        { name: 'Tkinter', icon: 'devicon-python-plain' },
        { name: 'REST API', mark: 'API', tone: 'api' }
    ],

    Databases: [
        { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
        { name: 'MySQL', icon: 'devicon-mysql-plain' },
        { name: 'SQL', icon: 'devicon-microsoftsqlserver-plain' },
        { name: 'Microsoft Access', mark: 'A', tone: 'access' }
    ],

    Networking: [
        { name: 'Cisco Packet Tracer', mark: 'network', tone: 'cisco' },
        { name: 'LAN Setup', mark: 'LAN', tone: 'lan' },
        { name: 'IP Addressing', mark: 'IP', tone: 'ip' }
    ],

    Tools: [
        { name: 'Git', icon: 'devicon-git-plain' },
        { name: 'Postman', icon: 'devicon-postman-plain' },
        { name: 'Swagger', icon: 'devicon-swagger-plain' },
        { name: 'Thunder Client', mark: 'bolt', tone: 'thunder' },
        { name: 'Vercel', icon: 'devicon-vercel-original' },
        { name: 'Figma', icon: 'devicon-figma-plain' },
        { name: 'Spring Initializr', icon: 'devicon-spring-original' },
        { name: 'JDK', icon: 'devicon-openjdk-plain' },
        { name: 'Maven', icon: 'devicon-maven-plain' },
        { name: 'Node.js', icon: 'devicon-nodejs-plain' }
    ]
};

// ---------------------------------------------
// 2. RENDER
// Wait until loader.js has added the tech stack container to the page.
// ---------------------------------------------
document.addEventListener('sectionsLoaded', () => {
    const container = document.getElementById('techCategories');
    if (!container) return;

    // Build a heading and animated logo row for each category.
    Object.entries(TECH_STACK).forEach(([category, items]) => {
        const block = document.createElement('div');
        block.className = 'tech-block';

        // Add the category heading.
        const title = document.createElement('h3');
        title.className = 'tech-category-title';
        title.textContent = category;
        block.appendChild(title);

        const marquee = document.createElement('div');
        marquee.className = 'tech-marquee';
        marquee.setAttribute('aria-label', `${category} technologies`);

        const track = document.createElement('div');
        track.className = 'tech-track';

        const createSet = () => {
            const set = document.createElement('div');
            set.className = 'tech-set';

            items.forEach((item) => {
                const techItem = document.createElement('div');
                techItem.className = `tech-item${item.tone ? ` tech-item-${item.tone}` : ''}`;

                const icon = document.createElement(item.icon ? 'i' : 'span');
                icon.className = item.icon
                    ? `${item.icon} colored`
                    : `tech-mark tech-mark-${item.tone}`;
                icon.setAttribute('aria-hidden', 'true');
                if (item.mark === 'bolt') {
                    const bolt = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    bolt.setAttribute('viewBox', '0 0 24 24');
                    bolt.setAttribute('focusable', 'false');
                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('d', 'M13.2 1.5 4.5 13h6l-.8 9.5L19.5 10h-6l-.3-8.5Z');
                    path.setAttribute('fill', 'currentColor');
                    bolt.appendChild(path);
                    icon.appendChild(bolt);
                } else if (item.mark === 'network') {
                    const network = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    network.setAttribute('viewBox', '0 0 32 32');
                    network.setAttribute('focusable', 'false');
                    network.setAttribute('aria-hidden', 'true');

                    const lines = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    lines.setAttribute('d', 'M16 9v6M7 23l9-8 9 8M7 23h18');
                    lines.setAttribute('fill', 'none');
                    lines.setAttribute('stroke', 'currentColor');
                    lines.setAttribute('stroke-width', '2');
                    lines.setAttribute('stroke-linecap', 'round');
                    lines.setAttribute('stroke-linejoin', 'round');
                    network.appendChild(lines);

                    [[16, 7], [6, 25], [26, 25], [16, 15]].forEach(([cx, cy]) => {
                        const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                        node.setAttribute('cx', String(cx));
                        node.setAttribute('cy', String(cy));
                        node.setAttribute('r', '3');
                        node.setAttribute('fill', 'currentColor');
                        network.appendChild(node);
                    });
                    icon.appendChild(network);
                } else if (item.mark) {
                    icon.textContent = item.mark;
                }

                const label = document.createElement('span');
                label.textContent = item.name;

                techItem.append(icon, label);
                set.appendChild(techItem);
            });

            return set;
        };

        track.appendChild(createSet());
        const duplicateSet = createSet();
        duplicateSet.setAttribute('aria-hidden', 'true');
        track.appendChild(duplicateSet);
        marquee.appendChild(track);
        block.appendChild(marquee);
        container.appendChild(block);
    });
});