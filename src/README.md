# Reto tecnico #3 semillero 
Este proyecto es un sistema de gestión de cursos académicos. A continuación se presenta el contenido del README para este proyecto:

##Funcionalidades
El sistema de gestión de cursos académicos cuenta con las siguientes funcionalidades:

1. Listar  Cursos Ofrecidos:
* Mostrar nombre del curso.
* Mostrar nombre del curso prerrequisito.
* Mostrar número de créditos.
* Mostrar cupos disponibles.
2. Listar  Alumnos Matriculados:
* Mostrar nombre del alumno.
* Mostrar facultad a la que pertenece.
* Mostrar cantidad de créditos inscritos.
3. Listar  Profesores:
* Mostrar nombre del profesor.
* Mostrar máximo título académico.
* Mostrar años de experiencia en docencia.
* Mostrar nombre del curso o cursos que dicta.
4. Agregar Nuevos Elementos:
* Agregar nuevos cursos.
* Agregar nuevos alumnos.
* Agregar nuevos profesores.
5. Actualizar Información:
* Actualizar información de cursos.
* Actualizar información de alumnos.
* Actualizar información de profesores.
6. Eliminar Elementos:
* Eliminar cursos.
* Eliminar alumnos.
* Eliminar profesores.
7. Buscar Elementos por Nombre:
* Buscar curso, alumno o profesor por nombre.
8. Buscar Cursos por Estado de Cupos:
* Buscar cursos por la disponibilidad de cupos.
9. Buscar Alumnos por Facultad:
* Buscar alumnos por la facultad a la que pertenecen.
10. Mostrar Detalles de un Curso:
* Seleccionar un curso y mostrar información detallada, incluyendo nombre, número de estudiantes inscritos, profesor, cantidad de créditos, entre otros.
11. Mostrar Detalles de un Alumno:
* Seleccionar un alumno y mostrar información detallada, incluyendo nombre, número de créditos inscritos, semestre que cursa, cursos matriculados y asignaturas ya cursadas.

## Uso del Proyecto
Para utilizar este proyecto, se deben seguir los siguientes pasos:

1. Clonar el [repositorio] del proyecto desde (https://github.com/jkmilop/reto_tecnico_semillero_tres.git)
 del repositorio.
2. Instalar las dependencias del proyecto ejecutando los siguientes comandos:
```npm install cors express finalhandler pg pg-hstore sequelize```
```npm install --save-dev nodemon```
3. Configurar la conexión a la base de datos en el archivo database.js.
4. Ejecutar el proyecto usando el siguiente comando:
```npm run d```
Esto iniciará el servidor y el sistema de gestión de cursos académicos estará disponible en http://localhost:4000.

## Contribuciones
Las contribuciones al proyecto son bienvenidas. Si desea contribuir, siga estos pasos:
1. Realice un fork del repositorio.
2. Cree una rama nueva para su contribución.
3. Realice los cambios y las mejoras deseadas.
4. Envíe una solicitud de pull para que sus cambios sean revisados e incorporados al proyecto principal.