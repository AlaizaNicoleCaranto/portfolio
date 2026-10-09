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

// Keep project references limited to technologies listed on each project card.
const TECH_PROJECTS = {
    C: [
        { id: 'project-pokemon-cli', name: 'Project Pokemon' },
        { id: 'project-cpu-scheduling', name: 'CPU Scheduling Simulator' },
        { id: 'project-programming-projects', name: 'Programming Projects' }
    ],
    'C#': [{ id: 'project-programming-projects', name: 'Programming Projects' }],
    COBOL: [{ id: 'project-programming-projects', name: 'Programming Projects' }],
    Python: [
        { id: 'project-tax-tool', name: 'Tax Computational Tool' },
        { id: 'project-eduroom', name: 'EduRoom' }
    ],
    Java: [{ id: 'project-pokedex', name: 'Generation 1 Pokedex' }],
    JavaScript: [
        { id: 'project-tax-tool', name: 'Tax Computational Tool' },
        { id: 'project-mochiverse', name: 'MochiVerse' }
    ],
    HTML5: [
        { id: 'project-tax-tool', name: 'Tax Computational Tool' },
        { id: 'project-eduroom', name: 'EduRoom' },
        { id: 'project-mochiverse', name: 'MochiVerse' }
    ],
    CSS3: [
        { id: 'project-tax-tool', name: 'Tax Computational Tool' },
        { id: 'project-eduroom', name: 'EduRoom' },
        { id: 'project-mochiverse', name: 'MochiVerse' }
    ],
    Bootstrap: [{ id: 'project-mochiverse', name: 'MochiVerse' }],
    React: [{ id: 'project-pokedex', name: 'Generation 1 Pokedex' }],
    Vite: [{ id: 'project-pokedex', name: 'Generation 1 Pokedex' }],
    'Tailwind CSS': [{ id: 'project-pokedex', name: 'Generation 1 Pokedex' }],
    Flask: [
        { id: 'project-tax-tool', name: 'Tax Computational Tool' },
        { id: 'project-eduroom', name: 'EduRoom' }
    ],
    'Spring Boot': [{ id: 'project-pokedex', name: 'Generation 1 Pokedex' }],
    PostgreSQL: [{ id: 'project-tax-tool', name: 'Tax Computational Tool' }],
    MySQL: [{ id: 'project-pokedex', name: 'Generation 1 Pokedex' }],
    Figma: [{ id: 'project-it-alliance-hub', name: 'IT Alliance Hub' }]
};

const TECH_DESCRIPTIONS = {
    C: 'A general-purpose language used for low-level and procedural programming.',
    'C#': 'A general-purpose language commonly used with the .NET platform.',
    COBOL: 'A language traditionally used for business and data-processing applications.',
    Python: 'A general-purpose language used for scripting, web applications, and automation.',
    Java: 'A general-purpose language used to build applications across different platforms.',
    JavaScript: 'A language that adds behavior and interactivity to web pages.',
    PHP: 'A server-side language commonly used to build dynamic websites and web applications.',
    'Visual Basic': 'A Microsoft programming language used to build Windows and .NET applications.',
    HTML5: 'Markup used to structure content on the web.',
    CSS3: 'Style rules used to control the appearance and layout of web pages.',
    Bootstrap: 'A front-end toolkit with responsive layout and interface components.',
    React: 'A JavaScript library for building component-based user interfaces.',
    Vue: 'A JavaScript framework for building interactive user interfaces.',
    Blade: 'Laravel’s templating engine for composing server-rendered views.',
    Flask: 'A lightweight Python framework for building web applications.',
    'Spring Boot': 'A Java framework for creating standalone, production-ready applications.',
    Laravel: 'A PHP framework for building web applications.',
    'ASP.NET': 'Microsoft’s framework for building web applications and services with .NET.',
    Tkinter: 'Python’s standard toolkit for building desktop graphical interfaces.',
    'REST API': 'A web API style that exposes resources through HTTP requests.',
    PostgreSQL: 'An open-source relational database system.',
    MySQL: 'A relational database system used to store and query application data.',
    SQL: 'A language for defining, querying, and managing relational data.',
    'Microsoft Access': 'A desktop database tool for organizing data and building database applications.',
    'Cisco Packet Tracer': 'A network simulation tool for practicing network design and configuration.',
    'LAN Setup': 'Connecting and configuring devices within a local area network.',
    'IP Addressing': 'Assigning and managing network addresses so devices can communicate.',
    Git: 'A version control system for tracking changes in source code.',
    Postman: 'A tool for sending requests to and testing web APIs.',
    Swagger: 'Tools and specifications for describing and exploring HTTP APIs.',
    'Thunder Client': 'A VS Code extension for sending and testing API requests.',
    Vercel: 'A cloud platform for deploying web applications.',
    Figma: 'A collaborative design tool for creating interface mockups and prototypes.',
    'Spring Initializr': 'A project generator for bootstrapping Spring applications.',
    JDK: 'The Java Development Kit for compiling and developing Java applications.',
    Maven: 'A build and dependency-management tool for Java projects.',
    'Node.js': 'A JavaScript runtime commonly used for server-side tools and applications.'
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
        title.id = `${category.toLowerCase()}TechTitle`;
        title.textContent = category;
        block.appendChild(title);

        const marquee = document.createElement('div');
        marquee.className = 'tech-marquee';
        marquee.setAttribute('role', 'group');
        marquee.setAttribute('aria-labelledby', title.id);

        const track = document.createElement('div');
        track.className = 'tech-track';

        const createSet = (isKeyboardAccessible) => {
            const set = document.createElement('div');
            set.className = 'tech-set';

            items.forEach((item) => {
                const techItem = document.createElement(isKeyboardAccessible ? 'button' : 'div');
                techItem.className = `tech-item${item.tone ? ` tech-item-${item.tone}` : ''}`;
                techItem.setAttribute('aria-pressed', 'false');
                if (isKeyboardAccessible) {
                    techItem.type = 'button';
                    techItem.setAttribute('aria-label', `Explore ${item.name}`);
                }
                techItem.dataset.techName = item.name;
                techItem.dataset.techCategory = category;

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

        track.appendChild(createSet(true));
        const duplicateSet = createSet(false);
        // Keep the visual duplicate clickable, but out of keyboard and screen-reader navigation.
        duplicateSet.setAttribute('aria-hidden', 'true');
        track.appendChild(duplicateSet);
        marquee.appendChild(track);
        block.appendChild(marquee);

        // Reveal one technology at a time beneath its category's moving cards.
        const explorer = document.createElement('div');
        explorer.className = 'tech-explorer';
        explorer.id = `${category.toLowerCase()}TechExplorer`;
        explorer.hidden = true;
        explorer.setAttribute('aria-live', 'polite');
        explorer.setAttribute('aria-atomic', 'true');
        block.appendChild(explorer);

        container.appendChild(block);

        block.querySelectorAll('.tech-item[data-tech-name]').forEach((techItem) => {
            techItem.setAttribute('aria-controls', explorer.id);
            techItem.addEventListener('click', () => {
                const selectedButton = [...block.querySelectorAll('.tech-item[data-tech-name]')]
                    .find((itemButton) => itemButton.getAttribute('aria-pressed') === 'true');
                const wasSelected = selectedButton?.dataset.techName === techItem.dataset.techName;

                block.querySelectorAll('.tech-item[data-tech-name]').forEach((itemButton) => {
                    itemButton.setAttribute(
                        'aria-pressed',
                        String(itemButton.dataset.techName === techItem.dataset.techName && !wasSelected)
                    );
                });

                if (wasSelected) {
                    block.classList.remove('is-exploring');
                    explorer.hidden = true;
                    explorer.replaceChildren();
                    return;
                }

                block.classList.add('is-exploring');
                renderTechnologyDetails(explorer, techItem.dataset.techName, category);
                explorer.hidden = false;
            });
        });
    });
});

/* Build the selected technology details with DOM APIs so labels remain plain text. */
function renderTechnologyDetails(container, name, category) {
    const heading = document.createElement('h4');
    heading.className = 'tech-explorer-name';
    heading.textContent = name;

    const categoryLabel = document.createElement('span');
    categoryLabel.className = 'tech-explorer-category';
    categoryLabel.textContent = category;

    const description = document.createElement('p');
    description.className = 'tech-explorer-description';
    description.textContent = TECH_DESCRIPTIONS[name]
        || `${category} technology in my growing toolkit.`;

    const projectsHeading = document.createElement('h5');
    projectsHeading.className = 'tech-explorer-projects-title';
    projectsHeading.textContent = 'Related projects';

    const projects = document.createElement('ul');
    projects.className = 'tech-explorer-projects';

    const relatedProjects = TECH_PROJECTS[name] || [];
    if (relatedProjects.length) {
        relatedProjects.forEach((project) => {
            const item = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${project.id}`;
            link.textContent = project.name;
            item.appendChild(link);
            projects.appendChild(item);
        });
    } else {
        const item = document.createElement('li');
        item.className = 'tech-explorer-no-project';
        item.textContent = 'Not currently listed on a featured project card.';
        projects.appendChild(item);
    }

    container.replaceChildren(categoryLabel, heading, description, projectsHeading, projects);
}