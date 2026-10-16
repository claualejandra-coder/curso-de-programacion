/**
 * DARK SOULS - EL COMPENDIO DE LORDRAN
 * darksouls-app.js
 * Lógica interactiva: Base de datos, filtros, partículas de ceniza, sintetizador de audio y modal
 */

// ==========================================================================
// 1. BASE DE DATOS DEL COMPENDIO (PERSONAJES, JEFES, ARTÍCULOS)
// ==========================================================================
const COMPENDIUM_DATA = [
  // --- PERSONAJES (NPCs) ---
  {
    id: "solaire",
    category: "characters",
    categoryLabel: "Aliado / Guerrero",
    name: "Solaire de Astora",
    epithet: "Caballero de la Luz Solar",
    avatarIcon: "☀️",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    location: "Burgo de los No Muertos / Anor Londo",
    covenant: "Guerreros de la Luz Solar",
    role: "Invocación Cooperativa & Compañero",
    quote: "«¡El sol es como un padre magnífico! Si tan sólo yo pudiera ser tan incandescente... Alabado sea el sol.»",
    description: "Un caballero de espíritu inquebrantable y radiante amabilidad que eligió voluntariamente convertirse en No Muerto para viajar a Lordran y buscar a su propio 'Sol'.",
    fullLore: "Solaire es uno de los pocos seres verdaderamente cálidos en la desolación de Lordran. Te entrega la Piedra de Saponita Blanca para invocar y ser invocado entre mundos. Acompaña al Elegido contra las Gárgolas de la Campana, el Dragón Boquiabierto y la temible pareja Ornstein y Smough. No obstante, si el jugador no interviene en las Ruinas de los Demonios abriendo el atajo de Izalith, Solaire será poseído por un insecto solar perdiendo la razón en una trágica locura.",
    stats: {
      "Pacto": "Guerreros de la Luz Solar",
      "Arma principal": "Espada recta de Luz Solar",
      "Milagro insignia": "Lanza de Rayo Solar",
      "Destino": "Salvable o Trágico"
    }
  },
  {
    id: "siegmeyer",
    category: "characters",
    categoryLabel: "Caballero Andante",
    name: "Siegmeyer de Catarina",
    epithet: "El Caballero Cebolla",
    avatarIcon: "🧅",
    image: "https://images.unsplash.com/photo-1533158307587-828f0a76ef46?auto=format&fit=crop&w=600&q=80",
    location: "Fortaleza de Sen / Anor Londo / Izalith Perdida",
    covenant: "Caballeros de Catarina",
    role: "Aventurero Noble",
    quote: "«Mmm... mmm... Ah, perdona. Estaba sumido en mis pensamientos. Me he topado con un verdadero callejón sin salida...»",
    description: "Distinguido por su armadura esférica inspirada en cebollas que desvía proyectiles. Es noble y reflexivo, aunque frecuentemente necesita auxilio en sus hazañas.",
    fullLore: "Procedente del festivo y jovial reino de Catarina, Siegmeyer busca aventuras para poner a prueba su valentía. A lo largo de la travesía se encuentra atrapado frente a puertas cerradas, trampas de esferas rodantes y pozos venenosos. Su orgullo guerrero sufre al ser constantemente rescatado por el Elegido, desencadenando una de las tramas más conmovedoras junto a su hija Sieglinde.",
    stats: {
      "Origen": "Reino de Catarina",
      "Arma": "Espadón Bastardo & Escudo Perforador",
      "Familia": "Sieglinde de Catarina (Hija)",
      "Recompensa": "Losa de Titanita"
    }
  },
  {
    id: "artorias",
    category: "characters",
    categoryLabel: "Héroe Trágico",
    name: "Caballero Artorias",
    epithet: "El Caminante del Abismo",
    avatarIcon: "🐺",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    location: "Santuario de Oolacile",
    covenant: "Los Cuatro Caballeros de Gwyn",
    role: "Guardián de Oolacile",
    quote: "«Que el abismo no mancille tu espíritu... Sif... perdóname... todo fue en vano...»",
    description: "Legendario caballero con una voluntad de acero inquebrantable. Descendió a las profundidades de Oolacile para detener el brote de oscuridad primordial.",
    fullLore: "Portador del Anillo del Pacto del Lobo y de un mandoble de plata bendito, Artorias fue enviado a sofocar el avance del Abismo desatado por Manus. Al verse superado, utilizó su Gran Escudo para formar una barrera mágica impenetrable alrededor de su joven lobo Sif, sacrificando su brazo izquierdo y su propia alma a la corrupción.",
    stats: {
      "Título": "Caballero del Lobo de Gwyn",
      "Compañero": "Sif, el Gran Lobo Gris",
      "Debilidad": "Fuego / Rayo",
      "Recompensa": "Alma de Artorias"
    }
  },
  {
    id: "anastacia",
    category: "characters",
    categoryLabel: "Guardiana del Fuego",
    name: "Anastacia de Astora",
    epithet: "La Guardiana Silenciosa",
    avatarIcon: "🕯️",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    location: "Santuario de Enlace de Fuego",
    covenant: "Hijas de la Llama",
    role: "Refuerzo del Frasco de Estus",
    quote: "«...Por favor, te lo ruego... mantén el fuego ardiendo... No permitas que el mundo caiga en tinieblas eternas...»",
    description: "Guardiana recluida en una celda bajo la hoguera principal. Su lengua fue cortada y sus piernas mutiladas para que jamás abandonara su cometido sagrado.",
    fullLore: "Las Guardianas del Fuego son manifestaciones vivientes de las hogueras. Sus almas están repletas de incontables humanidades que arden purificando el camino de los No Muertos. Si el asesino Lautrec de Carim la asesina, el jugador deberá invadir su mundo con el Orbe del Ojo Negro en Anor Londo para recuperar su alma y revivirla.",
    stats: {
      "Ubicación": "Bajo la hoguera del Enlace",
      "Función": "Mejora el Frasco de Estus (+1)",
      "Drop": "Alma de Guardiana del Fuego / Ropajes",
      "Estado": "Rescatable de Lautrec"
    }
  },
  {
    id: "andre",
    category: "characters",
    categoryLabel: "Maestro Artesano",
    name: "André de Astora",
    epithet: "El Herrero Inagotable",
    avatarIcon: "⚒️",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
    location: "Parroquia de los No Muertos",
    covenant: "Artesanos de Astora",
    role: "Refuerzo y Ascensión de Armas",
    quote: "«No te conviertas en un hueco, amigo. Ninguno de los dos querría ver eso. ¡Jajaja!»",
    description: "Un herrero robusto y carismático cuyo martillo resuena sin descanso día y noche, forjando armas capaces de desafiar a los mismos dioses.",
    fullLore: "André es fundamental para la supervivencia del No Muerto Elegido. Con los diferentes Ascuas (Grande, Muy Grande, Divina y Oscura), André puede forjar el acero hasta alcanzar el nivel legendario +15, además de imbuir daño celestial que extermina permanentemente a los esqueletos de las Catacumbas.",
    stats: {
      "Servicio": "Refuerzo +15 / Divino / Oculto",
      "Herramientas": "Caja de armas / Caja de armaduras",
      "Ubicación": "Torre junto a la Parroquia",
      "Consejo": "Nunca golpear al herrero"
    }
  },
  {
    id: "logan",
    category: "characters",
    categoryLabel: "Erudito y Hechicero",
    name: "Logan Sombrero Grande",
    epithet: "El Archimago de Vinheim",
    avatarIcon: "🧙‍♂️",
    image: "https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=600&q=80",
    location: "Fortaleza de Sen / Archivos del Duque",
    covenant: "Escuela del Dragón de Vinheim",
    role: "Maestro de Hechicerías Avanzadas",
    quote: "«La magia no es sino la manipulación del alma... una búsqueda infinita hacia los secretos del cosmos.»",
    description: "Hechicero de renombre legendario con un descomunal sombrero de ala ancha con el que aislaba el ruido de la gente para concentrarse en sus pergaminos.",
    fullLore: "Logan viajó a Lordran para acceder a la biblioteca prohibida de Seath el Descamado. Al descubrir los Archivos del Duque, sus facultades mentales sucumben gradualmente ante el conocimiento arcano de los cristales, transformando su magia en hechicerías cristalinas letales antes de perder completamente el juicio.",
    stats: {
      "Escuela": "Dragón de Vinheim",
      "Hechizos": "Lanza de alma / Masa de alma de cristal",
      "Catalizador": "Catalizador de cristal de Logan",
      "Destino": "Locura en la Cueva de Cristal"
    }
  },
  {
    id: "patches",
    category: "characters",
    categoryLabel: "Pícaro y Oportunista",
    name: "Parches la Hiena",
    epithet: "El Tramposo de las Catacumbas",
    avatarIcon: "🃏",
    image: "https://images.unsplash.com/photo-1519074069444-1ba4eae16e60?auto=format&fit=crop&w=600&q=80",
    location: "Catacumbas / Tumba de los Gigantes",
    covenant: "Nómadas Codiciosos",
    role: "Traidor & Vendedor de Máscaras",
    quote: "«¿Por casualidad no serás un clérigo? ¡Uf, qué alivio! Oye, asómate a ese foso... ¡hay un tesoro brillante!»",
    description: "Un embaucador calvo con un profundo odio por los clérigos. Disfruta empujar a aventureros incautos a pozos mortales para saquear sus cuerpos.",
    fullLore: "A pesar de sus múltiples intentos de asesinato empujando puentes giratorios o arrojándote a la oscuridad de la Tumba de los Gigantes, si el jugador sobrevive y perdona su vida, Parches se reubica pacíficamente en el Santuario de Enlace de Fuego vendiendo valiosos milagros, talismanes y las codiciadas máscaras de Padre, Madre e Hijo.",
    stats: {
      "Táctica": "Empujar a los aventureros por la espalda",
      "Odio": "Devotos de la Vía Blanca / Clérigos",
      "Mercancía": "Máscaras del Molinete & Hierbas",
      "Frase célebre": "«¡Todos somos amigos aquí, camarada!»"
    }
  },
  {
    id: "beatrice",
    category: "characters",
    categoryLabel: "Bruja Solitaria",
    name: "Bruja Beatrice",
    epithet: "La Doncella del Bosque",
    avatarIcon: "🪄",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    location: "Jardín Tenebroso / Nuevo Londo",
    covenant: "Hechiceras Primitivas",
    role: "Aliada en Combates de Jefes",
    quote: "«Aquellos que desafían el Abismo deben saber que la oscuridad también mira de vuelta hacia ellos.»",
    description: "Una bruja joven y misteriosa que no aprendió sus conjuros en la academia formal de Vinheim, sino directamente de los espíritus de la naturaleza.",
    fullLore: "Beatrice es capaz de derrotar casi en solitario a la Mariposa Lunar gracias a sus poderosas lanzas mágicas. Más adelante intenta aventurarse sola en el Abismo para derrotar a los Cuatro Reyes, pero trágicamente muere cerca de las Ruinas de Nuevo Londo, donde el jugador puede encontrar su túnica y catalizador.",
    stats: {
      "Estilo": "Hechicería Ancestral no académica",
      "Invocación": "Mariposa Lunar & Los Cuatro Reyes",
      "Equipamiento": "Catalizador de Beatrice & Ropas de bruja",
      "Destino": "Perecida en el Abismo"
    }
  },

  // --- JEFES LEGENDARIOS (BOSSES) ---
  {
    id: "gwyn",
    category: "bosses",
    categoryLabel: "Jefe Final / Dios",
    name: "Gwyn, Señor de la Ceniza",
    epithet: "El Dios del Sol Sacrificado",
    avatarIcon: "👑",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    location: "Horno de la Primera Llama",
    covenant: "Familia Real de Anor Londo",
    role: "Guardián de la Primera Llama",
    quote: "«Cuando la Llama Primordial comenzó a extinguirse, el Rey Gwyn se sacrificó para alimentar sus brasas eternas.»",
    description: "El supremo de los dioses de Lordran. Empuñando su espada envuelta en fuego llameante y acompañado por la nostálgica melodía de piano más recordada del juego.",
    fullLore: "Gwyn lideró a los dioses en la guerra contra los dragones eternos blandiendo relámpagos de luz solar. Mil años antes del juego, temiendo que la Era de los Dioses muriese y diera paso a la Era Oscura de los Hombres, Gwyn marchó al Horno de la Primera Llama y encendió su propio ser como leña. Ahora no es más que una cáscara hueca consumida por las cenizas.",
    stats: {
      "Salud": "4,180 PS",
      "Debilidad": "Desvío (Parry) / Daño Mágico",
      "Resistencia": "Fuego / Rayo",
      "Drop": "Alma de Gwyn, Señor de la Ceniza"
    }
  },
  {
    id: "ornstein_smough",
    category: "bosses",
    categoryLabel: "Jefe Doble Legendario",
    name: "Ornstein & Smough",
    epithet: "El Asesino de Dragones & El Verdugo",
    avatarIcon: "⚡",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
    location: "Gran Catedral de Anor Londo",
    covenant: "Guardianes de la Princesa Gwynevere",
    role: "Prueba Máxima del Elegido",
    quote: "«Uno con la velocidad del rayo y la lanza de un león; el otro con la brutalidad demoledora del martillo de un gigante.»",
    description: "El combate más icónico y exigente de Dark Souls. Requiere sortear simultáneamente la agilidad eléctrica de Ornstein y la fuerza imparable de Smough.",
    fullLore: "Ubicados en el corazón de Anor Londo custodiando la cámara de Gwynevere. Al derrotar a uno de ellos, el sobreviviente absorbe los poderes del caído: si Smough cae primero, Ornstein se vuelve gigante adquiriendo mayor alcance; si Ornstein muere primero, el martillo de Smough se imbuye de letales descargas de rayo.",
    stats: {
      "Salud conjunta": "~4,500 PS (Fase 1) + ~3,000 PS (Fase 2)",
      "Estrategia": "Usar las columnas de piedra para separarlos",
      "Debilidad": "Fuego (Ornstein) / Rayo (Smough)",
      "Drop": "Alma del último derrotado & Vasija del Señor"
    }
  },
  {
    id: "sif",
    category: "bosses",
    categoryLabel: "Guardián de Tumba",
    name: "Sif, el Gran Lobo Gris",
    epithet: "El Fiel Compañero de Artorias",
    avatarIcon: "🐺",
    image: "https://images.unsplash.com/photo-1564415051543-cb872394330f?auto=format&fit=crop&w=600&q=80",
    location: "Jardín Tenebroso",
    covenant: "Defensores del Bosque",
    role: "Protector del Anillo del Pacto",
    quote: "«Sosteniendo entre sus fauces el enorme mandoble de su difunto amo para proteger al mundo de la maldición del Abismo.»",
    description: "Un lobo colosal de pelaje plateado que custodia la tumba de Artorias para evitar que ningún otro guerrero sucumba al mismo trágico destino que su amo.",
    fullLore: "Si el jugador rescata al joven Sif en el DLC del Municipio de Oolacile antes de enfrentarlo en el presente, una cinemática especial y desgarradora se activa: Sif reconoce el olor del Elegido, vacila, deja escapar un aullido de lamento y recoge con pesar el espadón para cumplir con su deber sagrado. Al final de su vida, cojea lastimosamente en el combate.",
    stats: {
      "Salud": "3,432 PS",
      "Debilidad": "Fuego / Hemorragia / Ataques bajo su vientre",
      "Resistencia": "Magia pura",
      "Drop": "Alma de Sif & Anillo del Pacto de Artorias"
    }
  },
  {
    id: "quelaag",
    category: "bosses",
    categoryLabel: "Hija del Caos",
    name: "Bruja del Caos Quelaag",
    epithet: "La Tejedora de Fuego",
    avatarIcon: "🕷️",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80",
    location: "Dominio de Quelaag (Ciudad Infestada)",
    covenant: "Siervos del Caos",
    role: "Guardián de la Segunda Campana",
    quote: "«Muta en una atroz quimera de fuego y dolor para alimentar el agonizante cuerpo de su hermana ciega con la humanidad de los intrusos.»",
    description: "Una hechicera mitad humana y mitad araña gigante de lava ardiente que vomita magma sobre el foso de la Segunda Campana del Despertar.",
    fullLore: "Hija de la Bruja de Izalith que huyó cuando la Llama del Caos deformó a su familia en demonios. Quelaag protege ferozmente a su hermana 'La Hija del Caos', quien absorbió el pus contaminado de los habitantes de Blighttown para aliviar su sufrimiento a costa de quedar ciega y postrada al borde de la muerte.",
    stats: {
      "Salud": "3,139 PS",
      "Debilidad": "Rayo / Flechas a su torso superior humano",
      "Inmunidad": "Fuego total y lava",
      "Drop": "Alma de Quelaag & Campana del Despertar"
    }
  },
  {
    id: "nito",
    category: "bosses",
    categoryLabel: "Señor de la Muerte",
    name: "Nito, Primero de los Muertos",
    epithet: "El Rey del Cementerio",
    avatarIcon: "💀",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    location: "Tumba de los Gigantes",
    covenant: "Siervos del Rey del Cementerio",
    role: "Poseedor del Alma de la Muerte",
    quote: "«En las profundidades del sepulcro eterno, cubierto por una túnica de millares de calaveras danzantes y plagas de miasma.»",
    description: "Uno de los cuatro señores originales que descubrieron las Almas de Señor. Gobierna el descanso eterno y la descomposición del mundo biológico.",
    fullLore: "Nito desató tempestades de muerte y putrefacción contra los dragones inmortales. Reside en la más absoluta oscuridad rodeado de un séquito interminable de esqueletos que sólo pueden ser detenidos permanentemente con armas imbuidas con poder Divino.",
    stats: {
      "Salud": "4,317 PS",
      "Debilidad": "Fuego / Armas Divinas (para esbirros)",
      "Ataque especial": "Espada de Nito emergiendo del suelo",
      "Drop": "Alma de Señor (Para la Vasija del Señor)"
    }
  },
  {
    id: "seath",
    category: "bosses",
    categoryLabel: "Dragón Traidor",
    name: "Seath el Descamado",
    epithet: "El Duque Ciego de los Cristales",
    avatarIcon: "🔮",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    location: "Cueva de Cristal / Archivos del Duque",
    covenant: "Canalizadores del Duque",
    role: "Poseedor de Fragmento de Señor",
    quote: "«Nacido sin las inmortales escamas pétreas de sus hermanos, su envidia desmedida lo llevó a condenar a toda su estirpe.»",
    description: "Un dragón albino y ciego con alas de tentáculo y colas cristalinas que desarrolló la hechicería y halló la inmortalidad artificial en el Cristal Primordial.",
    fullLore: "Gwyn le otorgó el título nobiliario de Duque y un inmenso archivo científico. Enloquecido en su búsqueda de escamas eternas, raptó doncellas humanas para horrendas mutaciones (creando a las Pisacas) y se volvió inmune a la muerte hasta que el Elegido quiebra el Cristal Primordial en su caverna secreta.",
    stats: {
      "Salud": "5,525 PS",
      "Requisito": "Destruir el Cristal Primordial para dañarlo",
      "Corte de cola": "Otorga el Espadón de Luz de Luna",
      "Drop": "Fragmento de Alma de Señor Legada"
    }
  },
  {
    id: "four_kings",
    category: "bosses",
    categoryLabel: "Monarcas del Vacío",
    name: "Los Cuatro Reyes",
    epithet: "Los Señores Hundidos en el Abismo",
    avatarIcon: "👥",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    location: "El Abismo (Ruinas de Nuevo Londo)",
    covenant: "Espectros Oscuros (Darkwraiths)",
    role: "Poseedores de Fragmento de Señor",
    quote: "«Engañados por la serpiente primordial Kaathe, sacrificaron a su pueblo en el arte del drenaje de vida y fueron inundados en el Abismo.»",
    description: "Antiguos sabios gobernantes de la gloriosa ciudad de Nuevo Londo. Requieren el Anillo del Pacto de Artorias para pisar el Abismo sin morir asfixiado.",
    fullLore: "Gwyn les confió un fragmento de su propia alma para que gobernaran en paz. Sin embargo, sucumbieron a la avaricia de poder ofrecida por la Serpiente Kaathe. Para contener la oscuridad, tres magos selladores inundaron toda la ciudad ahogando a miles de ciudadanos inocentes para mantener encerrados a los reyes en las profundidades.",
    stats: {
      "Mecánica": "Aparece un nuevo rey cada 40 segundos",
      "Clave del combate": "Daño masivo por segundo (DPS puro)",
      "Debilidad": "Fuego y Rayo",
      "Drop": "Fragmento de Alma de Señor Legada"
    }
  },
  {
    id: "asylum_demon",
    category: "bosses",
    categoryLabel: "Primer Guardián",
    name: "Demonio del Refugio",
    epithet: "El Azote del Norte",
    avatarIcon: "👹",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
    location: "Refugio de los No Muertos del Norte",
    covenant: "Huestes del Caos de Izalith",
    role: "Jefe Tutorial / Prueba de Huida",
    quote: "«El primer titán que te enseña que no todo combate debe librarse de frente sin una estrategia o una salida ingeniosa.»",
    description: "Una bestia demoníaca alada con un mazo de madera gigantesco que custodia el patio central impidiendo que ningún prisionero escape de sus celdas.",
    fullLore: "Los demonios nacieron del fallo catastrófico de la Bruja de Izalith al intentar clonar la Primera Llama. Este demonio fue asignado al lejano y gélido norte para aplastar las esperanzas de los No Muertos profetizados antes de que pudieran siquiera soñar con pisar Lordran.",
    stats: {
      "Salud": "825 PS",
      "Táctica tutorial": "Huir por la puerta lateral y realizar ataque en caída",
      "Debilidad": "Fuego / Hemorragia",
      "Drop": "Llave del Gran Peregrino / Gran Martillo"
    }
  },

  // --- ARTÍCULOS Y RELIQUIAS (ITEMS & RELICS) ---
  {
    id: "estus_flask",
    category: "items",
    categoryLabel: "Herramienta Sagrada",
    name: "Frasco de Estus",
    epithet: "El Fuego Esmeralda del No Muerto",
    avatarIcon: "🧪",
    image: "https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=600&q=80",
    location: "Entregado por Oscar de Astora",
    covenant: "Todos los No Muertos",
    role: "Recuperación Vital (PS)",
    quote: "«Un frasco de vidrio esmeralda que atrapa el calor y la esencia de las hogueras. Alivia las heridas mortales del portador de la señal oscura.»",
    description: "El sustento vital indispensable para todo viajero en Lordran. Se recarga cada vez que descansas junto a la lumbre de una hoguera encendida.",
    fullLore: "El frasco absorbe el calor vivo de las llamas. Al ser reforzado con Almas de Guardianas del Fuego, su líquido reconfortante cura una cantidad sustancialmente mayor de salud. Las hogueras que han sido avivadas con Humanidad proporcionan hasta 10, 15 o 20 sorbos al descansar en ellas.",
    stats: {
      "Capacidad base": "5 cargas (10 en Enlace de Fuego)",
      "Capacidad máxima": "20 cargas con el Rito del Avivado",
      "Mejora máxima": "+7 con Almas de Guardiana",
      "Tipo": "Objeto Infinito Recargable"
    }
  },
  {
    id: "humanity",
    category: "items",
    categoryLabel: "Espíritu / Esencia",
    name: "Humanidad",
    epithet: "El Fragmento de la Oscuridad Interior",
    avatarIcon: "🖤",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    location: "Cadáveres, Ratas, Siervos del Caos",
    covenant: "Hijos del Pigmeo Furtivo",
    role: "Restauración de Forma Humana y Avivado",
    quote: "«Fragmento negro hallado en cadáveres. Si el alma es la fuente de toda vida... ¿qué es esta diminuta y tibia oscuridad?»",
    description: "Una silueta de oscuridad con ojos tenues que permite al No Muerto recuperar su apariencia y cordura humana, además de avivar las hogueras sagradas.",
    fullLore: "La Humanidad no es otra cosa que una partícula minúscula del Alma Oscura hallada originalmente por el Pigmeo Furtivo al principio de los tiempos. Al consumirla, incrementa las defensas globales del jugador, aumenta la probabilidad de hallazgo de tesoros y previene la demencia del estado Hueco.",
    stats: {
      "Efecto": "Restaura salud completa +1 Humanidad en contador",
      "Uso en hoguera": "Revertir estado Hueco / Avivar llama",
      "Límite de bonificación": "Escala hasta 10 humanidades en contador",
      "Naturaleza": "Fragmento del Alma Oscura"
    }
  },
  {
    id: "white_soapstone",
    category: "items",
    categoryLabel: "Herramienta Multijugador",
    name: "Piedra de Saponita Blanca",
    epithet: "El Glifo de la Cooperación Dorada",
    avatarIcon: "🪨",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    location: "Regalo de Solaire de Astora",
    covenant: "Guerreros de la Luz Solar / Cooperación",
    role: "Inscribir Señales de Convocatoria",
    quote: "«En Lordran el tiempo está distorsionado; los héroes del pasado y del futuro flotan a la deriva. Esta piedra te permite conectar con ellos.»",
    description: "Permite trazar un símbolo brillante en el suelo para que jugadores de otros mundos te convoquen como espectro protector para vencer a los jefes.",
    fullLore: "Solaire entrega este artefacto al Elegido con la sincera esperanza de compartir una alegre cooperación en medio de un reino plagado de desesperanza. Si el invocador pertenece al pacto solar, la señal y el espectro brillan con un incandescente resplandor dorado.",
    stats: {
      "Uso": "Ilimitado",
      "Requisito": "No estar en estado Hueco para invocar",
      "Recompensa": "Almas y Medallas de Luz Solar",
      "Significado": "Vínculo sagrado entre mundos paralelos"
    }
  },
  {
    id: "moonlight_greatsword",
    category: "items",
    categoryLabel: "Arma Mítica",
    name: "Espadón de Luz de Luna",
    epithet: "El Legado del Dragón Pálido",
    avatarIcon: "🗡️",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    location: "Cortar la cola central de Seath el Descamado",
    covenant: "Magos de Cristal",
    role: "Arma de Escala S con Inteligencia",
    quote: "«Esta espada legendaria no posee un solo gramo de acero terrenal. Está forjada puramente de luz espectral y rayos de luna congelada.»",
    description: "Una de las armas más reconocidas de FromSoftware. Dispara poderosas ondas lunares cortantes a distancia con su ataque fuerte a dos manos.",
    fullLore: "Se obtiene exclusivamente al cercenar con precisión quirúrgica la cola central del dragón Seath en la Cueva de Cristal. A diferencia de las armas comunes, todo su daño es 100% mágico, traspasando escudos físicos estándar como si fueran tela liviana.",
    stats: {
      "Daño base": "132 Daño Mágico (sube a 198 en +5)",
      "Escalado": "Inteligencia S (excepcional)",
      "Habilidad única": "Ráfaga de haz de luz lunar en r2",
      "Material de mejora": "Titanita de Dragón"
    }
  },
  {
    id: "fap_ring",
    category: "items",
    categoryLabel: "Reliquia Sagrada",
    name: "Anillo de Favor y Protección",
    epithet: "La Bendición Inquebrantable de Fina",
    avatarIcon: "💍",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    location: "Lautrec de Carim / Nido de Snuggly",
    covenant: "Culto de la Diosa Fina",
    role: "Potenciador Máximo de Atributos",
    quote: "«La diosa del amor y la belleza bendice a sus devotos con vigor infinito; pero su amor es posesivo: si te lo quitas, se romperá para siempre.»",
    description: "Uno de los anillos más codiciados por los jugadores. Incrementa un asombroso +20% los Puntos de Salud, la Barra de Aguante y la Carga Máxima de Equipo.",
    fullLore: "Portado con devoción fanática por el caballero Lautrec de Carim. Su inmenso poder compensa con creces el riesgo: una vez colocado en el dedo, retirarlo provoca que la joya se haga añicos en polvo dorado de manera irreversible.",
    stats: {
      "Efecto": "+20% Salud (PS), +20% Resistencia, +20% Carga",
      "Condición": "Se destruye permanentemente si se desequipa",
      "Rareza": "Único por partida (máx. 2)",
      "Recomendación": "Mantenerlo equipado permanentemente"
    }
  },
  {
    id: "homeward_bone",
    category: "items",
    categoryLabel: "Consumible Místico",
    name: "Hueso de Regreso",
    epithet: "El Eco de las Cenizas",
    avatarIcon: "🦴",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    location: "Vendido por Mercaderes No Muertos / Drops",
    covenant: "Peregrinos de la Llama",
    role: "Retorno Inmediato a la Hoguera",
    quote: "«Hueso blanco impregnado de ceniza. Su nostalgia por el fuego traslada de inmediato al No Muerto a la última hoguera en que reposó.»",
    description: "Permite escapar de las trampas más traicioneras o de situaciones de muerte inminente conservando intactas todas las almas y humanidades.",
    fullLore: "Las hogueras están conectadas espiritualmente entre sí a través de los huesos de aquellos que se consumieron en la Primera Llama. Al romper este talismán óseo, el fuego reconoce la signatura de ceniza y atrae al portador de vuelta a la seguridad de la llama.",
    stats: {
      "Efecto": "Teletransporte a la última hoguera descansada",
      "Conserva": "100% de las Almas y Humanidades",
      "Tiempo de uso": "Rápido (2 segundos de animación)",
      "Capacidad": "Hasta 99 en inventario"
    }
  },
  {
    id: "titanite_slab",
    category: "items",
    categoryLabel: "Material Legendario",
    name: "Losa de Titanita",
    epithet: "El Fragmento Primordial de los Dioses",
    avatarIcon: "🧱",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    location: "Demonio Salvaje / Siegmeyer / Oolacile",
    covenant: "Forjadores Divinos",
    role: "Refuerzo Supremo de Armamento (+15)",
    quote: "«Losa legendaria caída de los cielos en la era de los dioses. Otorga al armamento común la perfección absoluta del acero inmortal.»",
    description: "El material de forja más codiciado y escaso de todo Lordran. Es imprescindible para elevar un arma al nivel máximo de +15 o una armadura a +10.",
    fullLore: "Existen sólo unas pocas losas esparcidas en todo el reino de Lordran. Cada una posee una densidad y dureza imposible de replicar por medios mortales, siendo el pináculo del oficio de herreros divinos como André o el Herrero Gigante de Anor Londo.",
    stats: {
      "Uso": "Mejora final a +15 Estándar / +10 Armadura",
      "Variantes": "Titanita Azul (Magia), Roja (Fuego), Blanca (Milagro)",
      "Rareza": "Extremadamente Limitada por Ciclo de Partida",
      "Valor": "Incalculable"
    }
  },
  {
    id: "gwyn_soul",
    category: "items",
    categoryLabel: "Alma de Gran Señor",
    name: "Alma del Señor de la Ceniza",
    epithet: "El Último Vestigio de la Primera Llama",
    avatarIcon: "🔥",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    location: "Recompensa por derrotar a Gwyn",
    covenant: "El Legado de los Dioses",
    role: "Forja del Espadón del Gran Señor o Milagro",
    quote: "«El alma de Gwyn, el dios que mantuvo ardiendo el mundo. Su llama aún pulsa débilmente con la promesa de luz y agonía.»",
    description: "Otorga 20,000 almas al consumirse, pero su verdadero valor radica en transmutarse en el majestuoso Espadón del Gran Señor o en la milagrosa Lanza de Luz Solar.",
    fullLore: "Incluso después de haber ardido durante un milenio en el Horno, el remanente del alma de Gwyn alberga una potencia colosal. En manos de un nuevo Señor, define si el mundo continuará prolongando artificialmente la Era del Fuego o si dará paso al reinado de la Oscuridad.",
    stats: {
      "Valor en almas": "20,000 Almas al consumir",
      "Transmutación 1": "Espadón del Gran Señor (con espada +10)",
      "Transmutación 2": "Milagro Lanza de Luz Solar (Altar de la Luz Solar)",
      "Requisito de milagro": "Fe 50 + Pacto Luz Solar +1"
    }
  }
];

// ==========================================================================
// 2. SISTEMA DE AUDIO SINTETIZADO (WEB AUDIO API)
// ==========================================================================
class SoulsAudioSystem {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // Sonido icónico de Hoguera Encendida (acorde místico, resonancia cálida)
  playBonfireLit() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [130.81, 196.00, 261.63, 329.63, 392.00, 523.25]; // C3, G3, C4, E4, G4, C5

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.001, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.08 / (idx + 1), now + idx * 0.06 + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + 3.5);
    });
  }

  // Sonido de muerte (trombón oscuro, disonancia profunda y caída de alma)
  playYouDied() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(65.41, now); // C2
    osc1.frequency.exponentialRampToValueAtTime(45, now + 2.5);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(69.30, now); // C#2 (disonancia angustiante)
    osc2.frequency.exponentialRampToValueAtTime(40, now + 2.5);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 3.6);
    osc2.stop(now + 3.6);
  }

  // Sonido sutil de clic de piedra medieval
  playStoneClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }
}

const soulsAudio = new SoulsAudioSystem();

// ==========================================================================
// 3. CANVAS DE PARTÍCULAS DE CENIZA Y BRASAS DE HOGUERA
// ==========================================================================
function initEmberParticles() {
  const canvas = document.getElementById('ember-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = 65;
  const particles = [];

  class Ember {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2.5 + 0.8;
      this.speedY = Math.random() * 1.2 + 0.4;
      this.speedX = (Math.random() - 0.5) * 0.7;
      this.opacity = Math.random() * 0.7 + 0.2;
      this.fadeSpeed = Math.random() * 0.003 + 0.002;
      this.hue = Math.random() > 0.3 ? 24 + Math.random() * 20 : 45; // Naranja-rojo fuego o dorado
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.015) * 0.5;
      this.opacity -= this.fadeSpeed;

      if (this.y < -10 || this.opacity <= 0) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 90%, 55%, ${this.opacity})`;
      ctx.shadowBlur = this.size * 3;
      ctx.shadowColor = `hsla(${this.hue}, 100%, 50%, 0.6)`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Ember());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================================================
// 4. GESTIÓN DEL ESTADO DEL JUGADOR (HUMANIDAD, HOGUERA, HUECO)
// ==========================================================================
const PlayerState = {
  humanities: 10,
  isHollow: false,
  bonfireKindleLevel: 1, // +1 (+10 Estus)
  estusCount: 10,

  toggleHollowState() {
    if (this.isHollow) {
      // Revertir estado Hueco a Humano gastando 1 humanidad
      if (this.humanities > 0) {
        this.humanities--;
        this.isHollow = false;
        soulsAudio.playBonfireLit();
        showNotification("Humanidad Restaurada: Has recuperado tu forma humana.");
      } else {
        showNotification("No tienes suficientes humanidades para revertir el estado Hueco.");
        return;
      }
    } else {
      // Pasar a Hueco
      this.isHollow = true;
      showNotification("Te has convertido en Hueco. Has perdido tu sintonía humana.");
    }
    this.updateUI();
  },

  kindleBonfire() {
    if (this.isHollow) {
      showNotification("Debes revertir el estado Hueco antes de poder avivar una hoguera.");
      return;
    }
    if (this.humanities <= 0) {
      showNotification("Necesitas al menos 1 Humanidad para avivar la llama de la hoguera.");
      return;
    }
    if (this.bonfireKindleLevel >= 3) {
      showNotification("Esta hoguera ya ha alcanzado su máximo avivado (+20 Frascos de Estus).");
      return;
    }

    this.humanities--;
    this.bonfireKindleLevel++;
    this.estusCount = this.bonfireKindleLevel === 2 ? 15 : 20;
    soulsAudio.playBonfireLit();
    triggerBonfireLitBanner();
    showNotification(`¡Hoguera Avivada! Nivel +${this.bonfireKindleLevel} (${this.estusCount} Frascos de Estus).`);
    this.updateUI();
  },

  restAtBonfire() {
    soulsAudio.playBonfireLit();
    triggerBonfireLitBanner();
    this.estusCount = this.bonfireKindleLevel * 5 + 5;
    showNotification(`Has descansado en la Hoguera. Frascos de Estus reabastecidos (${this.estusCount}).`);
    this.updateUI();
  },

  updateUI() {
    const humanityCountEl = document.getElementById('hud-humanity-count');
    const statusBadgeEl = document.getElementById('hud-status-badge');
    const bonfireKindleEl = document.getElementById('bonfire-kindle-status');
    const estusCountEl = document.getElementById('bonfire-estus-count');

    if (humanityCountEl) humanityCountEl.textContent = this.humanities.toString().padStart(2, '0');
    if (statusBadgeEl) {
      if (this.isHollow) {
        statusBadgeEl.textContent = 'Hueco';
        statusBadgeEl.className = 'status-badge status-hollow';
        document.body.classList.add('is-hollow');
      } else {
        statusBadgeEl.textContent = 'Humano';
        statusBadgeEl.className = 'status-badge status-human';
        document.body.classList.remove('is-hollow');
      }
    }

    if (bonfireKindleEl) bonfireKindleEl.textContent = `+${this.bonfireKindleLevel}`;
    if (estusCountEl) estusCountEl.textContent = `${this.estusCount} Frascos`;
  }
};

// ==========================================================================
// 5. RENDERIZADO DEL COMPENDIO Y FILTRADO DINÁMICO
// ==========================================================================
let currentFilter = 'all';
let searchQuery = '';

function renderCompendium() {
  const gridContainer = document.getElementById('compendium-grid');
  const countDisplay = document.getElementById('items-count');
  if (!gridContainer) return;

  const filtered = COMPENDIUM_DATA.filter(item => {
    const matchesCategory = currentFilter === 'all' || item.category === currentFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      item.name.toLowerCase().includes(query) ||
      item.epithet.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (item.covenant && item.covenant.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  if (countDisplay) {
    countDisplay.textContent = filtered.length;
  }

  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <p style="font-size: 2.5rem; margin-bottom: 1rem;">🕯️</p>
        <h3 style="font-family: var(--font-title); font-size: 1.5rem; color: var(--text-gold); margin-bottom: 0.5rem;">
          No se encontraron registros en el archivo
        </h3>
        <p>Ningún personaje, jefe o artículo coincide con «${searchQuery}».</p>
        <button class="btn-ds btn-outline-gold" style="margin-top: 1.5rem;" onclick="resetSearchFilters()">
          Restablecer Filtros
        </button>
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = filtered.map(item => {
    let badgeClass = 'badge-npc';
    if (item.category === 'bosses') badgeClass = 'badge-boss';
    if (item.category === 'items') badgeClass = 'badge-item';

    return `
      <article class="ds-card" data-id="${item.id}">
        <div class="card-media">
          <span class="card-badge ${badgeClass}">${item.categoryLabel}</span>
          <img 
            class="card-img" 
            src="${item.image}" 
            alt="${item.name}" 
            loading="lazy" 
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          />
          <div class="card-avatar-fallback" style="display: none;">
            <div class="avatar-glyph">${item.avatarIcon}</div>
            <div style="font-family: var(--font-serif); font-size: 0.8rem; letter-spacing: 0.15em;">${item.name}</div>
          </div>
          <div class="card-media-overlay"></div>
        </div>

        <div class="card-body">
          <div class="card-title-row">
            <h3 class="card-title">${item.name}</h3>
            <span class="card-subtitle">${item.epithet}</span>
          </div>

          <p class="card-description">${item.description}</p>

          <div class="card-quote">${item.quote}</div>

          <div class="card-meta-list">
            <div class="meta-item">
              <span class="meta-label">Ubicación / Origen:</span>
              <span class="meta-value">${item.location}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Pacto / Rol:</span>
              <span class="meta-value">${item.covenant || item.role}</span>
            </div>
          </div>

          <div class="card-footer">
            <button class="btn-inspect" onclick="openLoreModal('${item.id}')">
              <span>Examinar Lore & Detalles</span>
              <span>✦</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function resetSearchFilters() {
  currentFilter = 'all';
  searchQuery = '';
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === 'all');
  });

  renderCompendium();
}

// ==========================================================================
// 6. MODAL DE DETALLES Y LORE COMPLETO
// ==========================================================================
function openLoreModal(itemId) {
  soulsAudio.playStoneClick();
  const item = COMPENDIUM_DATA.find(i => i.id === itemId);
  if (!item) return;

  const modal = document.getElementById('lore-modal');
  const heroImg = document.getElementById('modal-hero-img');
  const tag = document.getElementById('modal-tag');
  const title = document.getElementById('modal-title');
  const subtitle = document.getElementById('modal-subtitle');
  const quote = document.getElementById('modal-quote');
  const loreText = document.getElementById('modal-lore-text');
  const statsContainer = document.getElementById('modal-stats-container');

  if (heroImg) {
    heroImg.src = item.image;
    heroImg.alt = item.name;
  }
  if (tag) tag.textContent = `${item.category.toUpperCase()} • ${item.categoryLabel}`;
  if (title) title.textContent = item.name;
  if (subtitle) subtitle.textContent = item.epithet;
  if (quote) quote.textContent = item.quote;
  if (loreText) loreText.textContent = item.fullLore;

  if (statsContainer && item.stats) {
    statsContainer.innerHTML = Object.entries(item.stats).map(([k, v]) => `
      <div class="modal-stat-box">
        <span class="modal-stat-label">${k}</span>
        <span class="modal-stat-val">${v}</span>
      </div>
    `).join('');
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLoreModal() {
  soulsAudio.playStoneClick();
  const modal = document.getElementById('lore-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ==========================================================================
// 7. BANNERS CINEMÁTICOS ("HAS MUERTO" & "HOGUERA ENCENDIDA")
// ==========================================================================
function triggerDeathScreen() {
  soulsAudio.playYouDied();
  const screen = document.getElementById('screen-you-died');
  if (screen) {
    screen.classList.add('active');
    setTimeout(() => {
      screen.classList.remove('active');
    }, 4500);
  }
}

function triggerBonfireLitBanner() {
  const screen = document.getElementById('screen-bonfire-lit');
  if (screen) {
    screen.classList.add('active');
    setTimeout(() => {
      screen.classList.remove('active');
    }, 2800);
  }
}

function showNotification(msg) {
  let toast = document.getElementById('souls-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'souls-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: rgba(15, 18, 25, 0.95);
      border: 1px solid var(--border-gold);
      color: var(--text-gold);
      padding: 0.85rem 1.4rem;
      border-radius: 4px;
      font-family: var(--font-serif);
      font-size: 0.9rem;
      letter-spacing: 0.08em;
      box-shadow: 0 10px 25px rgba(0,0,0,0.8), 0 0 15px rgba(223, 183, 108, 0.25);
      z-index: 3000;
      transition: all 0.35s ease;
      opacity: 0;
      transform: translateY(20px);
      max-width: 360px;
      line-height: 1.4;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, 4000);
}

// ==========================================================================
// 8. INICIALIZACIÓN DE EVENTOS DEL DOM
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar Canvas de Brasas
  initEmberParticles();

  // Inicializar UI de jugador
  PlayerState.updateUI();

  // Render inicial
  renderCompendium();

  // Barra de búsqueda
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderCompendium();
    });
  }

  // Píldoras de filtro por categoría
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      soulsAudio.playStoneClick();
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.dataset.filter;
      renderCompendium();
    });
  });

  // Botón de audio
  const audioBtn = document.getElementById('btn-audio-toggle');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      const isMuted = soulsAudio.toggleMute();
      audioBtn.innerHTML = isMuted 
        ? '<span>🔇</span><span>Silenciado</span>' 
        : '<span>🔊</span><span>Sonido Activo</span>';
    });
  }

  // Interacción de Humanidad (Alternar Humano / Hueco)
  const humanityWidget = document.getElementById('hud-humanity-widget');
  if (humanityWidget) {
    humanityWidget.addEventListener('click', () => {
      PlayerState.toggleHollowState();
    });
  }

  // Descansar en Hoguera (Hero & Widget)
  const btnRestBonfire = document.getElementById('btn-rest-bonfire');
  const btnHeroBonfire = document.getElementById('btn-hero-bonfire');
  if (btnRestBonfire) {
    btnRestBonfire.addEventListener('click', () => PlayerState.restAtBonfire());
  }
  if (btnHeroBonfire) {
    btnHeroBonfire.addEventListener('click', () => PlayerState.restAtBonfire());
  }

  // Avivar Hoguera
  const btnKindleBonfire = document.getElementById('btn-kindle-bonfire');
  if (btnKindleBonfire) {
    btnKindleBonfire.addEventListener('click', () => PlayerState.kindleBonfire());
  }

  // Probar Muerte ("YOU DIED")
  const btnTestDeath = document.getElementById('btn-test-death');
  if (btnTestDeath) {
    btnTestDeath.addEventListener('click', () => triggerDeathScreen());
  }

  // Cerrar pantallas cinemáticas al hacer clic
  const screenYouDied = document.getElementById('screen-you-died');
  if (screenYouDied) {
    screenYouDied.addEventListener('click', () => screenYouDied.classList.remove('active'));
  }
  const screenBonfireLit = document.getElementById('screen-bonfire-lit');
  if (screenBonfireLit) {
    screenBonfireLit.addEventListener('click', () => screenBonfireLit.classList.remove('active'));
  }

  // Cerrar Modal
  const btnCloseModal = document.getElementById('btn-close-modal');
  const modalOverlay = document.getElementById('lore-modal');
  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', closeLoreModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeLoreModal();
    });
  }

  // Tecla Escape para cerrar modales o pantallas
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLoreModal();
      if (screenYouDied) screenYouDied.classList.remove('active');
      if (screenBonfireLit) screenBonfireLit.classList.remove('active');
    }
  });
});
