document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Gestión del menú hamburguesa
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('fa-bars');
            menuToggle.classList.toggle('fa-times');
        });
    }

    // Seleccionar todos los enlaces del menú
    const menuLinks = document.querySelectorAll('.nav-link');
    
    // Añadir evento click a cada enlace
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cerrar menú móvil si está abierto
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('fa-times');
                menuToggle.classList.add('fa-bars');
            }
            
            // Obtener el destino del enlace
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Calcular la posición de desplazamiento
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            // Realizar el desplazamiento suave
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Cerrar menú al hacer scroll
    window.addEventListener('scroll', () => {
        if(navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('fa-times');
            menuToggle.classList.add('fa-bars');
        }
    });

    // Cerrar menú al redimensionar la ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('fa-times');
            menuToggle.classList.add('fa-bars');
        }
    });

    // Resaltar sección activa durante el scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scroll = window.scrollY;
            
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scroll >= sectionTop && scroll < sectionBottom) {
                correspondingLink?.classList.add('active');
            } else {
                correspondingLink?.classList.remove('active');
            }
        });
    });

    // Efecto de transparencia en el menú al hacer scroll
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.scrollY;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        } else {
            // Scrolling up
            navbar.style.backgroundColor = '#000000';
        }
        
        lastScroll = currentScroll;
    });

    // Prevenir el comportamiento por defecto del menú hamburguesa
    if (menuToggle) {
        menuToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
        });
    }
});
