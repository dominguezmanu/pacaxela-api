const express = require('express');
const router = express.Router();


const usuarioRoutes = require('./usuarios.routes');
const authRoutes = require('./auth.routes');
const categoriaRoutes = require('./categorias.routes');
const tallaRoutes = require('./tallas.routes');
const estadosPrendaRoutes = require('./estadosPrenda.routes');
const metodosPagoRoutes = require('./metodosPago.routes');
const tiposEnvioRoutes = require('./tiposEnvio.routes');
const estadosPedidoRoutes = require('./estadosPedido.routes')
const direccionesRoutes = require('./direcciones.routes');;
const publicacionesRoutes = require('./publicaciones.routes');
const fotosPublicacionRoutes = require('./fotosPublicacion.routes');
const pedidosRoutes = require('./pedidos.routes');
const resenasRoutes = require('./resenas.routes');
const mensajesRoutes = require('./mensajes.routes');
const favoritosRoutes = require('./favoritos.routes');
const rolesRoutes = require('./roles.routes');


router.use('/auth', authRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/tallas', tallaRoutes);
router.use('/estados-prenda', estadosPrendaRoutes);
router.use('/metodos-pago', metodosPagoRoutes);
router.use('/tipos-envio', tiposEnvioRoutes);
router.use('/estados-pedido', estadosPedidoRoutes);
router.use('/direcciones', direccionesRoutes);
router.use('/publicaciones', publicacionesRoutes);
router.use('/fotos-publicacion', fotosPublicacionRoutes);
router.use('/pedidos', pedidosRoutes);
router.use('/resenas', resenasRoutes);
router.use('/mensajes', mensajesRoutes);
router.use('/favoritos', favoritosRoutes);
router.use('/roles', rolesRoutes);


module.exports = router;
