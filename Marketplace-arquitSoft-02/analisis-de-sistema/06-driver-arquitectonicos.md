# Drivers arquitectónicos

| ID | Driver arquitectónico | Origen | ¿Por qué influye en la arquitectura? |
|---|---|---|---|
| **DA01** | El sistema debe soportar un incremento importante de usuarios durante campañas comerciales. | AC03 – Escalabilidad | Puede influir en la estrategia de escalamiento y despliegue. |
| **DA02** | El sistema debe mantener tiempos de respuesta adecuados durante alta concurrencia. | AC01 – Rendimiento | Puede influir en la comunicación entre componentes, procesamiento y almacenamiento. |
| **DA03** | El sistema debe proteger los datos de usuarios y operaciones de compra. | AC04 – Seguridad | Puede influir en autenticación, autorización y protección de datos. |
| **DA04** | El sistema debe integrarse con una pasarela de pago externa mediante una API. | RC04 – Pasarela de pago | Condiciona la forma de comunicación e integración con servicios externos. |
| **DA05** | El sistema debe utilizar una API REST para la comunicación entre frontend y backend. | RC03 – API REST | Limita las alternativas de comunicación entre las partes del sistema. |
| **DA06** | El sistema debe facilitar la mantenibilidad y evolución modular de sus componentes. | AC05 – Mantenibilidad | Influye en la separación de responsabilidades, el bajo acoplamiento, las interfaces entre módulos y la facilidad para modificar o incorporar funcionalidades. |
