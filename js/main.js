// main.js
// Módulo: Navegação e Funcionalidades Principais
const NavigationModule = (() => {
    const setupMenu = () => {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (!menuToggle || !navMenu) return;
        
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animar ícone do menu
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Fechar menu ao clicar em links
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
        
        // Fechar menu ao clicar fora dele
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    };

    const setupScrollAnimations = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('section, .skill, .project-card').forEach(el => {
            observer.observe(el);
        });
    };

    const smoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    const setupHeaderScroll = () => {
        const header = document.querySelector('header');
        if (!header) return;
        
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.style.background = 'rgba(15, 12, 41, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(15, 12, 41, 0.7)';
                header.style.backdropFilter = 'blur(10px)';
            }
            
            // Esconder/mostrar header baseado na direção do scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    };

    return {
        init: () => {
            setupMenu();
            setupScrollAnimations();
            smoothScroll();
            setupHeaderScroll();
        }
    };
})();

// Módulo: Formulário de Contato
const ContactModule = (() => {
    const setupForm = () => {
        const form = document.querySelector('.contact-form form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validação básica
            if (!name || !email || !message) {
                showNotification('Por favor, preencha todos os campos!', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, insira um email válido!', 'error');
                return;
            }
            
            // Simular envio (aqui você conectaria com seu backend)
            showNotification('Mensagem enviada com sucesso!', 'success');
            form.reset();
        });
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const showNotification = (message, type) => {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            ${type === 'success' ? 'background: linear-gradient(45deg, #00e676, #00c853);' : 'background: linear-gradient(45deg, #ff5252, #f44336);'}
        `;
        
        document.body.appendChild(notification);
        
        // Mostrar notificação
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remover notificação após 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    };

    return {
        init: setupForm
    };
})();

// Módulo: Utilities
const UtilitiesModule = (() => {
    const detectDevice = () => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(navigator.userAgent);
        
        document.body.classList.add(isMobile ? 'mobile' : 'desktop');
        if (isTablet) document.body.classList.add('tablet');
        
        return { isMobile, isTablet };
    };

    const setupPerformanceOptimizations = () => {
        // Lazy loading para imagens
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        // Reduzir animações em dispositivos de baixa performance
        if (navigator.hardwareConcurrency < 4) {
            document.body.classList.add('low-performance');
        }
    };

    const setupAccessibility = () => {
        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Controle de animações para usuários com vestibular disorders
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }
    };

    const setupErrorHandling = () => {
        window.addEventListener('error', (e) => {
            console.error('Erro capturado:', e.error);
            
            // Aqui você poderia enviar o erro para um serviço de monitoramento
            // sendErrorToService(e.error);
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Promise rejeitada:', e.reason);
            
            // Aqui você poderia enviar o erro para um serviço de monitoramento
            // sendErrorToService(e.reason);
        });
    };

    return {
        init: () => {
            detectDevice();
            setupPerformanceOptimizations();
            setupAccessibility();
            setupErrorHandling();
        },
        detectDevice,
        setupPerformanceOptimizations,
        setupAccessibility
    };
})();

// Módulo: Tema e Personalização
const ThemeModule = (() => {
    const setupThemeToggle = () => {
        // Detectar preferência de tema do sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Aplicar tema baseado na preferência
        if (prefersDark) {
            document.body.classList.add('dark-theme');
        }
        
        // Listener para mudanças na preferência do sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        });
    };

    const setupCustomCursor = () => {
        // Já implementado no mouseTrail.js
        // Aqui poderíamos adicionar mais personalizações
    };

    return {
        init: () => {
            setupThemeToggle();
            setupCustomCursor();
        }
    };
})();

// Inicialização principal
const App = (() => {
    const init = () => {
        // Inicializar módulos na ordem correta
        UtilitiesModule.init();
        ThemeModule.init();
        NavigationModule.init();
        ContactModule.init();
        
        // Adicionar classe para indicar que o app foi inicializado
        document.body.classList.add('app-initialized');
        
        // Log para debug
        console.log('🚀 CosmicDev Portfolio initialized successfully!');
    };

    return {
        init,
        modules: {
            Navigation: NavigationModule,
            Contact: ContactModule,
            Utilities: UtilitiesModule,
            Theme: ThemeModule
        }
    };
})();

// Inicialização quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', App.init);
} else {
    App.init();
}

// Expor globalmente para debug e controle
window.CosmicApp = App;
