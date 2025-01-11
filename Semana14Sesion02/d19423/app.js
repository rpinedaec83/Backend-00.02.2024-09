require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketIO(server);
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));

const OpenAI= require('openai');
const openai = new OpenAI({
    apikey: process.env.OPENAI_API_KEY
})


io.on("connection",(socket)=>{
    console.log("Nuevo usuario conectado");

    const historialConversacion = [];
    historialConversacion.push({
        role: "system",
        content: `Eres el chatbot de la empresa X-CODEC y tienes que ayudar a los trabajadores con sus preguntas respecto a este reglamento interno:
        Índice 
PRESENTACIÓN 
El Reglamento Interno de padres de Familia y del Comité padres de Familia es un documentos de referencia institucional, cuyo contenido es acorde a la filosofía y axiología toribiana, tiene como principal objetivo normar el vínculo entre padres de Familia y la Institución Educativa, así como la organización y funcionamiento del Comité padres de Familia (COPAFA), cristalizando de esta manera el gran deseo de contribuir con los demás agentes en el aseguramiento de la calidad de los servicios que ofrece la institución. 
Su base legal lo constituyen el Reglamento Interno de la Institución Educativa Privada Santo Toribio de Mogrovejo y las normas vigentes, tiene carácter de obligatoriedad; por lo tanto, debe ser asumido por todos los padres de familia y aceptadas desde el momento que ingresan a la institución con la finalidad de garantizar el derecho y la obligación de los padres de familia o apoderados a participar en el proceso educativo de sus hijos e hijas, favoreciendo una convivencia sana que contribuya a un óptimo clima institucional. 
“Quod faciendum est faciamus” 
“Lo que hay que hacer, se hace” 
CAPÍTULO I: GENERALIDADES, OBJETIVOS, ALCANCE Y BASES LEGALES 
OBJETIVOS 
Artículo 1º: El Reglamento de padres de Familia, Coordinadores de aula y Comité de padres de Familia COPAFA, tiene como objetivo normar el vínculo entre padres de familia, tutores y el colegio "Santo Toribio de Mogrovejo", así como la organización y funcionamiento del COPAFA, con el fin de contribuir al mejoramiento de la calidad de los servicios que ofrece la Institución. 
Artículo 2: Todas las acciones propuestas por los padres de Familia estarán enmarcados dentro de las enseñanzas del Magisterio de la Iglesia Católica, a fin de no contradecir nuestra condición de colegio Diocesano y la axiología que nos inspira. 
ALCANCE 
Artículo 3°: El presente Reglamento será cumplido por todos los padres de familia, tanto individualmente como en su condición de representantes de aula o de todo el colegio. Las familias que no se identifiquen con la Iglesia Católica deberán ser respetuosas de la orientación católica de este colegio que han elegido libremente. A su vez, todos los miembros de esta Institución Educativa estamos obligados a mostrar tolerancia y respeto a estas familias, agradeciendo mucho su confianza en nuestra propuesta educativa. 
BASES LEGALES 
Artículo 4°: El presente Reglamento se sustenta en los siguientes dispositivos legales: 
Ley Nº 28044 Ley General de Educación 
Ley Nº 26549 Ley de los Centros Educativos Privados 
Ley Nº 28628, Ley que regula la participación de las Asociaciones de padres de Familia en las instituciones educativas públicas 
DS N° 005-2021-MINEDU Reglamento de Instituciones Educativas Privadas de Educación 
Resolución Ministerial N° 109-2022-MINEDU que aprueba “Disposiciones para el proceso de adecuación a las Condiciones Básicas de Instituciones Educativas de Gestión Privada de Educación Básica” 
Reglamento Interno de la Institución Educativa Privada "Santo Toribio de Mogrovejo” 
CAPITULO II: DE LOS PADRES DE FAMILIA 
Artículo 5º: Las madres y padres de familia o apoderados legales son los principales educadores de sus hijos, responsabilidad de la que nadie los puede eximir y que tampoco pueden delegar exclusivamente al colegio. Por ello, lo propio de la escuela es colaborar con la tarea formativa de cada familia; pero, no la sustituye. 
Artículo 6º: En este contexto, la acción educativa del colegio es subsidiaria y se ejerce en nombre de los padres y por encargo suyo. Razón de ser para que haya una estrecha relación, comunión y coordinación entre el colegio, los padres y los educadores. 
Artículo 7º: Al matricular a sus hijos en el colegio, los padres de familia eligen asumir el Ideario, la axiología y la propuesta educativa que inspiran el Proyecto Educativo Institucional y se comprometen a colaborar directa y personalmente en la educación de sus hijos y el bienestar que se merecen. 
Artículo 8º: Esta relación se establece a través de los siguientes canales, teniendo como mediación la Coordinación de formación: 
Relación directa con el tutor y/o preceptor según sea el caso y con el equipo educador de su hija (o). 
Relación entre los Coordinadores de aula con sus pares y con el tutor (a) y la Dirección de Nivel. 
Relación entre los Coordinadores y los integrantes del COPAFA, las direcciones de nivel, Administración y Dirección general. 
DEBERES 
Artículo 9°: Son deberes de todo padre de familia: 
Asumir, respetar y participar en la orientación católica del colegio y en los ideales de su axiología y el Proyecto Educativo. 
Asumir su protagonismo en la formación integral de sus hijos e hijas. 
Cumplir y hacer cumplir las normas del presente Reglamento, así como el Reglamento Interno y las Normas de convivencia escolar. 
Participar cuando es requerida su presencia en las actividades programadas por la Institución Educativa, Matrimonios Coordinadores de aula o COPAFA. 
Asegurarse de que sus hijos asistan a la escuela todos los días y lleguen puntualmente, tomando medidas para evitar ausencias innecesarias.  
Velar por el establecimiento de un ambiente adecuado y favorable orientado a la formación integral de sus hijos e hijas.  
Es responsabilidad de los padres, mantenerse informados del desempeño de sus menores hijos. Para ello cuentan con la plataforma del Sieweb como instrumento diario de coordinación o entrevistas.  
Cumplir con el pago de las cuotas de enseñanza señalados por la Institución educativa. 
Tratar a todos los miembros de la comunidad educativa con respeto y cortesía en todas sus interacciones. 
Delegar de manera notarial, a través de una carta poder, a quienes asuman el encargo de apoderados de los estudiantes. 
Realizar las evaluaciones externas correspondientes cuando lo sugiera el área de psicología educativa de la institución. 
Cumplir con las recomendaciones dadas por especialistas externos cuando hay diagnóstico de estudiantes neurodivergentes o problemas de comportamiento. 
Si los padres de familia se rehúsan a realizar lo indicado en los artículos 9.11 y 9.12, la institución evaluará la modalidad de trabajo académico del estudiante. 
Ningún padre de familia puede intimidar a los estudiantes con insultos, gritos, comentarios o llamadas de atención en la institución, si esto sucediera se procederá a tomar otras medidas como el reporte del caso al SISEVE. 
***En caso de incumplimiento a los deberes anteriormente descritos, se procederá a informar a las instancias correspondientes (UGEL). 
DERECHOS 
Artículo 10º: Son derechos de los padres de familia los siguientes: 
Conocer el contenido del Ideario, la axiología y del Proyecto Educativo, los cuales son de dominio público. 
Recibir información periódicamente sobre los distintos aspectos de la formación de sus hijos y la calidad o avance de su desempeño académico, así como sobre las dificultades que se observan en ellos. Además, disponen de un calendario de entrevistas con los docentes y tutores de acuerdo con el horario que aparece en el módulo de entrevistas de la plataforma Sieweb. 
Solicitar una cita para ser atendidos personalmente por temas académicos siguiendo los canales establecidos: docente – tutor – dirección de nivel – director general. 
Solicitar una cita para ser atendidos personalmente por temas conductuales, siguiendo los canales establecidos: docente – tutor –coordinación de formación – director general. 
Despachos y entrevistas, escuela de familias, jornadas para padres y pastoral familiar. 
Ser elegidos como Coordinadores de aula o miembros del COPAFA. 
Ser convocado a participar en actividades curriculares y extracurriculares. 
Recibir la orientación oportuna para mejorar en el caso de no cumplir con lo establecido en el presente reglamento. 
CAPÍTULO III: DEL COMITÉ DE APOYO DE PADRES DE FAMILIA (COPAFA) 
Artículo 11º: COPAFA es un órgano sin vínculo laboral con la institución ni fines de lucro, que tiene por finalidad propiciar la participación de los padres de familia y apoderados en el proceso educativo de sus hijas e hijos, matriculados en la Institución Educativa. Su razón de ser está ligada al servicio educativo que brinda el colegio Santo Toribio de Mogrovejo. 
ELECCIÓN 
Artículo 12°: La elección y renovación de cargos del COPAFA es promovida por la Dirección General del colegio en representación de la Asociación Civil IEP Santo Toribio de Mogrovejo, para lo cual se invita directamente a los Coordinadores de aula para formar las listas que serán propuestas para su elección. 
Artículo 13º: Sus cargos se ejercen por un año calendario y se reúnen en sesiones ordinarias de manera periódica, siempre con conocimiento de la Coordinación de Formación o Dirección de Administración. 
CONSTITUCIÓN 
Artículo 14º: El COPAFA está constituido por: 
•	Presidente(a) 
•	Vicepresidente(a) 
•	Secretario(a) 
•	Tesorero(a) 
•	Dos Vocales 
Cada cargo será designado de acuerdo al número de votos obtenidos en la reunión de constitución. 
FUNCIONES 
Artículo 15º: El comité de padres de familia o COPAFA, trabaja en coordinación con la Dirección General y la Dirección de Administración. 
Artículo 16º: Sus funciones principales son: 
Propiciar la participación de los padres de familia en el mejoramiento continuo de los servicios que ofrece la Institución. 
Coordinar, colaborar y apoyar en forma permanente con la Dirección General y la Dirección de Administración. 
Fomentar las buenas relaciones humanas entre los integrantes de la comunidad educativa, promoviendo un clima institucional favorable. 
Elaborar y presentar el Plan Anual de Trabajo del COPAFA para su aprobación por el Consejo Directivo. Así mismo, su informe al finalizar su gestión. 
Velar de manera colaborativa y armoniosa por la ejecución del Plan Anual de Trabajo aprobado. 
Brindar información y rendir cuenta documentada a Dirección General y Dirección de Administración. 
Participar en la selección de los textos escolares en cumplimiento de la normativa que emana del Ministerio de Educación. 
Velar por el cumplimiento de las funciones de cada miembro del COPAFA. 
ADMINISTRACIÓN DE RECURSOS DEL COPAFA 
Artículo 17°: Los recursos del COPAFA son los siguientes: 
a. Los fondos de la colaboración que recaude a través de las actividades que realice. 
b. Donaciones y legados. 
Artículo 18°: Los recursos captados por el COPAFA son destinados prioritariamente a financiar la adquisición y mantenimiento de equipos y materiales educativos de acuerdo a las necesidades de la Institución Educativa. 
Los bienes adquiridos por el COPAFA están destinados al colegio y serán transferidos formalmente a su favor en el plazo máximo de 15 días. Con el fin de velar por un transparente desenvolvimiento económico, toda adquisición de bienes se hará previa evaluación de la Dirección de Administración y los miembros del COPAFA, de por lo menos tres (3) propuestas o proformas. 
Artículo 19º: El dinero recaudado por el Comité de Padres de Familia, según lo establecido por el art. 17° del presente Reglamento, será depositado en una cuenta mancomunada, aperturada por el presidente y Tesorero de COPAFA a nombre de la Institución Educativa. 
DISPOSICIONES COMPLEMENTARIAS 
Artículo 20°: El personal docente o administrativo que tenga hijos en la Institución Educativa NO puede ser elegido como miembros del COPAFA. 
Artículo.21º: El presente Reglamento será actualizado por el director general, Dirección de Administración y Coordinación de formación y su vigencia se supedita al logro de sus fines y objetivos. 
MANUAL DE FUNCIONES DEL COMITÉ DE PADRES DE FAMILIA 
GENERALIDADES 
El presente manual, aprobado por el director general de la Institución Educativa Privada "Santo Toribio de Mogrovejo" tiene como finalidad determinar las funciones a cumplir por cada uno de los miembros del Comité de Padres de Familia. 
Cualquier aspecto no contemplado en el presente Manual de Funciones será determinado por la Dirección General de la Institución Educativa en coordinación con el presidente del Comité y sus miembros.  
PRESIDENCIA 
Trabajar coordinadamente con la Dirección de la Institución Educativa Privada "Santo Toribio de Mogrovejo" en la formulación del Plan de Trabajo y en la realización de todas las actividades programadas. 
Mantener permanentemente informada a la Dirección General y Dirección de Administración de la Institución Educativa de todos los sucesos, acuerdos y acciones que asuma el Comité de padres de Familia. 
Hacer cumplir los acuerdos adoptados. 
Convocar y presidir las reuniones del Comité de padres de familia, previa coordinación con la Dirección de la Institución Educativa. 
Establecer la agenda de trabajo de las reuniones convocadas. 
Coordinar acciones con los miembros del Comité que preside. 
Participar en las actividades internas que convoque el colegio como representante de todos los padres de familia de la Institución Educativa. 
Representar a todos los padres de familia en instituciones ajenas al colegio, con la delegación explícita de Dirección general o Administración. 
Firmar toda la documentación que emane del Comité de padres de familia como su máximo representante. 
Velar por el cumplimiento de las actividades programadas por el Comité y asumir las acciones propias de su cargo. 
Participar de todas las reuniones convocadas con voz y voto.  
VICEPRESIDENCIA 
Convocar y presidir las reuniones del Comité de padres de familia, en caso no pudiese hacerlo el presidente por razones previamente expuestas. 
Apoyar la labor de la Presidencia del Comité y estar informado de todas las acciones para estar en posibilidad de asumir las funciones para cuando el caso lo amerite. 
Representar al presidente del Comité, de existir delegación de funciones, en las actividades internas del colegio o en otras cuando la Dirección de la Institución Educativa lo solicite. 
Participar de todas las reuniones convocadas con voz y voto. 
SECRETARÍA 
Llevar los libros de actas del Comité de padres de Familia. 
Elaborar los comunicados, citaciones y otros documentos propios del funcionamiento y acciones del Comité. 
Recepcionar y llevar archivo de toda la documentación recibida en el Comité, ya sean de carácter interno de la Institución Educativa o las recibidas de otras personas naturales o jurídicas, dando el debido trámite a las mismas. 
Dar lectura en las reuniones convocadas de los acuerdos anteriores y documentos recibidos a la fecha. 
Elaborar las actas de transferencia de bienes adquiridos por el Comité a favor de la Institución Educativa y hacerlas refrendar por los miembros de los mismos. 
Participar de todas las reuniones convocadas con voz y voto. 
TESORERÍA 
Elaborar el presupuesto anual del Comité en coordinación con la Dirección de la Institución y aprobado por la mayoría de los miembros del COPAFA. 
Llevar actualizadas todas las cuentas del Comité de padres de Familia de la Institución Educativa Privada "Santo Toribio de Mogrovejo", sustentados con la debida documentación. 
Informar cuando se requiera de los estados de cuenta y otros informes económicos a la Dirección de la Institución, a los miembros del comité y a los padres de familia. 
Elaborar los informes económicos al término de cada una de las actividades que realizan los padres de familia a través del Comité. 
Elaborar los balances anuales que deben ser refrendados además de su persona, por la Dirección General de la Institución Educativa y el presidente del Comité de Padres de Familia y registrarlos en la cuenta del colegio. 
Llevar el registro detallado de todos los ingresos y egresos percibidos de las actividades que realice el COPAFA de la Institución Educativa Privada "Santo Toribio de Mogrovejo", así como de las donaciones y legados que pudiesen recibir. 
Participar de todas las reuniones convocadas con voz y voto. 
VOCALÍAS 
Establecer medios de interrelación efectiva entre los miembros del COPAFA teniendo como uno de sus objetivos la coordinación directa con la Dirección general del colegio. 
Velar porque el trato y comportamiento de los miembros del Comité estén siempre dentro de un marco ético, de moralidad y profesionalismo. 
Colaborar con todas las acciones de nuestra Institución que busquen el fortalecimiento del desarrollo personal de sus miembros. 
Apoyar y llevar a cabo las actividades que tengan como objetivo fundamental el desarrollo cultural de los educandos, padres de familia y docentes de la Institución Educativa Privada "Santo Toribio de Mogrovejo". 
Buscar siempre los medios más adecuados para elevar la formación cultural de todos los estamentos de la Institución, especialmente de todos nuestros alumnos. 
Contribuir al fortalecimiento de la imagen institucional y colaborar en sus actividades y planes de acción. 
Establecer mecanismos de comunicación e interacción con los coordinadores de aula. 
Propiciar el bienestar social de todos los alumnos, padres de familia, docentes, personal administrativo y de servicio de nuestra Institución Educativa. 
Buscar la realización de actividades que tengan como objetivo principal el mejoramiento de la infraestructura y adquisición de equipos para el servicio educativo. 
Sensibilizar a todos los estamentos de nuestra Institución en la importancia de apoyar las actividades de solidaridad y ayuda hacia los más pobres. 
Coordinar directamente sus actividades con el presidente y tesorero del Comité de Padres de Familia. 
Elaborar los presupuestos requeridos para la realización de las distintas actividades programadas por el Comité y exponerlos en las reuniones de coordinación para su aprobación final por el Consejo Directivo. 
Elaborar las cotizaciones respectivas de los bienes que fueran a ser adquiridos por el comité de padres de familia de acuerdo a las necesidades de la Institución Educativa y a lo establecido en el presente reglamento, así como de los servicios de mantenimiento de equipos y material educativo, para su aprobación respectiva. Así como, fiscalizar la calidad de los bienes a adquirir y de los servicios a contratar por el Comité de Padres de familia. 
Participar con voz y voto de todas las reuniones convocadas por el Comité. 
REGLAMENTO DE LOS COORDINADORES DE AULA 
FINALIDAD 
Artículo 1º: El presente Reglamento norma la organización y funcionamiento de los Coordinadores de aula de la Institución Educativa Privada "Santo Toribio de Mogrovejo como parte fundamental en el apoyo que deben brindar los padres de familia a las actividades propias de cada sección y grado de estudios con la única finalidad de brindar un mejor servicio educativo en bien de nuestros estudiantes. 
ORGANIZACIÓN Y ELECCIÓN 
Artículo 2º: Los Coordinadores de cada aula trabajan directamente con Coordinación de Formación y con los tutores de cada sección 
Artículo 3º: Los Coordinadores de cada aula estarán formados por dos familias, y estos serán nombrados por el consejo directivo y coordinación de formación del colegio y serán presentados a los padres de familia en la primera reunión de aula convocada por el tutor(a). 
Artículo 4º: La elección es por un año y solo podrán participar como Coordinadores en una sola aula; si la Institución lo considera conveniente, se ratificará al o los Coordinadores del año anterior. 
FUNCIONES DE LOS COORDINADORES DE AULA 
Artículo 5º: Elaborar un Plan de Trabajo con apoyo del tutor considerando las actividades y cuotas establecidas por la Coordinación de Formación para su aprobación. 
Artículo 6º: Exponer el Plan de Trabajo aprobado a los padres de familia del aula. 
Artículo 7º: Organizar la participación de los padres de familia del aula distribuyendo las tareas propias del plan de trabajo, buscando así un justo trabajo en equipo en base a la solidaridad. 
Artículo 8º: Brindar apoyo a las actividades propias de cada sección y grado de estudios.  
Artículo 9º: Dar cuenta del movimiento económico mediante la elaboración de informes bimestrales e informarlo a los padres de familia. 
Artículo 10º: Todas las actividades que realizan los Coordinadores de aula, son de su estricta responsabilidad, el colegio interviene única y exclusivamente para velar porque las mismas no afecten su Ideario. 
Artículo 11º: La Dirección del colegio tiene la facultad de variar la conformación del COPAFA o los Coordinadores de aula, incluyendo la posibilidad de ratificar, suspender temporalmente o cambiar a sus integrantes según lo considere necesario. 
Artículo 12º: Los Coordinadores de aula deben fomentar buenas relaciones humanas entre todos los integrantes de la comunidad educativa promoviendo un clima institucional favorable, si esto no se realiza podrían ser sustituidos. 
Artículo 13º: Procurar la integración de todas las familias de la sección y grado de su menor hija (o). 
Artículo 14º: Comprometerse con el tutor respecto a la participación de cada familia en la educación y formación de su hijo(a). 
Artículo 15º: Canalizar las actividades que permitan recaudar los fondos para sus visitas de estudio, de recreación y de promoción. 
Artículo 16º: Ayudar al crecimiento espiritual e integral de cada familia, participando activamente en el Programa de escuela de familias y en las actividades propuestas de cada nivel académico. 
Artículo 18º: Buscar el engrandecimiento de la institución a través de una labor responsable, honesta y llena de afán de servicio. 
Artículo 19º: Coordinar, apoyar y participar en las actividades del COPAFA respetando siempre su condición de entes paralelos. `
    })



    socket.on("sendMessage", async (message, callback)=>{
        try {
            console.log(message);
            historialConversacion.push({role:"user", content: message});
            const respuestaChat = await openai.chat.completions.create({
                model: process.env.MODEL || "gpt-3.5-turbo",
                messages : historialConversacion
            });

            const respuesta = respuestaChat.choices[0].message?.content;
            historialConversacion.push({role:"assistant", content: respuesta});
            socket.emit("message", respuesta);
            callback();
        } catch (error) {
            console.log(error);
        }
    })
    socket.on("disconnect", ()=>{console.log("Usuario Desconectado")})
})


server.listen(PORT, ()=>{
    console.log(`Corriendo en el puerto ${PORT}`)
})



