import { useEffect, useRef, useContext } from "react";
import { Renderer } from "./Renderer";
import { SocketClient, SocketClientContext } from "./SocketClient";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>();
  const socketClient = useContext<SocketClient>(SocketClientContext);

  useEffect(() => {
    const renderer = new Renderer();
    if (canvasRef.current) {
      renderer.setup(canvasRef.current);
      renderer.addMouseMoveListener(
        (mouseEvent: MouseEvent, renderer: Renderer) => {
          if (mouseEvent.button) {
            socketClient.sendCameraMatrix(renderer.cameraMatrix.elements);
          }
        }
      );
    }

    socketClient.on("rotation", (data: Array<number>) => {
      renderer.updateMatrix(data);
    });

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div className="app">
      <canvas ref={canvasRef} />
      <div className="overlay">
        <div>
          <ul>
            <li>
              <b>{socketClient.connected ? "Connected" : "Not Connected"}</b>
            </li>
            <li>
              <b>Socket ID: </b> {socketClient.socketId}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
