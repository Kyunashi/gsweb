import React, {useEffect, useRef} from "react";
import {Client} from "@stomp/stompjs";

const Home: React.FC = () => {

    const [isConnected, setIsConnected] = React.useState(false);
    const [greeting, setGreeting] = React.useState('');
    const stompClientRef = useRef<Client | null>(null);

    if (!stompClientRef.current) {
        stompClientRef.current = new Client({
            brokerURL: 'ws://192.168.178.42:8080/create'
        });
    }
    const stompClient = stompClientRef.current;

    stompClient.onConnect = (frame) => {
        setIsConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/room/greetings', (greeting) => {
            setGreeting(JSON.parse(greeting.body).content);
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
        // @ts-ignore
        stompClient.deactivate()
            .then(value => {
                setIsConnected(false);
                setGreeting('');
                console.log('Disconnected');

            })
    }



    const handleCreateRoom = () => {

        if(isConnected){

            disconnect();
            return;
        }
        // @ts-ignore
        stompClient.configure({brokerURL: 'ws://192.168.178.42:8080/create'})
        connect();
    }

    const handleJoinRoom = () => {

        if(isConnected){
            disconnect();
            return;
        }
        // @ts-ignore
        stompClient.configure({brokerURL: 'ws://192.168.178.42:8080/join'})
        connect();
    }

    const sendMessage = () => {

        // @ts-ignore
        stompClient.publish({
            destination: "/websocket/hi",
            body: JSON.stringify({'name' : "Kyew"})
        })

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
          <label>{greeting}</label>
          <label> </label>
      </div>
    );
}

export default Home