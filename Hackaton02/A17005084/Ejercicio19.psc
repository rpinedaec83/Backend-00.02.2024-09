//19. Hacer un algoritmo en Pseint para una helader�a se tienen 4 tipos de empleados ordenados de la siguiente 
//forma con su n�mero identificador y salario diario correspondiente:
//Cajero (56$/d�a).			
//Servidor (64$/d�a).
//Preparador de mezclas (80$/d�a).
//Mantenimiento (48$/d�a).
//El due�o de la tienda desea tener un programa donde s�lo ingrese dos n�meros enteros que representen al n�mero 
//identificador del empleado y la cantidad de d�as que trabaj� en la semana (6 d�as m�ximos). 
//Y el programa le mostrar� por pantalla la cantidad de dinero que el due�o le debe pagar al empleado que ingres�
Proceso ProgramHeladeria
	
	Escribir "Ingrese c�digo de empleado: "
	Escribir "10 ==> Cajero"
	Escribir "11 ==> Servidor"
	Escribir "12 ==> Preparador de mezclas"
	Escribir "13 ==> Mantenimiento"
	Leer CodEmple
	
	Definir VeriCod Como Logico
	Definir  SuelxDia Como Entero
	VeriEst=Verdadero
	
	Segun CodEmple Hacer
		"10":
			SuelxDia=56
		"11":
			SuelxDia=64
		"12":
			SuelxDia=80
		"13":
			SuelxDia=48
		De Otro Modo:
			VeriEst=falso
	Fin Segun
	
	Si VeriEst Entonces
		Escribir "Ingrese la cantidad de dias trabajados en la semana;"
		Leer CantDia		
		Si CantDia<=6 Entonces
			Escribir "El pago semanal del empleado es: ", (SuelxDia * CantDia)			
		SiNo
			Escribir "El numero de dias trabajados debe ser menor a 7"
		Fin Si		
	SiNo
		Escribir "El c�digo del empleado es incorrecto"
	Fin Si
	
	
FinProceso
