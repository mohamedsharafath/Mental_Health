import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import "./VideoConference.css";

// Make sure to update this endpoint to match your backend
const socket = io("http://localhost:3000"); // Update the endpoint if needed

function VideoConference() {
  const [roomId, setRoomId] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [joined, setJoined] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  useEffect(() => {
    // Check if there is a room ID in the URL on initial load
    const urlParams = new URLSearchParams(window.location.search);
    const roomFromUrl = urlParams.get("room");
    if (roomFromUrl) {
      setRoomId(roomFromUrl);
      handleJoin(roomFromUrl);
    }
  }, []);

  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 12);
    setRoomId(newRoomId);
    setGeneratedLink(`${window.location.origin}?room=${newRoomId}`);
    handleJoin(newRoomId);
  };

  const handleJoin = (room) => {
    const roomToJoin = room || roomId;
    if (!roomToJoin) return;
    setJoined(true);
    socket.emit("joinRoom", roomToJoin); // Emit the "joinRoom" event to the server
    startLocalVideo();
  };

  const handleLeave = () => {
    setJoined(false);
    socket.emit("leaveRoom", roomId); // Emit the "leaveRoom" event to the server
    stopLocalVideo();
  };

  const startLocalVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStreamRef.current = stream;
        localVideoRef.current.srcObject = stream;
      })
      .catch((error) => console.error("Error accessing media devices.", error));
  };

  const stopLocalVideo = () => {
    const stream = localStreamRef.current;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    localVideoRef.current.srcObject = null;
  };

  const toggleMic = () => {
    const audioTracks = localStreamRef.current?.getAudioTracks();
    if (audioTracks) {
      audioTracks[0].enabled = !audioTracks[0].enabled;
      setIsMicOn(audioTracks[0].enabled);
    }
  };

  const toggleCamera = () => {
    const videoTracks = localStreamRef.current?.getVideoTracks();
    if (videoTracks) {
      videoTracks[0].enabled = !videoTracks[0].enabled;
      setIsCameraOn(videoTracks[0].enabled);
    }
  };

  return (
    <div className="video-conference">
      <h1>Video Conference</h1>

      <div className="controls">
        <label htmlFor="roomId">Room ID:</label>
        <input
          id="roomId"
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
        />
        <button onClick={handleCreateRoom} disabled={joined}>
          Create Room
        </button>
        <button onClick={() => handleJoin()} disabled={joined}>
          Join
        </button>
        <button onClick={handleLeave} disabled={!joined}>
          Leave
        </button>
      </div>

      {generatedLink && (
        <p className="notification">
          Share this link to invite others:{" "}
          <a href={generatedLink} target="_blank" rel="noopener noreferrer">
            {generatedLink}
          </a>
        </p>
      )}

      <p className="notification">
        {joined ? "You have joined the room." : "Enter or create a room to join."}
      </p>

      <div className="video-container">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="local-video"
        />
      </div>

      <div className="toggle-controls">
        <button onClick={toggleMic}>
          {isMicOn ? "Turn Off Mic" : "Turn On Mic"}
        </button>
        <button onClick={toggleCamera}>
          {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
        </button>
      </div>
    </div>
  );
}

export default VideoConference;
