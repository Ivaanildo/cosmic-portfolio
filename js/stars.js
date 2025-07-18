// Módulo: Estrelas e Nebulosas
const StarsModule = (() => {
    const createStars = () => {
        const spaceBackground = document.getElementById('spaceBackground');
        if (!spaceBackground) return;
        
        const starCount = 200;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Configurações aleatórias
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.width = `${Math.random() * 3}px`;
            star.style.height = star.style.width;
            star.style.opacity = Math.random() * 0.8 + 0.2;
            star.style.setProperty('--duration', `${Math.random() * 5 + 3}s`);
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            spaceBackground.appendChild(star);
        }
        
        // Criar nebulosas
        for (let i = 0; i < 3; i++) {
            const nebula = document.createElement('div');
            nebula.classList.add('nebula');
            
            nebula.style.left = `${Math.random() * 100}%`;
            nebula.style.top = `${Math.random() * 100}%`;
            nebula.style.width = `${Math.random() * 300 + 100}px`;
            nebula.style.height = nebula.style.width;
            nebula.style.background = `hsla(${Math.random() * 360}, 100%, 50%, 0.2)`;
            
            spaceBackground.appendChild(nebula);
        }
    };

    const createShootingStars = () => {
        const spaceBackground = document.getElementById('spaceBackground');
        if (!spaceBackground) return;
        
        const createSingleShootingStar = () => {
            const shootingStar = document.createElement('div');
            shootingStar.classList.add('shooting-star');
            
            shootingStar.style.left = `${Math.random() * 100}%`;
            shootingStar.style.top = `${Math.random() * 100}%`;
            shootingStar.style.width = `${Math.random() * 100 + 50}px`;
            shootingStar.style.animationDuration = `${Math.random() * 3 + 1}s`;
            
            spaceBackground.appendChild(shootingStar);
            
            setTimeout(() => {
                if (shootingStar.parentNode) {
                    shootingStar.remove();
                }
            }, parseFloat(shootingStar.style.animationDuration) * 1000);
        };

        // Criar estrelas cadentes em intervalos aleatórios
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% de chance
                createSingleShootingStar();
            }
        }, 2000);
    };

    const addInteractiveStars = () => {
        const spaceBackground = document.getElementById('spaceBackground');
        if (!spaceBackground) return;

        spaceBackground.addEventListener('click', (e) => {
            // Criar explosion de estrelas no clique
            const rect = spaceBackground.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            for (let i = 0; i < 10; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                star.style.left = `${x}%`;
                star.style.top = `${y}%`;
                star.style.width = '3px';
                star.style.height = '3px';
                star.style.opacity = '1';
                star.style.background = '#00e5ff';
                star.style.boxShadow = '0 0 10px #00e5ff';

                const angle = (Math.PI * 2 * i) / 10;
                const distance = Math.random() * 100 + 50;
                const endX = x + Math.cos(angle) * (distance / 10);
                const endY = y + Math.sin(angle) * (distance / 10);

                const animation = star.animate([
                    { 
                        transform: 'translate(0, 0) scale(1)', 
                        opacity: 1 
                    },
                    { 
                        transform: `translate(${endX - x}vw, ${endY - y}vh) scale(0.2)`, 
                        opacity: 0 
                    }
                ], {
                    duration: 1000,
                    easing: 'ease-out'
                });

                animation.onfinish = () => {
                    if (star.parentNode) {
                        star.remove();
                    }
                };

                spaceBackground.appendChild(star);
            }
        });
    };

    return {
        init: () => {
            createStars();
            createShootingStars();
            addInteractiveStars();
        }
    };
})();

// Inicialização automática quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', StarsModule.init);
} else {
    StarsModule.init();
}
