
cesta_productos = []
cesta_precios = []


def agregar_elemento():
    print("\n--- ¡VAMOS A AGREGAR ALGO A LA CESTA! ---")
    nombre = input("¿Que producto quieres llevar hoy?: ")
    precio = float(input("¿Cual es el precio de este producto?: "))

    cesta_productos.append(nombre)
    cesta_precios.append(precio)

    print("¡Listo! " + nombre + " ya esta guardado en tu cesta.")


def mostrar_cesta():
    print("\n--- TUS PRODUCTOS ACUMULADOS ---")
    if len(cesta_productos) == 0:
        print("Tu cesta esta vacia por ahora... ¡Animate a comprar algo!")
    else:
        indice = 0
        while indice < len(cesta_productos):
            prod = cesta_productos[indice]
            prec = cesta_precios[indice]
            print(
                str(indice + 1)
                + ". "
                + prod
                + " --------> Precio: $"
                + str(prec)
            )
            indice = indice + 1


def eliminar_elemento():
    print("\n--- SECCION PARA ELIMINAR ---")
    if len(cesta_productos) == 0:
        print("No tienes nada en la cesta para borrar.")
    else:
        borrar = input("Escribe el nombre exacto del producto a quitar: ")

        if borrar in cesta_productos:
            posicion = cesta_productos.index(borrar)
            cesta_productos.pop(posicion)
            cesta_precios.pop(posicion)
            print("Entendido, hemos quitado " + borrar + " de tu lista.")
        else:
            print("Ups, ese producto no lo encontramos en la cesta.")


def calcular_total():
    print("\n--- HORA DE SACAR LA CUENTA ---")
    if len(cesta_precios) == 0:
        print("El total es $0.0 porque la cesta esta vacia.")
    else:
        suma_total = 0.0
        for precio in cesta_precios:
            suma_total = suma_total + precio

        print("Llevas un total de: $" + str(suma_total))
        print("¡Una excelente seleccion de compras!")


def iniciar_simulador():
    opcion = ""

    print("==========================================")
    print(" ¡BIENVENIDO A TU SIMULADOR DE COMPRAS! ")
    print("==========================================")


    while opcion != "5":
        print("\n************ MENU PRINCIPAL ************")
        print("1. Agregar un nuevo elemento")
        print("2. Mostrar el contenido de la cesta")
        print("3. Eliminar un elemento")
        print("4. Calcular el total de la compra")
        print("5. Renunciar")
        print("****************************************")

        opcion = input("Elige una opcion (1-5): ")

        if opcion == "1":
            agregar_elemento()
        elif opcion == "2":
            mostrar_cesta()
        elif opcion == "3":
            eliminar_elemento()
        elif opcion == "4":
            calcular_total()
        elif opcion == "5":
            print("\nGracias por tu visita a la tienda. ¡Hasta la proxima!")
        else:
            print("Esa opcion no existe, intenta eligiendo del 1 al 5.")



iniciar_simulador()