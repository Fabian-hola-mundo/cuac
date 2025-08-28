
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JTALL7HW.js",
      "chunk-7Z23LJ7A.js"
    ],
    "route": "/inicio"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JTALL7HW.js",
      "chunk-NDAUYLED.js"
    ],
    "route": "/servicios"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JTALL7HW.js",
      "chunk-SSFJPOXB.js"
    ],
    "route": "/portafolio"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JTALL7HW.js",
      "chunk-RCNMTZBY.js"
    ],
    "route": "/sobre-nosotros"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JTALL7HW.js",
      "chunk-QFAXAMFJ.js"
    ],
    "route": "/contacto"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7RINTF54.js",
      "chunk-XZJKKOKX.js"
    ],
    "route": "/admin"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7RINTF54.js",
      "chunk-HAJTWYDS.js"
    ],
    "route": "/admin/proyectos"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7RINTF54.js",
      "chunk-GUWSQM3E.js"
    ],
    "route": "/admin/usuarios"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7RINTF54.js",
      "chunk-PQ75IPKF.js"
    ],
    "route": "/admin/configuracion"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 3819, hash: '24b8a6c0b8c2fdb32389eb8517b5b38cf4e151f7647bd94b6c0d75602dc5b22f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1067, hash: '1f6e07b646169afc442fced94dd4226fc703e1114efcf67a5531594cb2a42491', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'inicio/index.html': {size: 22204, hash: '7fc1fc9b6c0d70711271fccf34626073ad4014cdec76b24a496675c5f82c991b', text: () => import('./assets-chunks/inicio_index_html.mjs').then(m => m.default)},
    'index.html': {size: 0, hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'servicios/index.html': {size: 21876, hash: '7bfb50477bd99efe406896a4ceca8c61d9b91d6a89f19569c3685b70cb71ff0d', text: () => import('./assets-chunks/servicios_index_html.mjs').then(m => m.default)},
    'admin/usuarios/index.html': {size: 14312, hash: '376d947050c5f8622b6500acd5117b50a8fee09c10206cfc418f62b6b3e6d4b3', text: () => import('./assets-chunks/admin_usuarios_index_html.mjs').then(m => m.default)},
    'sobre-nosotros/index.html': {size: 24451, hash: 'f34d610c8677f21230f78f6b1ac184dbf55f57875bc37e298f0037fdb9f8cec8', text: () => import('./assets-chunks/sobre-nosotros_index_html.mjs').then(m => m.default)},
    'portafolio/index.html': {size: 24253, hash: '02f268ddf07e1b95db44c0bba1146f48ac0e778d7dd152e4b128e3b6b44785fb', text: () => import('./assets-chunks/portafolio_index_html.mjs').then(m => m.default)},
    'contacto/index.html': {size: 23695, hash: 'd0d4f211869b6551d0edfe3252338729e87ac5734a52a6f05411f96d49fac208', text: () => import('./assets-chunks/contacto_index_html.mjs').then(m => m.default)},
    'admin/configuracion/index.html': {size: 14802, hash: '0fb5209de305701001005544cdc238d70543f0b334186e830e4368682ae69d19', text: () => import('./assets-chunks/admin_configuracion_index_html.mjs').then(m => m.default)},
    'admin/proyectos/index.html': {size: 15267, hash: 'd21463759fbfd5feedd3489ddf2d89e6546dee948430d3ff51472e117276795b', text: () => import('./assets-chunks/admin_proyectos_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 11744, hash: 'fc38762f10f09cfeee1f7a7f134a75f9759c3c6fb852994a7bf1f8b0097f3652', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'styles-WN3GFCP5.css': {size: 3493, hash: 'tI1xQW+0tQY', text: () => import('./assets-chunks/styles-WN3GFCP5_css.mjs').then(m => m.default)}
  },
};
