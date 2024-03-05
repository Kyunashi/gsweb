import React from "react";
import {Client} from "@stomp/stompjs";

const Home: React.FC = () => {

    const [isConnected, setIsConnected] = React.useState(false);
    var greeting;

    React.useEffect(() => {
        connect();
    }, [])

    const stompClient = new Client({
        brokerURL: 'ws://192.168.178.42:8080/portfolio'
    });


    stompClient.onConnect = (frame) => {
        setIsConnected(true);
        console.log('Connected' + frame);
        stompClient.subscribe('/room/greetings', (greeting) => {
            greeting = JSON.parse(greeting.body).content;
        })

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
            stompClient.activate();
        }
    }

    function disconnet() {
        stompClient.deactivate();
        setIsConnected(false);
        console.log('Disconnected')
    }

    React.useEffect(() => {

    }, [])


    const handleCreateRoom = () => {
        console.log("Clicked")
        if(isConnected){
            disconnet();
            return;
        }
        console.log("trying to connect")
        connect();
    }

    const handleJoinRoom = () => {
        sendMessage();
    }

    const sendMessage = () => {
        stompClient.publish({
            destination: "app/app/",
            body: JSON.stringify({'name' : "Kyew"})
        })
    }



    return (
      <div>
          <button className={'joinbtn'} onClick={handleCreateRoom}>join rooom</button>
          <button className={'createbtn'} onClick={handleJoinRoom}>create room</button>
          {isConnected ? <label>Connected :D</label> : <label>Disconnected :(</label>}
          <label>{greeting}</label>
      </div>
    );
}

export default Home