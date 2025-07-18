// Módulo: Animações e Efeitos
const AnimationsModule = (() => {
    
    // Função para animações no scroll
    const setupScrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animar elementos filhos com delay
                    const children = entry.target.querySelectorAll('.skill, .project-card, .form-group');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('visible');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        // Observar seções e elementos específicos
        const elementsToObserve = document.querySelectorAll('section, .skill, .project-card, .about');
        elementsToObserve.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    };

    // Animações de texto digitando
    const typewriterEffect = (element, text, speed = 50) => {
        if (!element) return;
        
        element.textContent = '';
        let i = 0;
        
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                element.classList.remove('typewriter');
            }
        }, speed);
    };

    // Animação de números contadores
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    };

    // Efeitos de partículas para botões
    const addButtonEffects = () => {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Criar efeito de ondulação
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.width = '0';
                ripple.style.height = '0';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.3)';
                ripple.style.transform = 'translate(-50%, -50%)';
                ripple.style.pointerEvents = 'none';
                ripple.style.zIndex = '1';
                
                this.appendChild(ripple);
                
                // Animar a ondulação
                const animation = ripple.animate([
                    { width: '0px', height: '0px', opacity: 1 },
                    { width: '300px', height: '300px', opacity: 0 }
                ], {
                    duration: 600,
                    easing: 'ease-out'
                });
                
                animation.onfinish = () => {
                    ripple.remove();
                };
            });
        });
    };

    // Animação de flutuação para elementos
    const addFloatingEffect = (selector, intensity = 10, speed = 3000) => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((element, index) => {
            const delay = index * 200;
            
            setTimeout(() => {
                element.style.animation = `float ${speed}ms ease-in-out infinite`;
                element.style.animationDelay = `${delay}ms`;
            }, delay);
        });
    };

    // Efeito de paralaxe simples
    const setupParallax = () => {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.3;
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    };

    // Animação de loading
    const showLoading = () => {
        const loader = document.createElement('div');
        loader.id = 'loading-screen';
        loader.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p>Carregando experiência cósmica...</p>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(loader);
        
        // Remover loading após 2 segundos
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 2000);
    };

    // Animação de pulso para elementos destacados
    const addPulseEffect = (selector) => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animation = 'pulse 1s infinite';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.animation = '';
            });
        });
    };

    // Efeito de glitch para texto
    const addGlitchEffect = (element, duration = 2000) => {
        if (!element) return;
        
        const text = element.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        
        const glitch = setInterval(() => {
            element.textContent = text
                .split('')
                .map((char, index) => {
                    if (Math.random() < 0.1) {
                        return chars[Math.floor(Math.random() * chars.length)];
                    }
                    return char;
                })
                .join('');
            
            setTimeout(() => {
                element.textContent = text;
            }, 100);
        }, 500);
        
        setTimeout(() => {
            clearInterval(glitch);
            element.textContent = text;
        }, duration);
    };

    // Animação de entrada escalonada
    const staggeredAnimation = (selector, delay = 100) => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * delay);
        });
    };

    // Função para inicializar todas as animações
    const initAnimations = () => {
        setupScrollAnimations();
        addButtonEffects();
        addFloatingEffect('.skill', 5, 4000);
        addPulseEffect('.social-links a');
        staggeredAnimation('.project-card', 200);
        
        // Verificar se há elementos específicos para animar
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            setTimeout(() => {
                addGlitchEffect(heroTitle, 1000);
            }, 1000);
        }
        
        // Animar contadores se existirem
        const counters = document.querySelectorAll('.counter');
        if (counters.length > 0) {
            setTimeout(animateCounters, 1000);
        }
    };

    // Função para performance - pausar animações quando a aba não está visível
    const setupPerformanceOptimizations = () => {
        document.addEventListener('visibilitychange', () => {
            const animatedElements = document.querySelectorAll('[style*="animation"]');
            
            if (document.hidden) {
                animatedElements.forEach(element => {
                    element.style.animationPlayState = 'paused';
                });
            } else {
                animatedElements.forEach(element => {
                    element.style.animationPlayState = 'running';
                });
            }
        });
    };

    return {
        init: () => {
            initAnimations();
            setupPerformanceOptimizations();
        },
        typewriter: typewriterEffect,
        glitch: addGlitchEffect,
        staggered: staggeredAnimation,
        showLoading: showLoading,
        pulse: addPulseEffect,
        floating: addFloatingEffect,
        parallax: setupParallax
    };
})();

// Inicialização automática quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', AnimationsModule.init);
} else {
    AnimationsModule.init();
}

// Expor globalmente para controle
window.AnimationsModule = AnimationsModule;
