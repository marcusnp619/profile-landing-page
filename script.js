// Terminal Commands Database
const commandsData = {
    help: [
        'Available commands:',
        '  help       - Display this help message',
        '  scope      - Scope definition from security book',
        '  report     - Report writing tips and best practices',
        '  tools      - Full toolkit list with descriptions',
        '  platforms  - All bounty platforms and links',
        '  clear      - Clear terminal output',
        '  hack       - Start auto-play hacking simulation'
    ],
    scope: [
        'SCOPE DEFINITION:',
        '',
        'Scope defines the authorized boundaries of security testing:',
        '  • In-Scope: Systems explicitly authorized for testing',
        '  • Out-of-Scope: Systems prohibited from testing',
        '  • Gray-Zone: Systems requiring clarification',
        '',
        'Always verify scope before initiating testing.',
        'Document all authorizations in writing.'
    ],
    report: [
        'REPORT WRITING BEST PRACTICES:',
        '',
        'Executive Summary:',
        '  • Concise overview of findings and impact',
        '  • Risk levels and recommendations',
        '',
        'Technical Details:',
        '  • Vulnerability description and location',
        '  • Step-by-step reproduction steps',
        '  • Impact assessment and CVSS scoring',
        '',
        'Remediation:',
        '  • Clear, actionable recommendations',
        '  • Priority levels for fixes',
        '  • Timeline for resolution'
    ],
    tools: [
        'FULL TOOLKIT:',
        '',
        'Core Tools:',
        '  • Kali Linux - Penetration testing OS',
        '  • Burp Suite - Web application testing',
        '  • Nmap - Network reconnaissance',
        '',
        'Additional Tools:',
        '  • Wireshark - Network packet analysis',
        '  • Metasploit - Exploitation framework',
        '  • SQLMap - SQL injection testing',
        '  • John the Ripper - Password cracking'
    ],
    platforms: [
        'BOUNTY PLATFORMS:',
        '',
        'Major Platforms:',
        '  • HackerOne - https://www.hackerone.com/',
        '  • Bugcrowd - https://www.bugcrowd.com/',
        '  • Intigriti - https://www.intigriti.com/',
        '  • Immunefi - https://immunefi.com/',
        '',
        'Regional Platforms:',
        '  • YesWeHack - https://yeswehack.com/',
        '  • Federacy - https://www.federacy.com/',
        '  • Synack - https://www.synack.com/',
        '  • Zerocopter - https://www.zerocopter.com/'
    ]
};

// Auto-play hacking session
const autoPlaySequence = [
    { command: 'whoami', delay: 500 },
    { output: 'security_researcher', delay: 800 },
    { command: 'nmap -sV target.com', delay: 1000 },
    { output: 'Starting Nmap 7.94 ( https://nmap.org )', delay: 500 },
    { output: 'Nmap scan report for target.com', delay: 300 },
    { output: 'PORT    STATE SERVICE', delay: 200 },
    { output: '80/tcp  open  http', delay: 200 },
    { output: '443/tcp open  https', delay: 200 },
    { command: 'burpsuite --scan', delay: 1000 },
    { output: '[*] Starting security scan...', delay: 500 },
    { output: '[+] XSS vulnerability found: /search?q=', delay: 300 },
    { output: '[+] SQL injection found: /product?id=', delay: 300 },
    { output: '[!] Scan complete. 2 vulnerabilities detected.', delay: 500 }
];

class TerminalEmulator {
    constructor() {
        this.output = document.getElementById('terminal-output');
        this.input = document.getElementById('terminal-input');
        this.isAutoPlaying = false;
        this.commandHistory = [];
        this.historyIndex = -1;
        this.initializeTerminal();
    }

    initializeTerminal() {
        this.addLine('Welcome to Hacker Terminal v2.0');
        this.addLine('Type "help" for available commands');
        this.addLine('');
        this.input.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    addLine(text, className = 'terminal-line') {
        const line = document.createElement('div');
        line.className = className;
        line.textContent = text;
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }

    handleKeydown(e) {
        if (e.key === 'Enter') {
            const command = this.input.value.trim().toLowerCase();
            if (command) {
                this.addLine(`$ ${command}`);
                this.executeCommand(command);
                this.commandHistory.push(command);
                this.historyIndex = -1;
                this.input.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.commandHistory.length > 0) {
                this.historyIndex = Math.min(this.historyIndex + 1, this.commandHistory.length - 1);
                this.input.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
            } else {
                this.historyIndex = -1;
                this.input.value = '';
            }
        }
    }

    executeCommand(command) {
        if (commandsData[command]) {
            commandsData[command].forEach((line, index) => {
                setTimeout(() => this.addLine(line), index * 50);
            });
        } else if (command === 'clear') {
            this.output.innerHTML = '';
        } else if (command === 'hack') {
            this.startAutoPlay();
        } else {
            this.addLine(`Command not found: ${command}. Type "help" for available commands.`);
        }
    }

    startAutoPlay() {
        if (this.isAutoPlaying) return;
        this.isAutoPlaying = true;
        this.addLine('Starting auto-play hacking session...');
        this.addLine('');
        let cumulativeDelay = 1000;

        autoPlaySequence.forEach((item) => {
            cumulativeDelay += item.delay;
            setTimeout(() => {
                if (item.command) {
                    this.typeCommand(item.command);
                } else if (item.output) {
                    this.addLine(item.output);
                }
            }, cumulativeDelay);
        });

        setTimeout(() => {
            this.addLine('');
            this.addLine('Session complete! Type commands below to continue.');
            this.isAutoPlaying = false;
            this.input.focus();
        }, cumulativeDelay + 500);
    }

    typeCommand(command) {
        this.addLine(`$ ${command}`);
    }
}

// Initialize Terminal
const terminal = new TerminalEmulator();

// Auto-start the hacking session on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        terminal.startAutoPlay();
    }, 1500);
});

// Trigger visualizer animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.bar-item').forEach((item) => {
                item.style.opacity = '1';
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const visualizer = document.getElementById('visualizer');
if (visualizer) {
    observer.observe(visualizer);
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Platform badge click animation
document.querySelectorAll('.platform-badge').forEach((badge) => {
    badge.addEventListener('click', function (e) {
        if (e.ctrlKey || e.metaKey) return; // Allow normal link behavior
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});