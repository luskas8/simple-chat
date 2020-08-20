import { Server } from 'socket.io';
import cripto from 'crypto';
import { sendMessege } from '../server';

interface Messege {
    id: string;
    messege: string;
}

class RoomController {
    async messege(data: Messege) {
        let messege_id = cripto.randomBytes(4).toString("hex");

        // Sending, the messege after be proccessed by the server, to every client connected.
        console.log(data);
        sendMessege({ id: data.id, messege_id, messege: data.messege });
    }
}

export default RoomController;