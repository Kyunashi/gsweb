import React, {useEffect, useRef} from "react";
import {Client} from "@stomp/stompjs";

const Home: React.FC = () => {
    const [isConnected, setIsConnected] = React.useState(false);
    const [greeting, setGreeting] = React.useState('');
    const [roomInfo, setRoomInfo] = React.useState({
        roomId: null,
        players: [],
        playerIndex: null
    });
    const stompClientRef = useRef<Client | null>(null);


    if (!stompClientRef.current) {
        stompClientRef.current = new Client({
            brokerURL: 'ws://192.168.178.42:8080/websocket'
        });
    }
    const stompClient = stompClientRef.current;

    stompClient.onConnect = (frame) => {
        setIsConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/user/queue/room-updates', (greeting) => {
            const answer = JSON.parse(greeting.body);
            console.log(answer);
            if(!roomInfo.roomId && answer.roomId) {
                stompClient.subscribe('/room/' + answer.roomId + '/updates', (update) => {
                    const answer = JSON.parse(update.body);
                    setRoomInfo(answer);
                    console.log(answer);
                    setGreeting(answer.roomId + " with players: " + JSON.stringify(answer.players, null, 2) + " idx: " + answer.playerIndex);
                });
            }

            setRoomInfo(answer);
            setGreeting(answer.roomId + " with players: " + JSON.stringify(answer.players, null, 2) + " idx: " + answer.playerIndex);
        });
    }

    stompClient.onWebSocketError = (error) => {
        console.error('Error with websocket', error);
    };

    stompClient.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };




    function connect() {

        if(!isConnected) {
            console.log("connecting")
            // @ts-ignore
            stompClient.activate();
        }
    }

    function disconnect() {

        console.log("disconnecting")
        if(!isConnected) {
        // @ts-ignore
            stompClient.deactivate()
                .then(value => {
                    setIsConnected(false);
                    setGreeting('');
                    console.log('Disconnected');

                })
        }
    }



    const handleCreateRoom = () => {

        if(isConnected){

            stompClient.publish({
                destination: "/room/create",
                body: JSON.stringify({
                    'name' : "Kyew",
                    'color': "black"
                })
            })
            return;
        }


        connect();

    }

    const handleJoinRoom = () => {

        console.log("Current roomId: " + roomInfo.roomId);
        if(isConnected){

            stompClient?.publish({
                destination: "/room/join",
                body: JSON.stringify({
                    'roomId': roomInfo.roomId,
                    'name' : "NotKyew",
                    'color': "blue"
                })
            })
            return;
        }

        connect();
    }

    const sendMessage = () => {

        if(isConnected) {
            // @ts-ignore
            stompClient.publish({
                destination: "/room/hi",
                body: JSON.stringify({'name' : "Kyew"})
            })
        }
    }


    const handleSend = () => {
        sendMessage()
    }
    return (
      <div>
          <button className={'joinbtn'} onClick={handleJoinRoom}>join rooom</button>
          <button className={'createbtn'} onClick={handleCreateRoom}>create room</button>
          <button className={'sendbtn'} onClick={handleSend}>send</button>
          {isConnected ? <label>Connected :D</label> : <label>Disconnected :(</label>}
          <pre>{greeting}</pre>
          <label></label>
      </div>
    );
}

export default Home