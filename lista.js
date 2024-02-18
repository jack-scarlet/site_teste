const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY1YWZhZjZlOGRhY2M2YTJjY2ViOTgzYzZkZWZjODQzOTFiZTFlNWMwZjQxNDZhZDU4OGZjYzg3Yzk3NzcyMTc2OTNlOWJiNmM0M2UzMGRkIn0.eyJhdWQiOiI2NmFlOWIzYTU5YTUzNWIwMzMxNWVmNjIxMDNiNmU2ZiIsImp0aSI6IjY1YWZhZjZlOGRhY2M2YTJjY2ViOTgzYzZkZWZjODQzOTFiZTFlNWMwZjQxNDZhZDU4OGZjYzg3Yzk3NzcyMTc2OTNlOWJiNmM0M2UzMGRkIiwiaWF0IjoxNzA3NzAxOTQyLCJuYmYiOjE3MDc3MDE5NDIsImV4cCI6MTcxMDIwMzk0MSwic3ViIjoiNTA5MTIyNCIsInNjb3BlcyI6W119.YcKsgZsyxkgytP6xE7MOe3wSVKf_yGaeCGohk6H1ahBdg1EXBGqQfDFx4zZ8-FHGc072iiEqWNihUz13xlwtzJp_6S0u6z-DCsICQzwuwi7_llCNAhooXufS6PTlLcLRWIZhK1oZT9vaS8H5sN712DtRQeBkgVrm43hL1SAuZkMez3VZNMg02-a5UYXv2wg9eQ0XaoLaNyKDbzIv5kSn21BLHkq8bYqQJbe_u2NE2ac_89RCRm_o7YvVdqDR4HRD0qJ7TRD6KEdTfP1Fhxv6mqBxJWH5kPpbfZ93nmV3eRsg0O3navZF3kUOAl2LpoLMDkWoMJyryYvBhHVNGxQK-Q';

// Função para carregar a lista de anime-----------------------------------------------------------------------
function loadAnimeList() {
	const apiUrl = 'https://cors-anywhere.herokuapp.com/https://api.myanimelist.net/v2/users/Anitsu_Animes/animelist?fields=list_status&status=watching&limit=200';
    document.addEventListener('DOMContentLoaded', function () {
        const animeGrid = document.getElementById('animeGrid');


        function fetchAnimeList(offset) {
            fetch(`${apiUrl}&offset=${offset}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                    'Origin': window.location.origin,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => response.json())
            .then(data => {
                // Adiciona os animes ao grid
                addAnimeToGrid(data.data);

                // Salva os dados localmente
                saveToFile(data);

                if (data.paging && data.paging.next) {
                    const nextOffset = offset + 1000;
                    fetchAnimeList(nextOffset);
                }
            })
            .catch(error => {
                console.error('Erro ao obter a lista de anime:', error.message);

                // Tenta carregar os dados salvos localmente em caso de erro na API
                
            });
        }

         function addAnimeToGrid(animeData) {
            animeData.forEach(anime => {
                const animeCard = document.createElement('div');
                animeCard.classList.add('animeCard');
        
                const title = document.createElement('h3');
                title.textContent = anime.node.title;
        
                const imageLink = document.createElement('a');
                imageLink.href = anime.url; // Utiliza o campo "url" do anime
                imageLink.target = "_blank"; // Abre o link em uma nova aba (opcional)
        
                const image = document.createElement('img');
                image.src = anime.node.main_picture.medium;
        
                imageLink.appendChild(image);
        
                animeCard.appendChild(title);
                animeCard.appendChild(imageLink);
        
                const gridContainer = document.getElementById('animeGrid');
                if (gridContainer) {
                    gridContainer.appendChild(animeCard);
                }
            });
        }

        /*function saveToFile(data) {
            const jsonData = JSON.stringify(data);

            // Cria um objeto Blob contendo o JSON
            const blob = new Blob([jsonData], { type: 'application/json' });

            // Cria um elemento de link e configura o Blob como seu conteúdo
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);

            // Define o nome do arquivo para download
            link.download = 'animeListBackup.json';

            // Adiciona o link ao corpo do documento e simula o clique
            document.body.appendChild(link);
            link.click();

            // Remove o link do corpo do documento
            document.body.removeChild(link);
        }*/

        // Inicializa o carregamento da lista de anime
        fetchAnimeList(0);
    });
}

// Chama a função quando desejar iniciar o processo
loadAnimeList();









document.addEventListener('DOMContentLoaded', function () {
    // Carrega os dados do JSON
    fetch('animeListBackup.json')
        .then(response => response.json())
        .then(data => {
            // Extrai as categorias (letras) dos dados
            const categories = Object.keys(data);

            // Criação dos botões
            const menu = document.getElementById('menu');
            categories.forEach(category => {
                const button = document.createElement('button');
                button.textContent = category;
                button.onclick = function() {
                    showAnimesByCategory(data[category]);
                };
                menu.appendChild(button);
            });

            // Função para mostrar animes por categoria
            function showAnimesByCategory(animes) {
                // Limpa o conteúdo atual da grade de animes
                const animeGrid = document.getElementById('animeGrid');
                animeGrid.innerHTML = '';

                // Verifica se há animes para a categoria selecionada
                if (animes && animes.length > 0) {
                    // Exibe os animes correspondentes na grade
                            animes.forEach(anime => {
            const animeCard = document.createElement('div');
            animeCard.classList.add('animeCard');

            const title = document.createElement('h3');
            title.textContent = anime.title;

            const imageLink = document.createElement('a');
            imageLink.href = anime.url; // Utiliza o campo "url" do anime
            imageLink.target = "_blank"; // Abre o link em uma nova aba (opcional)

            const image = document.createElement('img');
            image.src = anime.image;

            imageLink.appendChild(image);

            animeCard.appendChild(title);
            animeCard.appendChild(imageLink);

            animeGrid.appendChild(animeCard);
                    });
                } else {
                    // Se não houver animes para a categoria, exiba uma mensagem ou faça algo apropriado
                    animeGrid.textContent = 'Nenhum anime encontrado para esta categoria.';
                }
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o JSON:', error);
        });
});


