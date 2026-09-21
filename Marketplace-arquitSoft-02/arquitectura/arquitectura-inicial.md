# Arquitectura inicial del sistema
## Diagrama de arquitectura
```mermaid
flowchart TD
%% =========================
%% ACTORES
%% =========================
subgraph ACTORES["ACTORES"]
Cliente["Cliente"]
Seller["Seller"]
Admin["Administrador"]
end
%% =========================
%% PRESENTACIÓN
%% =========================
subgraph PRESENTACION["PRESENTACIÓN"]
Web["Aplicación Web → API REST"]
end
%% =========================
%% LÓGICA DE NEGOCIO
%% =========================
subgraph NEGOCIO["LÓGICA DE NEGOCIO"]
Usuarios["Usuarios"]
Sellers["Sellers"]
Catalogo["Catálogo"]
Carrito["Carrito"]
Pedidos["Pedidos"]
end
%% =========================
%% DATOS
%% =========================
subgraph DATOS["DATOS"]
BD["Base de datos"]
end
%% =========================
%% SISTEMAS EXTERNOS
%% =========================
subgraph EXTERNOS["SISTEMAS EXTERNOS"]
Pago["Pasarela de pago"]
ERP["ERP"]
Envio["Servicio de envío"]
end
%% =========================
%% FLUJO PRINCIPAL
%% =========================
ACTORES --> PRESENTACION
PRESENTACION --> NEGOCIO
NEGOCIO --> DATOS
%% Integraciones
DATOS -->|"integraciones"| EXTERNOS
%% =========================
%% DISTRIBUCIÓN HORIZONTAL
%% =========================
Cliente ~~~ Seller
Seller ~~~ Admin
Usuarios ~~~ Sellers
Sellers ~~~ Catalogo
Catalogo ~~~ Carrito
Carrito ~~~ Pedidos
Pago ~~~ ERP
ERP ~~~ Envio
%% =========================
%% ESTILOS
%% =========================
style ACTORES fill:#222,stroke:#fff,stroke-width:2px,color:#fff
style PRESENTACION fill:#222,stroke:#fff,stroke-width:2px,color:#fff
style NEGOCIO fill:#222,stroke:#fff,stroke-width:2px,color:#fff
style DATOS fill:#222,stroke:#fff,stroke-width:2px,color:#fff
style EXTERNOS fill:#222,stroke:#fff,stroke-width:2px,color:#fff
style Cliente fill:#222,stroke:#fff,color:#fff
style Seller fill:#222,stroke:#fff,color:#fff
style Admin fill:#222,stroke:#fff,color:#fff
style Web fill:#222,stroke:#fff,color:#fff
style Usuarios fill:#222,stroke:#fff,color:#fff
style Sellers fill:#222,stroke:#fff,color:#fff
style Catalogo fill:#222,stroke:#fff,color:#fff
style Carrito fill:#222,stroke:#fff,color:#fff
style Pedidos fill:#222,stroke:#fff,color:#fff
style BD fill:#222,stroke:#fff,color:#fff