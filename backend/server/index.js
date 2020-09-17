import http from 'http';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';

//mongo connection
import '../config/mongo.js';

// socket configuration
import io from '../utils/socketio.js';

//routes
import indexRouter from '../routes/index.js';
import userRouter from '../routes/user.js';
import chatRoomRouter from '../routes/chatRoom.js';
import deleteRouter from '../routes/delete.js';

//middlewares
import { decode } from '../middlewares/jwt.js';

const app = express();

const port = process.env.PORT || 3001;
app.set('port', port);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/room', decode, chatRoomRouter);
app.use('/delete', deleteRouter);

/**catch 404 and forward to error handler */
app.use('*', (_, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist',
  });
});

/** HTTP server */
const server = http.createServer(app);

/** Create socket connection */
io(server);

/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on('listening', () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
});
