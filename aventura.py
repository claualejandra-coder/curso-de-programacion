while True:
    print("============================================================")
    print("       ODISEA EN LA ESTACION ASTRA")
    print("============================================================")
    print("Eres el capitan de la nave Astra. Te despiertas tras escuchar")
    print("una alarma de emergencia. La nave esta perdiendo energia.")
    print()

    # NIVEL 1
    print("--- NIVEL 1 ---")
    print("¿Que haces en el puente de mando?")
    print("Opciones: REPARAR, ESCANEAR, EVACUAR, SILENCIAR")
    p1 = input("> ").lower()
    
    while p1 not in ["reparar", "escanear", "evacuar", "silenciar"]:
        print("Opcion no valida. Intentelo de nuevo.")
        p1 = input("> ").lower()

    if p1 == "reparar":
        print()
        print("Reparas los fusibles y vuelve la energia.")
        
        # NIVEL 2
        print("--- NIVEL 2 ---")
        print("El radar detecta un objeto acercandose muy rapido.")
        print("Opciones: ESCUDO, MANIOBRAR, COMUNICAR, PROYECTIL")
        p2 = input("> ").lower()
        
        while p2 not in ["escudo", "maniobrar", "comunicar", "proyectil"]:
            print("Opcion no valida. Intentelo de nuevo.")
            p2 = input("> ").lower()

        if p2 == "escudo":
            print()
            print("Activas el escudo. Un asteroide choca pero no te hace daño.")
            
            # NIVEL 3
            print("--- NIVEL 3 ---")
            print("El asteroide tenia cristales brillantes pegados.")
            print("Opciones: RECOLECTAR, ANALIZAR, DESTRUIR, IGNORAR")
            p3 = input("> ").lower()
            
            while p3 not in ["recolectar", "analizar", "destruir", "ignorar"]:
                print("Opcion no valida. Intentelo de nuevo.")
                p3 = input("> ").lower()

            if p3 == "analizar":
                print()
                print("El escaner dice que los cristales son energia pura.")
                
                # NIVEL 4
                print("--- NIVEL 4 ---")
                print("¿Donde usas la energia de los cristales?")
                print("Opciones: HYPERIMPULSO, ARMAS, SENSORES, BATERIAS")
                p4 = input("> ").lower()
                
                while p4 not in ["hyperimpulso", "armas", "sensores", "baterias"]:
                    print("Opcion no valida. Intentelo de nuevo.")
                    p4 = input("> ").lower()

                if p4 == "hyperimpulso":
                    print()
                    print("El hyperimpulso te lleva a otro sistema solar.")
                    
                    # NIVEL 5
                    print("--- NIVEL 5 ---")
                    print("Encuentras cuatro planetas diferentes.")
                    print("Opciones: PLANETA_ROJO, PLANETA_AZUL, PLANETA_VERDE, PLANETA_DORADO")
                    p5 = input("> ").lower()
                    
                    while p5 not in ["planeta_rojo", "planeta_azul", "planeta_verde", "planeta_dorado"]:
                        print("Opcion no valida. Intentelo de nuevo.")
                        p5 = input("> ").lower()

                    if p5 == "planeta_azul":
                        print()
                        print("Aterrizas en un planeta con agua y plataformas flotantes.")
                        
                        # NIVEL 6
                        print("--- NIVEL 6 ---")
                        print("Un alienigena sale a tu encuentro.")
                        print("Opciones: SALUDAR, DISPARAR, REGALO, OFRECER_PAZ")
                        p6 = input("> ").lower()
                        
                        while p6 not in ["saludar", "disparar", "regalo", "ofrecer_paz"]:
                            print("Opcion no valida. Intentelo de nuevo.")
                            p6 = input("> ").lower()

                        if p6 == "ofrecer_paz":
                            print()
                            print("El alienigena se pone contento y te lleva a su ciudad.")
                            
                            # NIVEL 7
                            print("--- NIVEL 7 ---")
                            print("El lider alienigena te quiere dar un regalo.")
                            print("Opciones: ACEPTAR, RECHAZAR, INTERCAMBIAR, EXAMINAR")
                            p7 = input("> ").lower()
                            
                            while p7 not in ["aceptar", "rechazar", "intercambiar", "examinar"]:
                                print("Opcion no valida. Intentelo de nuevo.")
                                p7 = input("> ").lower()

                            if p7 == "aceptar":
                                print()
                                print("Te dan un mapa para volver a la Tierra.")
                                
                                # NIVEL 8
                                print("--- NIVEL 8 ---")
                                print("De regreso a casa, unos piratas espaciales te siguen.")
                                print("Opciones: COMBATIR, CAMUFLAR, NEGOCIAR, ESCAPAR")
                                p8 = input("> ").lower()
                                
                                while p8 not in ["combatir", "camuflar", "negociar", "escapar"]:
                                    print("Opcion no valida. Intentelo de nuevo.")
                                    p8 = input("> ").lower()

                                if p8 == "camuflar":
                                    print()
                                    print("Te camuflas y los piratas se van de largo.")
                                    
                                    # NIVEL 9
                                    print("--- NIVEL 9 ---")
                                    print("Llegas a la Tierra pero piden clave de acceso.")
                                    print("Opciones: TRANSMITIR, FORZAR, PEDIR_AUXILIO, ESPERAR")
                                    p9 = input("> ").lower()
                                    
                                    while p9 not in ["transmitir", "forzar", "pedir_auxilio", "esperar"]:
                                        print("Opcion no valida. Intentelo de nuevo.")
                                        p9 = input("> ").lower()

                                    if p9 == "transmitir":
                                        print()
                                        print("Mandas la clave y la base la acepta.")
                                        
                                        # NIVEL 10
                                        print("--- NIVEL 10 ---")
                                        print("¿Donde quieres estacionar la nave?")
                                        print("Opciones: BASE_LUNAR, PUERTO_CENTRAL, ESTACION_ORBITAL, ATERRIZAJE_DIRECTO")
                                        p10 = input("> ").lower()
                                        
                                        while p10 not in ["base_lunar", "puerto_central", "estacion_orbital", "aterrizaje_directo"]:
                                            print("Opcion no valida. Intentelo de nuevo.")
                                            p10 = input("> ").lower()

                                        if p10 == "puerto_central":
                                            print()
                                            print("==================================================")
                                            print("¡GANASTE EL JUEGO! Llegaste a salvo a la Tierra.")
                                            print("==================================================")
                                        elif p10 == "base_lunar":
                                            print()
                                            print("Te quedas atascado en la luna. Perdiste.")
                                        elif p10 == "estacion_orbital":
                                            print()
                                            print("La estacion explota por un fallo. Perdiste.")
                                        elif p10 == "aterrizaje_directo":
                                            print()
                                            print("La nave se quema en la atmosfera. Perdiste.")

                                    elif p9 == "forzar":
                                        print()
                                        print("Te disparan por intentar entrar a la fuerza. Perdiste.")
                                    elif p9 == "pedir_auxilio":
                                        print()
                                        print("Nadie responde y te quedas sin gasolina. Perdiste.")
                                    elif p9 == "esperar":
                                        print()
                                        print("Te cae un meteorito mientras esperas. Perdiste.")

                                elif p8 == "combatir":
                                    print()
                                    print("Los piratas tienen mejores armas y te destruyen. Perdiste.")
                                elif p8 == "negociar":
                                    print()
                                    print("Los piratas te roban la nave. Perdiste.")
                                elif p8 == "escapar":
                                    print()
                                    print("El motor explota por ir muy rapido. Perdiste.")

                            elif p7 == "rechazar":
                                print()
                                print("El lider se enoja y te saca de su planeta. Perdiste.")
                            elif p7 == "intercambiar":
                                print()
                                print("Se pelean por el cambio de cosas. Perdiste.")
                            elif p7 == "examinar":
                                print()
                                print("Pensaron que les ibas a robar y te atrapan. Perdiste.")

                        elif p6 == "saludar":
                            print()
                            print("El alienigena se asusta y te ataca. Perdiste.")
                        elif p6 == "disparar":
                            print()
                            print("Todos los alienigenas te atacan. Perdiste.")
                        elif p6 == "regalo":
                            print()
                            print("El regalo los enferma y te encierran. Perdiste.")

                    elif p5 == "planeta_rojo":
                        print()
                        print("El planeta tiene mucho calor y se derrite la nave. Perdiste.")
                    elif p5 == "planeta_verde":
                        print()
                        print("Unas plantas gigantes rompen la nave. Perdiste.")
                    elif p5 == "planeta_dorado":
                        print()
                        print("El sol te ciega y chocas contra las rocas. Perdiste.")

                elif p4 == "armas":
                    print()
                    print("Se explotan los cañones por tanta energia. Perdiste.")
                elif p4 == "sensores":
                    print()
                    print("Atraes a un monstruo espacial gigante. Perdiste.")
                elif p4 == "baterias":
                    print()
                    print("Las baterias se queman. Perdiste.")

            elif p3 == "recolectar":
                print()
                print("Te da una descarga electrica al tocar los cristales. Perdiste.")
            elif p3 == "destruir":
                print()
                print("Los cristales explotan y rompen la nave. Perdiste.")
            elif p3 == "ignorar":
                print()
                print("Los cristales crecen y aplastan la nave. Perdiste.")

        elif p2 == "maniobrar":
            print()
            print("Chocas contra otra piedra espacial. Perdiste.")
        elif p2 == "comunicar":
            print()
            print("El asteroide no habla y te choca. Perdiste.")
        elif p2 == "proyectil":
            print()
            print("La piedra se rompe en trozos y perforan la nave. Perdiste.")

    elif p1 == "escanear":
        print()
        print("Te quedas sin bateria por escanear. Perdiste.")
    elif p1 == "evacuar":
        print()
        print("Te tiras al espacio solo en la capsula. Perdiste.")
    elif p1 == "silenciar":
        print()
        print("La nave explota porque no arreglaste la falla. Perdiste.")
        
    # REINICIO
    print()
    print("------------------------------------------------------------")
    reiniciar = input("¿Quieres volver a jugar desde el inicio? (SI / NO): ").lower()
    if reiniciar != "si":
        print("Fin del juego. ¡Gracias por jugar!")
        break
    print("\n\n")