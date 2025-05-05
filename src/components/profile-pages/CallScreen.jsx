// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, Button, ActivityIndicator } from 'react-native';
// import io from 'socket.io-client';
// import { mediaDevices, RTCPeerConnection, RTCView } from 'react-native-webrtc';

// const socket = io('https://fitness-backend-node.onrender.com');

// const CallScreen = ({ route, navigation }) => {
//   const { userId, peerId, callId, isCaller } = route.params;
//   const [stream, setStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [connecting, setConnecting] = useState(true);
  
//   const peerRef = useRef();
//   console.log("==================",userId, peerId, callId, isCaller);
//   useEffect(() => {
//     startLocalStream();

//     socket.emit('register', { userId });

//     if (isCaller) {
//       console.log("🚀 isCaller is TRUE. Initiating call...");
//       initiateCall();
//     }

//     socket.on('incomingCall', ({ from, signalData }) => {
//       handleIncomingCall(from, signalData);
//     });

//     socket.on('callAccepted', ({ signal }) => {
//       completeCall(signal);
//     });

//     return () => {
//       socket.disconnect();
//       stream?.getTracks().forEach(track => track.stop());
//     };
//   }, []);

//   const startLocalStream = async () => {
//     const s = await mediaDevices.getUserMedia({ video: true, audio: true });
//     setStream(s);
//   };

//   const initiateCall = async () => {
//     peerRef.current = createPeer(true);
//     const offer = await peerRef.current.createOffer();
//     await peerRef.current.setLocalDescription(offer);

//     socket.emit('callUser', {
//       // from: userId,
//       // to: peerId,
//       // signalData: offer,
//       from: 'dummyCaller',
//       to: '680a4b2f56d0ede0167e2dfe',
//       signalData: { type: 'offer', sdp: 'test-sdp' }
//     });
//     console.log('Emitted test call to 680a4b2f56d0ede0167e2dfe');
//   };

//   const handleIncomingCall = async (from, signalData) => {
//     peerRef.current = createPeer(false);
//     await peerRef.current.setRemoteDescription(signalData);

//     const answer = await peerRef.current.createAnswer();
//     await peerRef.current.setLocalDescription(answer);

//     socket.emit('acceptCall', { to: from, signal: answer });
//   };

//   const completeCall = async (signal) => {
//     if (peerRef.current) {
//       await peerRef.current.setRemoteDescription(signal);
//     }
//     setConnecting(false); // connection complete
//   };

//   const createPeer = (initiator) => {
//     const peer = new RTCPeerConnection({
//       iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
//     });

//     stream.getTracks().forEach(track => {
//       peer.addTrack(track, stream);
//     });

//     peer.ontrack = (event) => {
//       setRemoteStream(event.streams[0]);
//     };

//     return peer;
//   };

//   const endCall = () => {
//     navigation.goBack();
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: 'black' }}>
//       {stream && (
//         <RTCView streamURL={stream.toURL()} style={{ flex: 1 }} />
//       )}

//       {remoteStream && (
//         <RTCView streamURL={remoteStream.toURL()} style={{ flex: 1 }} />
//       )}

//       {connecting && (
//         <View style={{ position: 'absolute', top: 100, alignSelf: 'center' }}>
//           <ActivityIndicator size="large" color="white" />
//           <Text style={{ color: 'white', marginTop: 10 }}>Connecting...</Text>
//         </View>
//       )}

//       <Button title="End Call" onPress={endCall} />
//     </View>
//   );
// };

// export default CallScreen;



import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RTCView, mediaDevices } from 'react-native-webrtc';
import SimplePeer from 'simple-peer';
import { socket } from '../../../App';
// import { socket } from '../../../App'; // ✅ Make sure this points to your live socket

const CallScreen = ({ route }) => {
  const { peerId, isCaller, localStream, incomingSignal } = route.params;

  const [remoteStream, setRemoteStream] = useState(null);
  const [myStream, setMyStream] = useState(localStream);
  const peerRef = useRef();

  useEffect(() => {
    const streamSetup = async () => {
      let stream = localStream;

      if (!stream) {
        stream = await mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setMyStream(stream);
      }

      const peer = new SimplePeer({
        initiator: isCaller,
        trickle: false,
        stream,
      });

      if (!isCaller) {
        peer.signal(incomingSignal);
      }

      peer.on('signal', (data) => {
        if (isCaller) {
          socket.emit('callUser', {
            userToCall: peerId,
            signalData: data,
          });
        } else {
          socket.emit('acceptCall', {
            to: peerId,
            signal: data,
          });
        }
      });

      peer.on('stream', (remoteStream) => {
        setRemoteStream(remoteStream.toURL());
      });

      peerRef.current = peer;
    };

    streamSetup();

    socket.on('callAccepted', ({ signal }) => {
      peerRef.current.signal(signal);
    });

    return () => {
      peerRef.current?.destroy();
      socket.off('callAccepted');
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Call Screen</Text>

      {myStream && (
        <RTCView
          streamURL={myStream.toURL()}
          style={styles.video}
          objectFit="cover"
        />
      )}

      {remoteStream && (
        <RTCView
          streamURL={remoteStream}
          style={[styles.video, { marginTop: 20 }]}
          objectFit="cover"
        />
      )}
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  video: {
    width: '90%',
    height: 300,
    backgroundColor: '#444',
  },
});
