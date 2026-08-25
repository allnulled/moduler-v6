# Cronología de APIs de Std

A continuación se presentan las APIs de Std cronológicamente.

## Índice

- [Cronología de APIs de Std](#cronología-de-apis-de-std)
  - [Índice](#índice)
  - [Lista de APIs por orden cronológico de creación](#lista-de-apis-por-orden-cronológico-de-creación)
  - [Incremento de features por orden cronológico](#incremento-de-features-por-orden-cronológico)

## Lista de APIs por orden cronológico de creación

- [ ] Std IndexedDB API
- [ ] Std Virtual Filesystem API
   - [ ] Std Virtual Filesystem Driver For LocalStorage API
   - [ ] Std Virtual Filesystem Driver For IndexedDB API
   - [ ] Std Virtual Filesystem Driver For Nodejs API
   - [ ] Std Virtual Filesystem Driver For WebSocket API
     - [ ] Std Virtual Filesystem Driver For WebSocket Server API
     - [ ] Std Virtual Filesystem Driver For WebSocket Client API
- [ ] Std Database API
- [ ] Std Types API
- [ ] Std UI API
- [ ] Std UI Components API
- [ ] Std UI Forms API
- [ ] Std UI Controls API
- [ ] Std Forms API
   - [ ] Std Embedded Forms API
- [ ] Trojan Architecture
   - [ ] Nodejs Application (nodejs) (@/src)
   - [ ] Binary Application (cmd = nodejs + shebang) (@/src)
   - [ ] Server Application (websocket server) (@/src)
   - [ ] Client Application (websocket client) (@/src/www)
   - [ ] Visual Application (web) (@/src/www)
- [ ] Std Channels API
   - [ ] Std Channel Server API (@/src)
   - [ ] Std Channel Client API (@/src/www)
   - [ ] Std Channel Knowledge API (@/src/www)
      - [ ] Esta API es para dejar comandos en conocimiento
- [ ] Std UI Componible Components API
   - [ ] Esta API es para componer páginas a través de componentes que cumplen ciertas firmas
   - [ ] Para un futuro Page Builder API
- [ ] Std UI Page Builder API
   - [ ] Esta API es para los componentes que conocen la Std UI Componible Components API
   - [ ] Tendrías el drag'n'drop o el mecanismo que sea, para ir componiendo vistas a través de los *componibles*
   - [ ] 
- [ ] Std UI Router API
    - [ ] Esta API permitiría comandos externos con el querystring `?whatever=andever`
    - [ ] Esta API tiene límites de seguridad que hay que saber calcular y prevenir
- [ ] Std Authentication API
   - [ ] Std Authentication Server API
      - [ ] Session (Type)
      - [ ] User (Type)
   - [ ] Std Authentication Client API
      - [ ] Login/Logout/Register
- [ ] Std Database Hooks API
   - [ ] .on("before:insert")
   - [ ] .on("after:insert", "Table")
   - [ ] .on("{before,after}:{insert,delete,update}", "Table")
   - [ ] Hay que parsear y permitir eso, grupitos
- [ ] Std Database Authentication API
- [ ] Std Database Authorization API
- [ ] ...?
- [ ] ...?
- [ ] ...?
- [ ] ...?
- [ ] Std Commands API

## Incremento de features por orden cronológico