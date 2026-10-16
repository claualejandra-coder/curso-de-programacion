/**
 * RESIDENT EVIL 7: BIOHAZARD - ARCHIVOS DE LA MANSIÓN BAKER
 * re7-app.js
 * Lógica interactiva: Base de datos de personajes, trajes y elementos,
 * sintetizador de audio retro/survival, monitor de pulso EKG y visor de expedientes
 */

// ==========================================================================
// 1. BASE DE DATOS DE RESIDENT EVIL 7 BIOHAZARD
// ==========================================================================
const RE7_DATA = [
  // --- PERSONAJES (CHARACTERS) ---
  {
    id: "ethan_winters",
    category: "characters",
    categoryLabel: "Protagonista / Superviviente",
    name: "Ethan Winters",
    epithet: "El Esposo Resuelto",
    avatarIcon: "👤",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    origin: "Los Ángeles, California",
    status: "Infectado por Moho (Asintomático)",
    weapon: "Pistola G17 & Sierra Mecánica",
    quote: "«Mia... ¿qué demonios te ha pasado? ¡Solo quería traerte de vuelta a casa!»",
    description: "Un civil ordinario que viaja a la apartada plantación de Dulvey, Luisiana, tras recibir un enigmático correo electrónico de su esposa desaparecida hace tres años.",
    fullLore: "A pesar de carecer de entrenamiento militar, Ethan demuestra una resistencia fisiológica asombrosa frente a las mutilaciones infligidas por la familia Baker. Gracias a la regeneración celular inducida inadvertidamente por el Mutamiceto (Moho) y los medicamentos curativos, sobrevive a la amputación de su mano izquierda, la cual le es reimplantada con grapas quirúrgicas y equipada con el reloj códec por Zoe.",
    stats: {
      "Papel": "Protagonista Principal",
      "Estado Biológico": "Infección Serie-E de bajo nivel",
      "Resistencia": "Regeneración celular celular milagrosa",
      "Destino": "Rescatado por Blue Umbrella"
    }
  },
  {
    id: "mia_winters",
    category: "characters",
    categoryLabel: "Custodia de B.O.W. / Esposa",
    name: "Mia Winters",
    epithet: "Agente Encubierta de The Connections",
    avatarIcon: "👩",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    origin: "Operativa de The Connections",
    status: "Infección de Alta Intensidad (Curable)",
    weapon: "Cuchillo de cocina & Motosierra",
    quote: "«¡Ethan, no deberías haber venido! Vete... ¡antes de que ella se dé cuenta de que estás aquí!»",
    description: "Trabajaba en secreto como guardia de transporte de la bio-arma Eveline a bordo del barco petrolero Annabelle. Tras el naufragio, cae bajo el control mental de la niña.",
    fullLore: "Ocultó su verdadera profesión a Ethan haciéndole creer que trabajaba como niñera. Durante el motín de Eveline en el Annabelle, grabó una cinta de vídeo despidiéndose de Ethan. En la Casa de Invitados de los Baker, alterna violentamente entre episodios de cordura y trances homicidas donde ataca a Ethan con una motosierra.",
    stats: {
      "Organización": "The Connections",
      "Misión Original": "Custodiar al sujeto Eveline (E-001)",
      "Elección del Jugador": "Inyectar el suero o abandonarla",
      "Supervivencia": "Canónica en Not a Hero / RE Village"
    }
  },
  {
    id: "jack_baker",
    category: "characters",
    categoryLabel: "Patriarca Infectado",
    name: "Jack Baker",
    epithet: "El Padre Inmortal",
    avatarIcon: "🪓",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    origin: "Plantación Dulvey, Luisiana",
    status: "Fusión Masiva con el Mutamiceto",
    weapon: "Pala, Rodillo con pinchos & Tijeras mecánicas",
    quote: "«¡Bienvenido a la familia, hijo! ¡A ver si eres capaz de encajar un buen derechazo!»",
    description: "Veterano del Cuerpo de Marines de EE.UU. y patriarca de los Baker. Antes del desastre era un padre amable y honorable, ahora convertido en un cazador sádico que no puede morir.",
    fullLore: "Acogió desinteresadamente a Mia y a Eveline tras el naufragio en el pantano en 2014, siendo la primera víctima de la manipulación mental de Eveline. Su cuerpo regenera extremidades decapitadas y sobrevive a disparos a quemarropa, atropellos en el garaje y explosiones, hasta que Ethan lo neutraliza temporalmente con el suero D-Serie.",
    stats: {
      "Fase 1": "Combate en el Garaje con automóvil",
      "Fase 2": "Duelo de Motosierras en la Morgue",
      "Fase 3": "Monstruosidad Gigante de Ojos del Cobertizo",
      "Debilidad": "Globos oculares amarillos en fase mutada"
    }
  },
  {
    id: "marguerite_baker",
    category: "characters",
    categoryLabel: "Matriarca / Reina Insecto",
    name: "Marguerite Baker",
    epithet: "La Dama del Enjambre",
    avatarIcon: "🦗",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    origin: "Vieja Casa del Pantano",
    status: "Nido Biológico Viviente",
    weapon: "Enjambres de avispas y ciempiés gigantes",
    quote: "«¡No toques eso, mocoso insolente! ¡He preparado esta cena con todo mi amor y respeto familiar!»",
    description: "La madre de la familia Baker, obsesionada con alimentar a sus 'huéspedes' con vísceras podridas y criaturas infestadas por el hongo mutante.",
    fullLore: "Marguerite sufrió intensos dolores de cabeza antes de que el moho colonizara sus órganos internos. Transformó la vieja casa del pantano en una colmena biológica y desarrolló un útero aberrante del cual engendra enjambres voraces. Durante su batalla en el invernadero, muta en una criatura insectoide con extremidades alargadas que trepa por paredes y techos.",
    stats: {
      "Zona de Acecho": "Vieja Casa e Invernadero",
      "Debilidad Crítica": "Fuego intenso (Lanzallamas / Quemador)",
      "Recompensa": "Linterna de Marguerite & Brazo Serie-D",
      "Ataque Distintivo": "Emboscar desde los conductos superiores"
    }
  },
  {
    id: "lucas_baker",
    category: "characters",
    categoryLabel: "Hijo Sádico / Ingeniero",
    name: "Lucas Baker",
    epithet: "El Maestro de los Juegos Mortales",
    avatarIcon: "🤡",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    origin: "Laboratorio de Investigación Subterráneo",
    status: "Inmunizado por The Connections",
    weapon: "Trampas de alambre, C4 & Cócteles Molotov",
    quote: "«¡Es una fiesta sorpresa, Ethan! ¡Las reglas son fáciles: tú juegas, y si fallas, te conviertes en ceniza!»",
    description: "Un psicópata con intelecto de inventor brillante. The Connections le suministró una vacuna que evitó el lavado de cerebro de Eveline mientras fingía seguir bajo su influjo.",
    fullLore: "Lucas convirtió la zona de pruebas de la hacienda en un laberinto sádico inspirado en juegos de acertijos macabros. Filmó la muerte del equipo de investigación 'Sewer Gators' y mantuvo un laboratorio clandestino transmitiendo datos a The Connections. Es finalmente abatido por Chris Redfield en la mina de sal durante el DLC Not a Hero.",
    stats: {
      "Coeficiente Intelectual": "Genio Mecánico Psicopático",
      "Minitrampa Emblemática": "Tarta de 'Feliz Cumpleaños'",
      "Destino Final": "Ejecutado por Chris Redfield",
      "Estado Mental": "Psicópata clínicamente diagnosticado"
    }
  },
  {
    id: "zoe_baker",
    category: "characters",
    categoryLabel: "Aliada / Hija Pródiga",
    name: "Zoe Baker",
    epithet: "La Voz del Teléfono",
    avatarIcon: "📱",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    origin: "Caravana del Patio Exterior",
    status: "Calcificación Parcial por Moho (Curada)",
    weapon: "Conocimiento Médico & Pistas telefónicas",
    quote: "«No confíes en nadie de esta casa, Ethan. Si quieres salir vivo de aquí, tendrás que seguir mis instrucciones al pie de la letra.»",
    description: "La hija menor de los Baker que logró resistir parcialmente el control mental de Eveline refugiándose en una caravana en el patio de la mansión.",
    fullLore: "Zoe asiste a Ethan guiándolo mediante teléfonos fijos distribuidos por la casa. Le proporciona la fórmula para sintetizar el suero de la Serie-D usando materiales biológicos del naufragio. Aunque Eveline la cristaliza en el pantano, su tío Joe Baker consigue un suero militar en el DLC End of Zoe logrando salvar su vida.",
    stats: {
      "Refugio": "Caravana en el jardín",
      "Aporte Vital": "Guía a Ethan y crea el Suero D",
      "Rescate Final": "Curada por Joe Baker y Umbrella",
      "Profesión Previa": "Estudiante y Diseñadora"
    }
  },
  {
    id: "eveline",
    category: "characters",
    categoryLabel: "B.O.W. Primaria (E-001)",
    name: "Eveline",
    epithet: "El Sujeto E-001 / La Niña del Moho",
    avatarIcon: "👧",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    origin: "Laboratorio Secreto de The Connections",
    status: "Arma Biológica Genéticamente Diseñada",
    weapon: "Control Mental, Alucinaciones & Ondas de Choque",
    quote: "«¿Por qué nadie me quiere? Solo quería una familia... ¿por qué me rechazan todos?»",
    description: "Un arma biológica creada hibridando un embrión humano con el genoma del Mutamiceto. Obsesionada compulsivamente con el concepto de tener una familia perfecta.",
    fullLore: "Diseñada para infiltrar poblaciones enemigas sin librar combate convencional, Eveline segrega micotoxinas que doblegan la voluntad de las personas. Debido a un defecto congénito en su diseño sin tratamiento regular, sufre de envejecimiento celular hiperacelerado: la 'anciana en silla de ruedas' que acecha a Ethan es en realidad la verdadera forma decrépita de Eveline.",
    stats: {
      "Nombre Clave": "E-001 (Proyecto Serie-E)",
      "Verdad Oculta": "Es la anciana en silla de ruedas",
      "Método de Aniquilación": "Inyección de Necrotoxina E",
      "Poder Máximo": "Galeón Mutado de Biomasa Oscura"
    }
  },
  {
    id: "chris_redfield",
    category: "characters",
    categoryLabel: "Capitán Táctico / Leyenda",
    name: "Chris Redfield",
    epithet: "El Veterano de Blue Umbrella",
    avatarIcon: "🛡️",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    origin: "BSAA / Operación Blue Umbrella",
    status: "Completamente Inmune / Equipo de Asalto",
    weapon: "Fusil Thor's Hammer & Pistola Albert-01",
    quote: "«Soy Chris Redfield. Me alegra haberte encontrado, Ethan. A partir de ahora nos encargamos nosotros.»",
    description: "Legendario exagente de S.T.A.R.S. y héroe antiterrorista que lidera un escuadrón de asalto para purgar la plantación Baker de la amenaza biológica.",
    fullLore: "Llega al rescate a bordo de un helicóptero de la reorganizada Blue Umbrella al final de la campaña principal, arrojando a Ethan el arma letal Albert-01 para terminar con Eveline. En el DLC Not a Hero, desciende en solitario a las minas de sal contaminadas para rescatar a sus soldados caídos y abatir definitivamente al esquivo Lucas Baker.",
    stats: {
      "Afiliación": "BSAA / Supervisión de Blue Umbrella",
      "Aparición Estelar": "DLC 'Not a Hero'",
      "Equipamiento": "Filtro de aire para esporas tóxicas",
      "Misión Cumplida": "Neutralización de The Connections en Dulvey"
    }
  },

  // --- TRAJES Y ASPECTOS (COSTUMES & VARIANTS) ---
  {
    id: "costume_ethan_civilian",
    category: "costumes",
    categoryLabel: "Atuendo de Protagonista",
    name: "Ropa Civil de Ethan Winters",
    epithet: "Vestimenta de Viajero Desesperado",
    avatarIcon: "👔",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    origin: "Diseño por Defecto de RE7",
    status: "Roto, manchado de sangre y lodo",
    weapon: "Reloj Códec en muñeca izquierda grapada",
    quote: "«Llegué buscando respuestas, y terminé con mi propia ropa empapada en sangre de pesadilla.»",
    description: "Camisa blanca arremangada con botones, camiseta gris interior y pantalones de mezclilla. Luce las grapas quirúrgicas en la muñeca donde su mano fue cercenada.",
    fullLore: "Este diseño refleja la naturaleza común de Ethan frente a otros héroes sobrehumanos de la saga como Leon o Chris. A lo largo del juego, la prenda sufre rasgaduras visibles, quemaduras por ácido y salpicaduras de Mutamiceto negro.",
    stats: {
      "Detalle Clave": "Grapas metálicas en la muñeca izquierda",
      "Accesorio": "Smartwatch con monitor de ritmo cardíaco",
      "Evolución": "Se ensucia progresivamente en el pantano",
      "Estilo": "Supervivencia realista en primera persona"
    }
  },
  {
    id: "costume_mia_possessed",
    category: "costumes",
    categoryLabel: "Aspecto Corrupto",
    name: "Mia: Posesión por Mutamiceto",
    epithet: "La Máscara Negra del Horror",
    avatarIcon: "🧟‍♀️",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    origin: "Casa de Huéspedes de los Baker",
    status: "Venación necrótica facial y ojos desorbitados",
    weapon: "Motosierra eléctrica de mano",
    quote: "«¡No puedes salvarme, Ethan! ¡Nadie puede escapar de su llamada!»",
    description: "Vestido blanco desgastado y deshilachado con venas negras sobresaliendo por su rostro y brazos debido a la colonización fúngica de Eveline.",
    fullLore: "Cuando Eveline toma el control mental de Mia, su semblante tierno se deforma en una expresión desquiciada con voz distorsionada y fuerza muscular sobrehumana capaz de levantar a Ethan por el aire e incrustarlo contra la pared.",
    stats: {
      "Momento Clave": "Prólogo de la Casa de Invitados",
      "Arma Portada": "Motosierra de arranque rápido",
      "Rasgo Visual": "Piel cenicienta con ramificaciones fúngicas",
      "Comportamiento": "Ataques en ráfagas frenéticas impredecibles"
    }
  },
  {
    id: "costume_jack_chainsaw",
    category: "costumes",
    categoryLabel: "Atuendo de Jefe de Duelo",
    name: "Jack: Duelo de la Morgue",
    epithet: "El Carnicero con Tijeras Colosales",
    avatarIcon: "✂️",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    origin: "Morgue del Sótano de la Mansión",
    status: "Cráneo semidestrozado por disparos previos",
    weapon: "Tijera / Motosierra mecánica quirúrgica",
    quote: "«¡Una motosierra para ti y otra para mí! ¡A ver quién corta más fino, chaval!»",
    description: "Pantalones de faena con tirantes y camisa a cuadros desabotonada, empuñando una descomunal pinza motorizada creada con dos sierras mecánicas unidas.",
    fullLore: "Tras ser baleado y atropellado en el garaje, Jack reaparece en el sótano con la mitad de la cabeza abierta mostrando tejido biológico negro en regeneración continua, protagonizando uno de los combates cuerpo a cuerpo más tensos del videojuego.",
    stats: {
      "Encuentro": "Batalla por la Llave del Relieve del Perro",
      "Arma Homicida": "Tijeras-motosierra articuladas",
      "Resistencia": "Inmune a balas comunes de pistola",
      "Mecánica": "Duelo directo de motosierras con Ethan"
    }
  },
  {
    id: "costume_chris_tactical",
    category: "costumes",
    categoryLabel: "Equipamiento Militar",
    name: "Chris: Traje Táctico Blue Umbrella",
    epithet: "Vanguardia de Contención Biológica",
    avatarIcon: "🪖",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    origin: "Operación 'Not a Hero' en Dulvey",
    status: "Blindaje Pesado y Máscara Antigás con HUD",
    weapon: "Escopeta de Asalto Thor's Hammer",
    quote: "«El pasado de Umbrella no se borra con un cambio de color, pero no permitiré que más inocentes mueran.»",
    description: "Uniforme militar de camuflaje urbano con chaleco balístico antibalas, comunicador satelital de muñeca y casco con visor táctico de visión térmica.",
    fullLore: "El rediseño visual de Chris en RE7 priorizó el realismo militar y la agilidad táctica. Equipado con un respirador con filtros de grado militar, Chris puede adentrarse en cámaras saturadas de esporas mortales de Moho que asfixiarían a un civil en cuestión de segundos.",
    stats: {
      "Protección": "Respirador presurizado contra Mutamiceto",
      "Visor": "HUD digital con estado de oxígeno y munición",
      "Habilidad Física": "Golpe demoledor de puño recargado",
      "Misión": "Capturar a Lucas Baker con vida"
    }
  },

  // --- ELEMENTOS, ÍTEMS Y RELIQUIAS (ITEMS & RELICS) ---
  {
    id: "item_codec_watch",
    category: "items",
    categoryLabel: "Dispositivo Biométrico",
    name: "Reloj Códec Biométrico",
    epithet: "El Monitor Vital de Dulvey",
    avatarIcon: "⌚",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    origin: "Entregado y colocado por Zoe Baker",
    status: "Monitor LCD operativo",
    weapon: "Indicador de Puntos de Salud y Pulso",
    quote: "«Mira tu muñeca izquierda. Ese reloj te dirá cuánto te queda de vida antes de desmoronarte.»",
    description: "Un smartwatch táctico que mide constantemente la frecuencia cardíaca y la integridad celular del portador mediante tres estados: FINE, CAUTION y DANGER.",
    fullLore: "Zoe le coloca este dispositivo a Ethan inmediatamente después de reimplantarle la mano cortada. Es la representación diegética del menú de salud clásico de Resident Evil en primera persona, eliminando la necesidad de barras de vida artificiales en la pantalla.",
    stats: {
      "Estado FINE": "Luz verde (Salud 100% - 66%)",
      "Estado CAUTION": "Luz ámbar (Salud 65% - 25%)",
      "Estado DANGER": "Luz roja intermitente (Salud < 25%)",
      "Ubicación": "Muñeca izquierda del jugador"
    }
  },
  {
    id: "item_first_aid_med",
    category: "items",
    categoryLabel: "Medicina de Supervivencia",
    name: "Medicamento de Primeros Auxilios",
    epithet: "El Bálsamo Fúngico Regenerativo",
    avatarIcon: "🧪",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    origin: "Hierba Verde + Fluido Químico",
    status: "Solución farmacéutica de aplicación tópica",
    weapon: "Restauración instantánea de salud",
    quote: "«Vierte este líquido sobre tu carne herida. Duele como el infierno, pero une la carne rota como pegamento.»",
    description: "Una botella de cristal con dosificador que contiene una mezcla curativa altamente concentrada capaz de soldar extremidades amputadas y sanar desgarros.",
    fullLore: "Al combinarse una Hierba Verde con Fluido Químico común se obtiene el Medicamento regular. Si se utiliza Fluido Químico Fuerte, se crea el Medicamento Fuerte que restaura el 100% de la salud de Ethan al instante.",
    stats: {
      "Receta": "1x Hierba Verde + 1x Fluido Químico",
      "Efecto": "Restaura 75% de salud al derramarlo sobre el brazo",
      "Capacidad Máxima": "Se apila hasta 3 unidades por casilla",
      "Curiosidad": "Capaz de regenerar piernas cortadas por Jack"
    }
  },
  {
    id: "item_vhs_tapes",
    category: "items",
    categoryLabel: "Metraje Encontrado",
    name: "Cintas de Vídeo VHS",
    epithet: "Los Ecos de las Víctimas Pasadas",
    avatarIcon: "📼",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    origin: "Videocassettes dispersos por la casa",
    status: "Grabaciones analógicas de metraje encontrado",
    weapon: "Pistas cruciales para resolver enigmas",
    quote: "«Insertar la cinta te permite vivir los últimos momentos de aquellos que pisaron esta pesadilla antes que tú.»",
    description: "Cintas de vídeo magnéticas reproducibles en viejas televisiones CRT que permiten al jugador controlar a otros personajes en flashbacks jugables.",
    fullLore: "Existen 4 cintas principales en la aventura: 'Grabación de la Casa Derruida' (con los Sewer Gators), 'Mia' (evitando a Marguerite), 'Feliz Cumpleaños' (el mortal acertijo de Lucas) y '21' (el juego de cartas sádico en el DLC Banned Footage).",
    stats: {
      "Cinta 1": "Grabación de la Casa Abandonada (Clancy)",
      "Cinta 2": "Mia (Huida en la Casa Vieja)",
      "Cinta 3": "Feliz Cumpleaños (La trampa de Lucas)",
      "Utilidad": "Aprender soluciones a trampas antes de vivirlas"
    }
  },
  {
    id: "item_antique_coins",
    category: "items",
    categoryLabel: "Coleccionable / Divisa",
    name: "Monedas Antiguas (Antique Coins)",
    epithet: "El Tributo de las Jaulas de Pájaros",
    avatarIcon: "🪙",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    origin: "Ocultas en cajones, jarrones y ceniceros",
    status: "Monedas de bronce desgastadas",
    weapon: "Desbloqueo de jaulas de pájaros de contrabando",
    quote: "«Tres monedas para el esteroide, cinco para el estabilizador... y nueve para la Magnum 44.»",
    description: "Monedas antiguas esparcidas por la propiedad que se depositan en jaulas de pájaro en las salas de guardado para obtener mejoras definitivas.",
    fullLore: "En la dificultad Fácil y Normal existen 18 monedas; en dificultad 'Manicomio' (Madhouse) hay 33 monedas con ubicaciones completamente cambiadas que aumentan drásticamente el desafío de supervivencia.",
    stats: {
      "Recompensa 1 (3 monedas)": "Esteroides (Aumento permanente de PS máxima)",
      "Recompensa 2 (5 monedas)": "Estabilizador (Velocidad de recarga acelerada)",
      "Recompensa 3 (9 monedas)": "Magnum 44 con munición perforante",
      "Total en Normal": "18 Monedas coleccionables"
    }
  },

  // --- ARMAS Y HERRAMIENTAS (WEAPONS & TOOLS) ---
  {
    id: "weapon_albert_01",
    category: "weapons",
    categoryLabel: "Arma Anti-B.O.W. Definitiva",
    name: "Pistola Albert-01R",
    epithet: "El Legado de Wesker",
    avatarIcon: "🔫",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    origin: "Diseño Samurai Edge modificado por Blue Umbrella",
    status: "Balas perforantes anti-micelio de 9mm",
    weapon: "Capacidad para 3 disparos de alto calibre",
    quote: "«¡Usa esto, Ethan! ¡Acaba con ella de una vez por todas!»",
    description: "Una variante ultramoderna de la mítica pistola personalizada de Albert Wesker, arrojada por Chris Redfield durante la batalla final contra Eveline.",
    fullLore: "Cargada con munición especial imbuida de toxinas de neutralización celular, esta pistola destruye el tejido del Mutamiceto en segundos. Al completar el juego por primera vez en cualquier dificultad, se desbloquea la réplica Albert-01R para partidas posteriores.",
    stats: {
      "Capacidad": "3 balas en cargador",
      "Potencia": "Equivalente al triple de una escopeta estándar",
      "Desbloqueo": "Finalizar el juego en cualquier dificultad",
      "Efecto": "Derriba holomorfos de un único disparo certero"
    }
  },
  {
    id: "weapon_burner",
    category: "weapons",
    categoryLabel: "Arma de Fabricación Casera",
    name: "El Quemador (Lanzallamas)",
    epithet: "El Exterminador del Nido",
    avatarIcon: "🔥",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80",
    origin: "Boquilla del Quemador + Empuñadura en la Vieja Casa",
    status: "Combustible de Gasolina Líquida + Combustible Sólido",
    weapon: "Chorros continuos de fuego a presión",
    quote: "«El moho odia el calor extremo. Quema los nidos de insectos de Marguerite antes de que te devoren vivo.»",
    description: "Un lanzallamas artesanal construido ensamblando una boquilla de fontanería y una bombona de gas comprimido encontrada en la casa del pantano.",
    fullLore: "Es el arma obligatoria para atravesar la Vieja Casa infestada de avispas y arañas monstruosas. Permite despejar puertas selladas con colmenas y resulta demoledora contra Marguerite Baker debido a la extrema inflamabilidad del hongo.",
    stats: {
      "Ensamblaje": "Boquilla + Empuñadura del Quemador",
      "Combustible": "Combustible para quemador (Fluido químico + Gasolina)",
      "Capacidad": "Hasta 100 unidades de combustible",
      "Uso Táctico": "Purga de nidos y aturdimiento de Marguerite"
    }
  },
  {
    id: "weapon_m37_shotgun",
    category: "weapons",
    categoryLabel: "Arma de Escopeta Clásica",
    name: "Escopeta M37 de Corredera",
    epithet: "El Rompecráneos del Garaje",
    avatarIcon: "💥",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
    origin: "Salón de la Mansión (Acertijo de la Escopeta Rota)",
    status: "Cartuchos de perdigones de calibre 12",
    weapon: "Capacidad para 4 cartuchos en recámara",
    quote: "«Si un Holomorfo se acerca demasiado, apunta a la cabeza y aprieta el gatillo sin pestañear.»",
    description: "La clásica escopeta de supervivencia que se obtiene resolviendo el puzle de la estatua que sostiene el arma, reemplazándola con una escopeta de madera o averiada.",
    fullLore: "En combate cerrado, un cartucho bien dirigido a la masa negra informe de los 'Molded' (Holomorfos) desintegra su cabeza de un solo impacto, impidiendo que sigan regenerándose.",
    stats: {
      "Capacidad": "4 cartuchos",
      "Acertijo Asociado": "Estatua del pedestal en el vestíbulo",
      "Mejora Alternativa": "Escopeta M21 de dos cañones (reparable con kit)",
      "Eficacia": "Máxima a corta distancia"
    }
  },
  {
    id: "weapon_chainsaw",
    category: "weapons",
    categoryLabel: "Herramienta de Duelo",
    name: "Motosierra de Doble Mango",
    epithet: "El Desmembrador de la Morgue",
    avatarIcon: "⚙️",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
    origin: "Sótano de la Morgue (Exclusiva de Batalla de Jefe)",
    status: "Motor de gasolina de alto caballaje",
    weapon: "Corte continuo horizontal, vertical y estocada",
    quote: "«¡Tú y yo, Ethan! ¡Arráncala si te atreves y demuéstrame lo que tienes en las venas!»",
    description: "Una motosierra pesada con agarre ergonómico que Ethan encuentra para medirse cara a cara en un duelo visceral contra Jack Baker.",
    fullLore: "Posee una función especial de 'bloqueo' cruzando la hoja giratoria para detener los arremetidas demoledoras de Jack, además de un empuje de perforación directo hacia adelante que desgarra la carne infectada.",
    stats: {
      "Aparición": "Combate contra Jack Baker en la Morgue",
      "Movimiento Especial": "Ataque de perforación con L2 + R2",
      "Mecánica Defensiva": "Bloqueo directo de motosierra",
      "Destino": "Se descompone tras vencer al jefe"
    }
  }
];

// ==========================================================================
// 2. SISTEMA DE AUDIO SINTETIZADO (WEB AUDIO API RETRO SURVIVAL)
// ==========================================================================
class BiohazardAudioSystem {
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

  // Beep de pulso cardíaco del reloj códec
  playEkgBeep(state = 'fine') {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    let freq = 880; // A5 (Fine)
    if (state === 'caution') freq = 659.25; // E5
    if (state === 'danger') freq = 440; // A4

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  // Sonido de inserción mecánica de cinta VHS
  playVhsTapeSound() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Motor mecánico
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.35);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.42);
  }

  // Sonido de golpe dramático "Bienvenido a la familia"
  playJackPunchSound() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.5);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.75);
  }

  // Clic de menú survival
  playMenuClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }
}

const bioAudio = new BiohazardAudioSystem();

// ==========================================================================
// 3. CANVAS DE ESPORAS Y CENIZAS DEL MUTAMICETO (MOLD)
// ==========================================================================
function initMoldSpores() {
  const canvas = document.getElementById('mold-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const sporeCount = 55;
  const spores = [];

  class Spore {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2.2 + 0.8;
      this.speedY = Math.random() * 0.7 + 0.25;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.opacity = Math.random() * 0.55 + 0.15;
      this.fadeSpeed = Math.random() * 0.002 + 0.001;
      this.isToxic = Math.random() > 0.4;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.02) * 0.4;
      this.opacity -= this.fadeSpeed;

      if (this.y < -10 || this.opacity <= 0) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.isToxic 
        ? `rgba(112, 224, 0, ${this.opacity})` 
        : `rgba(255, 183, 3, ${this.opacity * 0.8})`;
      ctx.shadowBlur = this.size * 2;
      ctx.shadowColor = this.isToxic ? '#38b000' : '#fb8500';
      ctx.fill();
    }
  }

  for (let i = 0; i < sporeCount; i++) {
    spores.push(new Spore());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < spores.length; i++) {
      spores[i].update();
      spores[i].draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================================================
// 4. CONTROL DEL SMARTWATCH BIOMÉTRICO (ESTADO FINE / CAUTION / DANGER)
// ==========================================================================
const EkgMonitor = {
  states: ['fine', 'caution', 'danger'],
  currentIndex: 0,
  antiqueCoins: 18,

  toggleHealth() {
    this.currentIndex = (this.currentIndex + 1) % this.states.length;
    const currentState = this.states[this.currentIndex];
    bioAudio.playEkgBeep(currentState);
    this.updateUI();

    const labelMap = {
      fine: 'Salud Óptima (FINE)',
      caution: 'Herido (CAUTION) - Considera usar un Medicamento',
      danger: 'Peligro Crítico (DANGER) - Salud por debajo del 25%'
    };
    showToast(`Smartwatch Códec: ${labelMap[currentState]}`);
  },

  updateUI() {
    const textEl = document.getElementById('ekg-status-text');
    const pulseEl = document.getElementById('ekg-pulse-line');
    const currentState = this.states[this.currentIndex];

    if (textEl) {
      textEl.textContent = currentState.toUpperCase();
      textEl.className = `ekg-status-text status-${currentState}`;
    }

    if (pulseEl) {
      if (currentState === 'fine') {
        pulseEl.style.backgroundColor = 'var(--toxic-bright)';
        pulseEl.style.animationDuration = '1.4s';
      } else if (currentState === 'caution') {
        pulseEl.style.backgroundColor = 'var(--bio-amber)';
        pulseEl.style.animationDuration = '0.9s';
      } else if (currentState === 'danger') {
        pulseEl.style.backgroundColor = 'var(--blood-bright)';
        pulseEl.style.animationDuration = '0.45s';
      }
    }
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

  const filtered = RE7_DATA.filter(item => {
    const matchesCategory = currentFilter === 'all' || item.category === currentFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query ||
      item.name.toLowerCase().includes(query) ||
      item.epithet.toLowerCase().includes(query) ||
      item.origin.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (item.weapon && item.weapon.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  if (countDisplay) {
    countDisplay.textContent = filtered.length;
  }

  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <p style="font-size: 2.5rem; margin-bottom: 1rem;">📼</p>
        <h3 style="font-family: var(--font-title); font-size: 1.5rem; color: var(--toxic-bright); margin-bottom: 0.5rem; text-transform: uppercase;">
          Registro no encontrado en las cintas de la mansión
        </h3>
        <p>No se hallaron coincidencias para «${searchQuery}».</p>
        <button class="btn-re7 btn-vhs-outline" style="margin-top: 1.5rem;" onclick="resetSearchFilters()">
          Restablecer Filtros
        </button>
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = filtered.map(item => {
    let badgeClass = 'badge-character';
    if (item.category === 'costumes') badgeClass = 'badge-costume';
    if (item.category === 'items') badgeClass = 'badge-item';
    if (item.category === 'weapons') badgeClass = 'badge-weapon';

    return `
      <article class="re7-card" data-id="${item.id}">
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
            <div style="font-family: var(--font-vhs); font-size: 0.8rem; letter-spacing: 0.15em;">${item.name}</div>
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
              <span class="meta-value">${item.origin}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Armamento / Rol:</span>
              <span class="meta-value">${item.weapon}</span>
            </div>
          </div>

          <div class="card-footer">
            <button class="btn-inspect" onclick="openLoreModal('${item.id}')">
              <span>Examinar Expediente</span>
              <span>☣</span>
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
// 6. MODAL DE EXPEDIENTE CONFIDENCIAL
// ==========================================================================
function openLoreModal(itemId) {
  bioAudio.playMenuClick();
  const item = RE7_DATA.find(i => i.id === itemId);
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
  if (tag) tag.textContent = `EXPEDIENTE DULVEY • ${item.categoryLabel}`;
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
  bioAudio.playMenuClick();
  const modal = document.getElementById('lore-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ==========================================================================
// 7. CINEMÁTICAS & NOTIFICACIONES TOAST
// ==========================================================================
function triggerBakerPunch() {
  bioAudio.playJackPunchSound();
  const screen = document.getElementById('screen-baker-punch');
  if (screen) {
    screen.classList.add('active');
    setTimeout(() => {
      screen.classList.remove('active');
    }, 3800);
  }
}

function playTapePrompt(tapeTitle) {
  bioAudio.playVhsTapeSound();
  showToast(`📼 Reproduciendo cinta: «${tapeTitle}»...`);
}

function showToast(msg) {
  let toast = document.getElementById('bio-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'bio-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: rgba(8, 12, 10, 0.95);
      border: 1px solid var(--toxic-green);
      color: var(--toxic-bright);
      padding: 0.85rem 1.4rem;
      border-radius: 4px;
      font-family: var(--font-vhs);
      font-size: 0.85rem;
      letter-spacing: 0.08em;
      box-shadow: 0 10px 25px rgba(0,0,0,0.9), 0 0 15px rgba(56, 176, 0, 0.3);
      z-index: 3000;
      transition: all 0.3s ease;
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
// 8. INICIALIZACIÓN
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Iniciar esporas
  initMoldSpores();

  // Iniciar EKG
  EkgMonitor.updateUI();

  // Render inicial
  renderCompendium();

  // Buscador en tiempo real
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderCompendium();
    });
  }

  // Filtros por categoría
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      bioAudio.playMenuClick();
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.dataset.filter;
      renderCompendium();
    });
  });

  // Toggle de salud en Smartwatch EKG
  const ekgWidget = document.getElementById('ekg-widget');
  if (ekgWidget) {
    ekgWidget.addEventListener('click', () => {
      EkgMonitor.toggleHealth();
    });
  }

  // Toggle de audio
  const audioBtn = document.getElementById('btn-audio-toggle');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      const isMuted = bioAudio.toggleMute();
      audioBtn.innerHTML = isMuted 
        ? '<span>🔇</span><span>Silenciado</span>' 
        : '<span>🔊</span><span>Sonido Activo</span>';
    });
  }

  // Botón "Bienvenido a la familia" (Hero)
  const btnBakerPunch = document.getElementById('btn-baker-punch');
  if (btnBakerPunch) {
    btnBakerPunch.addEventListener('click', triggerBakerPunch);
  }

  // Cerrar pantalla cinemática al hacer clic
  const screenBakerPunch = document.getElementById('screen-baker-punch');
  if (screenBakerPunch) {
    screenBakerPunch.addEventListener('click', () => screenBakerPunch.classList.remove('active'));
  }

  // Cerrar modal
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

  // Escape para salir de modales
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLoreModal();
      if (screenBakerPunch) screenBakerPunch.classList.remove('active');
    }
  });
});
