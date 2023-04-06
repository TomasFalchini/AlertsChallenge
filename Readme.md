# App de alertas

## Consigna:

Se pide programar un sistema para enviar alertas a usuarios que tenga la siguiente funcionalidad:

- Se pueden registrar usuarios que recibirán alertas.
- Se pueden registrar temas sobre los cuales se enviarán alertas.
- Los usuarios pueden optar sobre cuales temas quieren recibir alertas.
- Se puede enviar una alerta sobre un tema y lo reciben todos los usuarios que han optado recibir alertas de ese tema.
- Se puede enviar una alerta sobre un tema a un usuario específico, solo lo recibe ese único usuario.
- Una alerta puede tener una fecha y hora de expiración.
- Hay dos tipos de alertas: Informativas y Urgentes.
- Un usuario puede marcar una alerta como leída.
- Se pueden obtener todas las alertas no expiradas de un usuario que aún no ha leído.
- Se pueden obtener todas las alertas no expiradas para un tema. Se informa para cada alerta si es para todos los usuarios o para uno específico.
- Tanto para el punto 9 como el 10, el ordenamiento de las alertas es el siguiente: las Urgentes van al inicio, siendo la última en llegar la primera en obtenerse (LIFO). Y a continuación las informativas, siendo la primera en llegar la primera en obtenerse (FIFO). Ej: Dadas las siguientes alertas Informativas y Urgentes que llegan en el siguiente orden: I1,I2,U1,I3,U2,I4 se ordenarán de la siguiente forma --> U2,U1,I1,I2,I3,I4

## Autor

Tomás Falchini || [LinkedIn](https://www.linkedin.com/in/tomasfalchini/)

## Resolución:

Se aplicó la arquitectura Clean Architecture para separar las distintas partes de un sistema en capas independientes, lo que permitió mejorar su mantenibilidad, escalabilidad y testabilidad. La capa central, que es la capa de dominio, se enfoca en abstraer la lógica de negocios de la aplicación y es completamente independiente de las capas de adaptadores y de la infraestructura.

La aplicación de patrones de diseño como Singleton, Strategy, Inyección de dependencias y Proxy permitió mejorar la calidad del código y aumentar la eficiencia del sistema en general. Esto se logró gracias a que estos patrones ayudaron a reducir el acoplamiento entre las distintas partes del sistema, a la vez que aumentaron la flexibilidad y modularidad del mismo.

### Para probar la aplicacion:

npm install

npm start

Esto iniciará la aplicación en localhost, en el puerto 8080

Las rutas son las siguientes:

post: "/newUser"
post: "newTopic"
put: "/suscribeToTopic"
post: "/sendAlert"
put: "/readAlert"
get: "/userAlerts"
get: "/topicAlerts"
