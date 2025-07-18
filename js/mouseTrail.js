// Módulo: Rastro do Mouse
const MouseTrailModule = (() => {
    let isTrailActive = true;
    let mouseX = 0;
    let mouseY = 0;
    let trailElements = [];
    
    const setupMouseTrail = () => {
        const mouseTrail = document.getElementById('mouseTrail');
        if (!mouseTrail) return;
        
        // Configurar cursor personalizado
        document.body.style.cursor = 'none';
        
        // Adicionar múltiplos elementos de rastro
        for (let i = 0; i < 5; i++) {
            const trail = document.createElement('div');
            trail.classList.add('mouse-trail');
            trail.style.position = 'absolute';
            trail.style.width = `${15 - i * 2}px`;
            trail.style.height = `${15 - i * 2}px`;
            trail.style.borderRadius = '50%';
            trail.style.background = 'var(--neon-blue)';
            trail.style.boxShadow = '0 0 10px var(--neon-blue)';
            trail.style.pointerEvents = 'none';
            trail.style.transform = 'translate(-50%, -50%)';
            trail.style.zIndex = '9999';
            trail.style.opacity = '0';
            trail.style.transition = 'opacity 0.3s ease';
            
            document.body.appendChild(trail);
            trailElements.push(trail);
        }
        
        // Função para atualizar posição do cursor
        const updateCursor = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Atualizar elemento principal do rastro
            mouseTrail.style.left = `${mouseX}px`;
            mouseTrail.style.top = `${mouseY}px`;
            mouseTrail.style.opacity = '0.7';
            
            // Animar elementos do rastro com delay
            trailElements.forEach((trail, index) => {
                setTimeout(() => {
                    trail.style.left = `${mouseX}px`;
                    trail.style.top = `${mouseY}px`;
                    trail.style.opacity = `${0.5 - index * 0.1}`;
                }, index * 50);
            });
        };
        
        // Função para esconder o rastro
        const hideTrail = () => {
            mouseTrail.style.opacity = '0';
            trailElements.forEach(trail => {
                trail.style.opacity = '0';
            });
        };
        
        // Event listeners
        document.addEventListener('mousemove', updateCursor);
        document.addEventListener('mouseleave', hideTrail);
        
        // Criar partículas do rastro
        document.addEventListener('mousemove', (e) => {
            if (!isTrailActive) return;
            
            createTrailParticles(e.clientX, e.clientY);
        });
        
        // Detectar quando o mouse está sobre elementos interativos
        const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, .menu-toggle, .project-card, .skill');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                mouseTrail.style.transform = 'translate(-50%, -50%) scale(1.5)';
                mouseTrail.style.background = 'var(--neon-pink)';
                mouseTrail.style.boxShadow = '0 0 20px var(--neon-pink)';
                document.body.style.cursor = 'pointer';
            });
            
            element.addEventListener('mouseleave', () => {
                mouseTrail.style.transform = 'translate(-50%, -50%) scale(1)';
                mouseTrail.style.background = 'var(--neon-blue)';
                mouseTrail.style.boxShadow = '0 0 10px var(--neon-blue)';
                document.body.style.cursor = 'none';
            });
        });
    };

    const createTrailParticles = (x, y) => {
        const spaceBackground = document.getElementById('spaceBackground');
        if (!spaceBackground) return;
        
        // Criar partículas ocasionalmente
        if (Math.random() < 0.1) { // 10% de chance
            for (let i = 0; i < 2; i++) {
                const particle = document.createElement('div');
                particle.classList.add('star');
                
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                particle.style.width = '3px';
                particle.style.height = '3px';
                particle.style.opacity = '0.8';
                particle.style.background = 'var(--neon-blue)';
                particle.style.boxShadow = '0 0 5px var(--neon-blue)';
                
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 30 + 10;
                const endX = x + Math.cos(angle) * distance;
                const endY = y + Math.sin(angle) * distance;
                
                const animation = particle.animate([
                    { 
                        transform: 'translate(-50%, -50%) scale(1)', 
                        opacity: 0.8 
                    },
                    { 
                        transform: `translate(${endX - x - 1.5}px, ${endY - y - 1.5}px) scale(0.2)`, 
                        opacity: 0 
                    }
                ], {
                    duration: 800,
                    easing: 'ease-out'
                });
                
                animation.onfinish = () => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                };
                
                spaceBackground.appendChild(particle);
            }
        }
    };

    const toggleTrail = () => {
        isTrailActive = !isTrailActive;
        
        if (!isTrailActive) {
            document.body.style.cursor = 'default';
            const mouseTrail = document.getElementById('mouseTrail');
            if (mouseTrail) {
                mouseTrail.style.opacity = '0';
            }
            trailElements.forEach(trail => {
                trail.style.opacity = '0';
            });
        } else {
            document.body.style.cursor = 'none';
            setupMouseTrail();
        }
    };

    const addClickEffects = () => {
        document.addEventListener('click', (e) => {
            const spaceBackground = document.getElementById('spaceBackground');
            if (!spaceBackground) return;

            // Criar efeito de clique
            const clickEffect = document.createElement('div');
            clickEffect.style.position = 'absolute';
            clickEffect.style.left = `${e.clientX}px`;
            clickEffect.style.top = `${e.clientY}px`;
            clickEffect.style.width = '20px';
            clickEffect.style.height = '20px';
            clickEffect.style.borderRadius = '50%';
            clickEffect.style.background = 'transparent';
            clickEffect.style.border = '2px solid var(--neon-pink)';
            clickEffect.style.transform = 'translate(-50%, -50%)';
            clickEffect.style.pointerEvents = 'none';
            clickEffect.style.zIndex = '10000';

            const animation = clickEffect.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(0.5)', 
                    opacity: 1 
                },
                { 
                    transform: 'translate(-50%, -50%) scale(2)', 
                    opacity: 0 
                }
            ], {
                duration: 400,
                easing: 'ease-out'
            });

            animation.onfinish = () => {
                if (clickEffect.parentNode) {
                    clickEffect.remove();
                }
            };

            document.body.appendChild(clickEffect);
        });
    };

    // Função para detectar dispositivos móveis
    const isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    return {
        init: () => {
            if (!isMobile()) {
                setupMouseTrail();
                addClickEffects();
            }
        },
        toggle: toggleTrail,
        isActive: () => isTrailActive
    };
})();

// Inicialização automática quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', MouseTrailModule.init);
} else {
    MouseTrailModule.init();
}

// Expor globalmente para controle
window.MouseTrailModule = MouseTrailModule;
