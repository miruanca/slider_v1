const doc = document;

        doc.addEventListener("DOMContentLoaded", () =>{
            const next = doc.querySelector('.next');
            const prev = doc.querySelector('.prev');
            let intervaloId;

            function moverSliderAdelante() {
                let list = doc.querySelectorAll('.item');
                doc.querySelector('.slide').appendChild(list[0]);
            }

            function moverSliderAtras(){
                let list = doc.querySelectorAll('.item');
                doc.querySelector('.slide').prepend(list[list.length - 1]);
            }

            function startAutoplay() {
                intervaloId = setInterval(() => {
                    moverSliderAdelante();
                }, 4000);
            }

            function stopAutoplay() {
                clearInterval(intervaloId);
            }

            next.addEventListener('click', () => {
                moverSliderAdelante();
            });

            prev.addEventListener('click', () => {
                moverSliderAtras();
            });

            startAutoplay();

            fetch('assets/src/json/productos.json')
                .then(response => response.json())
                .then(data => {
                    const articles = data.articulos;
                    const slide = doc.querySelector('.slide');

                    articles.forEach(articulo => {
                        const article = doc.createElement('article');
                        article.classList.add('item');
                        article.style.backgroundImage = `url(${articulo.imagen})`;

                        const content = doc.createElement('section');
                        content.classList.add('content');

                        const h2 = doc.createElement('h2');
                        h2.classList.add('animeName');
                        h2.textContent = articulo.nombre;

                        const p = doc.createElement('p');
                        p.classList.add('animeDescription');
                        p.textContent = articulo.descripcion;

                        const button = doc.createElement('button');
                        button.classList.add('btn');
                        button.textContent = 'Saber más';

                        content.appendChild(h2);
                        content.appendChild(p);
                        content.appendChild(button);

                        article.appendChild(content);
                        slide.appendChild(article);
                    });
                })
                .catch(error => console.error(error));
        });