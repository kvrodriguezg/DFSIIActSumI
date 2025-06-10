document.addEventListener("DOMContentLoaded", () => {
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const recetasFavoritas = favoritos.filter(item => item.email === sesion?.email).map(item => item.receta);

    const contenedor = document.getElementById("favoritos");
    const modales = document.getElementById("modales-recetas");

    // Si no hay sesión activa o no es un usuario "normal", se redirige al login
    if (!sesion || sesion.tipo !== "normal") {
        localStorage.setItem("redirigirDespues", location.pathname);
        alert("Debes iniciar sesión como usuario normal para agregar recetas a favoritos.");
        window.location.href = "login.html";
        return;
    }

    // Definición de recetas 
    const recetas = {
        "Curry de Lentejas": {
            titulo: "Bowl de Curry de Lentejas Rojo Rápido",
            imagen: "img/curry_lentejas.png",
            modalId: "curryLentejasModal",
            modalContenido: `
   <div class="modal" tabindex="-1" id="curryLentejasModal">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Bowl de Curry de Lentejas Rojo Rápido</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Un curry reconfortante y lleno de sabor, perfecto para un almuerzo caliente y nutritivo.</p>
                    <p><strong>Tiempo de preparación:</strong> 10 minutos<br>
                        <strong>Tiempo de cocción:</strong> 25-30 minutos<br>
                        <strong>Porciones:</strong> 3-4
                    </p>

                    <h5>Ingredientes:</h5>
                    <ul>
                        <li>1 cucharada de aceite de coco o vegetal</li>
                        <li>1 cebolla mediana, picada</li>
                        <li>2 dientes de ajo, picados</li>
                        <li>1 trozo de jengibre (aprox. 2 cm), rallado o picado muy fino</li>
                        <li>1 cucharada de pasta de curry rojo (ajusta al gusto picante)</li>
                        <li>1 lata (400g) de tomate triturado o puré de tomate</li>
                        <li>1 lata (400ml) de leche de coco (la versión "full-fat" da mejor cremosidad)</li>
                        <li>1 taza (aprox. 200g) de lentejas rojas (o coral), bien enjuagadas</li>
                        <li>3 tazas de caldo de verduras</li>
                        <li>1 zanahoria grande, cortada en cubos pequeños</li>
                        <li>1 taza de espinacas frescas (o col rizada, kale)</li>
                        <li>Sal y pimienta negra al gusto</li>
                        <li>Opcional para servir: arroz basmati o integral, cilantro fresco picado, gajos de limón o
                            lima.</li>
                    </ul>

                    <h5>Instrucciones:</h5>
                    <ol>
                        <li><strong>Sofrito aromático:</strong> En una olla grande o cacerola, calienta el aceite de
                            coco a fuego medio. Agrega la cebolla picada y cocina hasta que esté transparente, unos
                            5 minutos.</li>
                        <li><strong>Incorpora el ajo picado y el jengibre rallado:</strong> Cocina por 1-2 minutos
                            más hasta que estén fragantes, teniendo cuidado de que el ajo no se queme.</li>
                        <li><strong>Añadir pasta de curry:</strong> Agrega la pasta de curry rojo y remueve bien por
                            un minuto para que libere sus aromas.</li>
                        <li><strong>Base del curry:</strong> Vierte el tomate triturado y la leche de coco. Remueve
                            para integrar.</li>
                        <li><strong>Lentejas y caldo:</strong> Añade las lentejas rojas enjuagadas y el caldo de
                            verduras. Lleva a ebullición, luego reduce el fuego a bajo, tapa y cocina por 15-20
                            minutos, o hasta que las lentejas estén tiernas. Las lentejas rojas se deshacen un poco,
                            lo cual es ideal para un curry cremoso.</li>
                        <li><strong>Agregar vegetales:</strong> A mitad de la cocción de las lentejas (unos 10
                            minutos antes de que estén listas), agrega la zanahoria en cubos para que se cocine bien
                            pero no se deshaga.</li>
                        <li><strong>Finalizar y sazonar:</strong> Una vez que las lentejas estén tiernas y la
                            zanahoria cocida, retira la olla del fuego. Agrega las espinacas frescas y remueve hasta
                            que se marchiten.</li>
                        <li><strong>Prueba y ajusta:</strong> Prueba y ajusta la sal y pimienta al gusto. Si lo
                            deseas, puedes añadir una pizca de azúcar o un chorrito de jugo de limón para equilibrar
                            los sabores.</li>
                        <li><strong>Servir:</strong> Sirve el curry caliente en bowls, acompañado de arroz basmati o
                            integral. Decora con cilantro fresco picado y un gajo de limón o lima si lo deseas.</li>
                    </ol>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
                    `
        }, "Tostadas Francesas": {
            titulo: "Tostadas Francesas con Frutas y Sirope de Arce",
            imagen: "img/tostadas_francesas.png",
            modalId: "tostadasFrancesasModal",
            modalContenido: `
    <div class="modal" tabindex="-1" id="tostadasFrancesasModal">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Tostadas Francesas con Frutas y Sirope de Arce</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Un clásico reconfortante y versátil, ideal para empezar el día con energía.</p>
                    <p>
                        <strong>Tiempo de preparación:</strong> 10 minutos<br>
                        <strong>Tiempo de cocción:</strong> 10-15 minutos<br>
                        <strong>Porciones:</strong> 2
                    </p>
                    <h5>Ingredientes:</h5>
                    <ul>
                        <li>4 rebanadas de pan de molde (preferiblemente de un día anterior, o pan brioche/challah para mejor resultado)</li>
                        <li>2 huevos grandes</li>
                        <li>120 ml (1/2 taza) de leche (entera, descremada o vegetal)</li>
                        <li>1 cucharadita de extracto de vainilla</li>
                        <li>½ cucharadita de canela en polvo</li>
                        <li>Una pizca de nuez moscada (opcional)</li>
                        <li>1 cucharada de azúcar (opcional, para la mezcla de huevo)</li>
                        <li>1 cucharada de mantequilla o aceite vegetal para cocinar</li>
                    </ul>
                    <h6>Para servir:</h6>
                    <ul>
                        <li>Frutas frescas (frutos rojos, rodajas de plátano, kiwi, etc.)</li>
                        <li>Sirope de arce (maple syrup) o miel</li>
                        <li>Azúcar glas (azúcar impalpable) para espolvorear (opcional)</li>
                    </ul>
                    <h5>Instrucciones:</h5>
                    <ol>
                        <li><strong>Preparar la mezcla de huevo:</strong> En un recipiente ancho, bate los huevos. Agrega la leche, vainilla, canela, nuez moscada y azúcar. Mezcla bien.</li>
                        <li><strong>Preparar el pan:</strong> Sumerge las rebanadas en la mezcla por 10–20 segundos por cada lado.</li>
                        <li><strong>Cocinar las tostadas:</strong> Calienta mantequilla en una sartén y cocina las rebanadas por 2–4 minutos por lado hasta dorar.</li>
                        <li><strong>Servir:</strong> Espolvorea azúcar glas y acompaña con frutas y sirope de arce o miel.</li>
                    </ol>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
        `
        },
        "Brownies de Chocolate con Nuez": {
            titulo: "Brownies de Chocolate con Nuez (Súper Húmedos)",
            imagen: "img/brownies_chocolate.png",
            modalId: "brownieModal",
            modalContenido: `    <div class="modal" tabindex="-1" id="brownieModal">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Brownies de Chocolate con Nuez (Súper Húmedos)</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Un clásico irresistible, perfectos para compartir o para un antojo dulce.</p>

                    <p>
                        <strong>Tiempo de preparación:</strong> 15 minutos<br>
                        <strong>Tiempo de cocción:</strong> 25-30 minutos<br>
                        <strong>Porciones:</strong> 9-12 (en un molde cuadrado de 20x20 cm)
                    </p>

                    <h5>Ingredientes:</h5>
                    <ul>
                        <li>125g de mantequilla sin sal</li>
                        <li>150g de chocolate semi-amargo (mínimo 60% cacao), picado</li>
                        <li>2 huevos grandes</li>
                        <li>200g de azúcar</li>
                        <li>1 cucharadita de extracto de vainilla</li>
                        <li>75g de harina de trigo (todo uso)</li>
                        <li>30g de cacao en polvo sin azúcar</li>
                        <li>½ cucharadita de sal</li>
                        <li>100g de nueces picadas (opcional, pero muy recomendado)</li>
                    </ul>

                    <h5>Instrucciones:</h5>
                    <ol>
                        <li><strong>Precalentar y preparar el molde:</strong> Precalienta el horno a 180°C (350°F).
                            Engrasa un molde cuadrado de 20x20 cm (8x8 pulgadas) y fórralo con papel de horno,
                            dejando que sobresalgan los bordes para poder desmoldar fácilmente.</li>
                        <li><strong>Derretir el chocolate y la mantequilla:</strong> En un bol resistente al calor,
                            derrite la mantequilla y el chocolate picado a baño maría o en el microondas en
                            intervalos cortos, removiendo cada 30 segundos, hasta obtener una mezcla suave y
                            brillante. Deja entibiar un poco.</li>
                        <li><strong>Mezclar líquidos:</strong> En un bol grande, bate los huevos con el azúcar y la
                            vainilla hasta que la mezcla esté pálida y ligeramente espumosa.</li>
                        <li><strong>Combinar chocolate:</strong> Vierte la mezcla de chocolate derretido (que ya
                            debe estar tibia, no caliente) sobre la mezcla de huevos y azúcar. Bate suavemente con
                            una espátula o batidor de mano hasta que esté bien combinado.</li>
                        <li><strong>Incorporar secos:</strong> En un bol aparte, tamiza la harina, el cacao en polvo
                            y la sal. Agrega gradualmente esta mezcla de ingredientes secos a la mezcla de
                            chocolate, removiendo con una espátula solo hasta que no queden grumos de harina. No
                            mezcles en exceso.</li>
                        <li><strong>Añadir nueces:</strong> Si usas nueces, incorpóralas a la masa.</li>
                        <li><strong>Hornear:</strong> Vierte la masa en el molde preparado y extiéndela de manera
                            uniforme.</li>
                        <li><strong>Tiempo de cocción:</strong> Hornea durante 25-30 minutos. El brownie estará
                            listo cuando los bordes estén firmes y el centro aún se sienta ligeramente húmedo al
                            tacto (un palillo insertado en el centro debe salir con algunas migas húmedas, no
                            completamente limpio, para que queden húmedos).</li>
                        <li><strong>Enfriar:</strong> Retira del horno y deja enfriar completamente en el molde
                            sobre una rejilla antes de desmoldar y cortar en cuadrados. Esto es crucial para que
                            adquieran su textura fudgy.</li>
                    </ol>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>`
        },
        "Mousse de Chocolate": {
            titulo: "Mousse de Chocolate Clásico (sin huevo crudo)",
            imagen: "img/mousse_chocolate.png",
            modalId: "mousseChocolateModal",
            modalContenido: `    <div class="modal" tabindex="-1" id="mousseChocolateModal">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Mousse de Chocolate Clásica (sin huevo crudo)</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Un postre elegante y cremoso, perfecto para cualquier ocasión.</p>

                    <p>
                        <strong>Tiempo de preparación:</strong> 20 minutos<br>
                        <strong>Tiempo de refrigeración:</strong> 2-4 horas<br>
                        <strong>Porciones:</strong> 4-6
                    </p>

                    <h5>Ingredientes:</h5>
                    <ul>
                        <li>200g de chocolate semi-amargo (mínimo 60% cacao), picado</li>
                        <li>100ml de leche entera</li>
                        <li>50g de azúcar (ajusta al gusto)</li>
                        <li>300ml de crema de leche para batir (mínimo 35% de grasa), muy fría</li>
                        <li>1 cucharadita de extracto de vainilla</li>
                        <li>Una pizca de sal (opcional, realza el sabor del chocolate)</li>
                    </ul>

                    <h5>Instrucciones:</h5>
                    <ol>
                        <li><strong>Preparar la base de chocolate:</strong> En un cazo pequeño, calienta la leche a
                            fuego medio hasta que esté a punto de hervir (sin que hierva). Retira del fuego.</li>
                        <li><strong>Disolver el chocolate:</strong> Agrega el chocolate picado y el azúcar a la
                            leche caliente. Deja reposar por 1-2 minutos, luego remueve suavemente con una espátula
                            o batidor de mano hasta que el chocolate se derrita por completo y la mezcla esté suave
                            y homogénea. Agrega la pizca de sal y la vainilla. Deja enfriar a temperatura ambiente.
                        </li>
                        <li><strong>Montar la crema:</strong> En un bol grande y frío (puedes enfriarlo previamente
                            en el congelador), vierte la crema de leche muy fría. Bate con una batidora eléctrica a
                            velocidad media-alta hasta que se formen picos suaves. Ten cuidado de no sobrebatir para
                            que no se corte.</li>
                        <li><strong>Combinar mezclas:</strong> Una vez que la mezcla de chocolate esté fría (es
                            crucial que no esté caliente para no derretir la crema montada), vierte aproximadamente
                            un tercio de la crema batida sobre la mezcla de chocolate. Con movimientos envolventes
                            suaves, integra la crema para aligerar la mezcla de chocolate.</li>
                        <li><strong>Terminar la mezcla:</strong> Luego, vierte el resto de la crema batida y
                            continúa mezclando con movimientos envolventes hasta que todo esté bien combinado y no
                            queden vetas blancas. No batas en exceso para mantener la ligereza de la mousse.</li>
                        <li><strong>Refrigerar:</strong> Vierte la mousse en copas individuales o en un bol grande.
                            Cubre con papel film y refrigera por al menos 2-4 horas, o idealmente toda la noche,
                            para que adquiera la consistencia deseada.</li>
                        <li><strong>Servir:</strong> Decora con virutas de chocolate, cacao en polvo, frutos rojos o
                            un poco más de crema batida antes de servir.</li>
                    </ol>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>` },   
    "Tacos de Lentejas": {
            titulo: "Tacos de Lentejas Especiadas con Salsa de Aguacate y Cilantro",
            imagen: "img/tacos_lentejas.png",
            modalId: "tacosLentejasModal",
            modalContenido: `    <div class="modal" tabindex="-1" id="tacosLentejasModal">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Tacos de Lentejas Especiadas con Salsa de Aguacate y Cilantro</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Una opción vegana sabrosa, nutritiva y con un toque mexicano, perfecta para un almuerzo o
                        cena ligera y divertida.</p>

                    <p>
                        <strong>Tiempo de preparación:</strong> 15 minutos<br>
                        <strong>Tiempo de cocción:</strong> 25-30 minutos<br>
                        <strong>Porciones:</strong> 4-6
                    </p>

                    <h5>Ingredientes:</h5>
                    <h6>Para el Relleno de Lentejas:</h6>
                    <ul>
                        <li>1 cucharada de aceite de oliva</li>
                        <li>1 cebolla mediana, picada finamente</li>
                        <li>2 dientes de ajo, picados</li>
                        <li>1 pimiento rojo, picado en cubos pequeños</li>
                        <li>1 taza (aprox. 200g) de lentejas pardinas o verdes, enjuagadas</li>
                        <li>3 tazas de caldo de verduras</li>
                        <li>1 lata (400g) de tomate triturado o puré de tomate</li>
                        <li>1 cucharadita de comino molido</li>
                        <li>1 cucharadita de pimentón dulce</li>
                        <li>½ cucharadita de chile en polvo (o al gusto, si te gusta picante)</li>
                        <li>Sal y pimienta al gusto</li>
                        <li>1 cucharadita de orégano seco</li>
                    </ul>

                    <h6>Para la Salsa de Aguacate y Cilantro:</h6>
                    <ul>
                        <li>1 aguacate maduro</li>
                        <li>¼ taza de cilantro fresco, picado</li>
                        <li>2 cucharadas de jugo de limón o lima</li>
                        <li>2 cucharadas de agua (o más, para ajustar la consistencia)</li>
                        <li>Sal al gusto</li>
                    </ul>

                    <h6>Para Armar los Tacos:</h6>
                    <ul>
                        <li>12-16 tortillas de maíz o trigo (pequeñas)</li>
                        <li>Lechuga fresca picada</li>
                        <li>Tomate picado en cubos</li>
                        <li>Cebolla morada picada</li>
                        <li>Limones o limas, cortados en gajos (para exprimir)</li>
                    </ul>

                    <h5>Instrucciones:</h5>
                    <ol>
                        <li><strong>Preparar el Relleno de Lentejas:</strong> En una olla o sartén grande, calienta
                            el aceite de oliva a fuego medio. Agrega la cebolla picada y cocina hasta que esté
                            transparente, unos 5-7 minutos.</li>
                        <li><strong>Añade el ajo picado y el pimiento rojo:</strong> Cocina por 3-5 minutos más,
                            hasta que el pimiento esté ligeramente tierno.</li>
                        <li><strong>Incorpora las especias y tomate:</strong> Agrega la pasta de curry rojo (si
                            usas), comino, pimentón, chile en polvo, orégano, sal y pimienta. Remueve bien. Vierte
                            el tomate triturado y el caldo de verduras.</li>
                        <li><strong>Cocinar las Lentejas:</strong> Añade las lentejas enjuagadas. Lleva a
                            ebullición, luego reduce el fuego a bajo, tapa y cocina por 20-25 minutos, o hasta que
                            las lentejas estén tiernas y la mayor parte del líquido se haya absorbido. Remueve
                            ocasionalmente. Si queda demasiado líquido, destapa y cocina unos minutos más a fuego
                            medio-alto. Las lentejas deben tener una consistencia que se pueda rellenar fácilmente.
                        </li>
                        <li><strong>Preparar la Salsa de Aguacate y Cilantro:</strong> Mientras las lentejas se
                            cocinan, prepara la salsa. En un procesador de alimentos pequeño o licuadora, combina el
                            aguacate, cilantro, jugo de limón o lima, agua y sal. Procesa hasta obtener una salsa
                            suave y cremosa. Ajusta la consistencia añadiendo más agua si es necesario, y rectifica
                            la sal.</li>
                        <li><strong>Calentar las Tortillas:</strong> Calienta las tortillas de maíz o trigo en una
                            sartén seca a fuego medio-alto por 30 segundos a 1 minuto por cada lado, hasta que estén
                            suaves y ligeramente flexibles. También puedes calentarlas en el microondas envueltas en
                            un paño húmedo.</li>
                        <li><strong>Armar los Tacos:</strong> Coloca las tortillas calientes. Rellena cada tortilla
                            con una porción generosa del guiso de lentejas especiadas. Cubre con lechuga picada,
                            tomate picado y cebolla morada picada.</li>
                        <li><strong>Finalizar:</strong> Termina con un poco de la salsa de aguacate y cilantro por
                            encima. Sirve con gajos de limón o lima para exprimir al gusto.</li>
                    </ol>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>`}

    };

    if (!sesion || recetasFavoritas.length === 0) {
        contenedor.innerHTML = `<p class="text-center">No tienes recetas en tus favoritos aún.</p>`;
        return;
    }

    recetasFavoritas.forEach(nombre => {
        const receta = recetas[nombre];
        if (receta) {
            // Crea la tarjeta
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("categoria");
            tarjeta.innerHTML = `

                        <a data-bs-toggle="modal" data-bs-target="#${receta.modalId}">
                            <img src="${receta.imagen}" alt="${receta.titulo}" />
                            <h3>${receta.titulo}</h3>
                        </a>
                    `;
            contenedor.appendChild(tarjeta);

            // Agrega el modal
            const modal = document.createElement("div");
            modal.innerHTML = receta.modalContenido;
            modales.appendChild(modal);
        }
    });
});